const fs = require('fs');
const path = require('path');

const DEFAULT_REPORT_DIR = path.join(process.cwd(), 'artifacts', 'api-contracts');
const LEGACY_LIVECOINWATCH_URL = 'https://http-api.livecoinwatch.com/coins?offset=0&limit=1&sort=rank&order=ascending&currency=USD';
const LIVECOINWATCH_PRICE_LIST_LIMIT = 200;
const LIVECOINWATCH_PRICE_LIST_MIN_DEPTH = 150;
const LIVECOINWATCH_PRICE_LIST_CURRENCIES = ['USD', 'EUR'];
const LIVECOINWATCH_PRESET_CODES = ['BTC', 'ETH', 'LTC', 'IOTA', 'XMR', 'ADA', 'XRP'];

function buildLiveCoinWatchPriceListUrl(currency) {
  return 'https://http-api.livecoinwatch.com/coins?offset=0&limit='
    + LIVECOINWATCH_PRICE_LIST_LIMIT
    + '&sort=rank&order=ascending&currency='
    + encodeURIComponent(currency);
}

function addDays(date, days) {
  const result = new Date(date.valueOf());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function buildCryptoCompareUrl(pathname, params) {
  const url = new URL(pathname, 'https://min-api.cryptocompare.com');

  Object.keys(params).forEach((key) => {
    url.searchParams.set(key, params[key]);
  });

  if (process.env.CRYPTOCOMPARE_API_KEY) {
    url.searchParams.set('api_key', process.env.CRYPTOCOMPARE_API_KEY);
  }

  return url.toString();
}

function createCheckError(message, metadata) {
  return Object.assign(new Error(message), metadata);
}

function redactApiKey(value) {
  return String(value === null || value === undefined ? '' : value).replace(/(api_key=)[^&\s"']+/gi, '$1REDACTED');
}

function ensureFetch() {
  if (typeof fetch !== 'function') {
    throw new Error('Global fetch is not available. Run this script with Node 18 or newer.');
  }
}

function summarizeBody(rawBody) {
  return String(rawBody || '').replace(/\s+/g, ' ').trim().slice(0, 200);
}

// CryptoCompare reports quota and contract errors as HTTP 200 with
// Response: "Error" in the body, so surface that message before any
// field validation turns it into a misleading "field is missing" error.
function requireUpstreamSuccess(checkName, response, endpoint) {
  const body = response.data;

  if (body && body.Response === 'Error') {
    throw createCheckError(checkName + ' returned an upstream error: ' + summarizeBody(body.Message || JSON.stringify(body)), {
      endpoint: endpoint,
      httpStatus: response.httpStatus
    });
  }
}

function requireFiniteNumber(value, label, endpoint) {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw createCheckError(label + ' is missing or not numeric.', { endpoint: endpoint });
  }

  return parsedValue;
}

function requirePositiveNumber(value, label, endpoint) {
  const parsedValue = requireFiniteNumber(value, label, endpoint);

  if (parsedValue <= 0) {
    throw createCheckError(label + ' must be positive.', { endpoint: endpoint });
  }

  return parsedValue;
}

function readNonNegativeEnv(name, fallback) {
  const rawValue = process.env[name];

  if (!rawValue) {
    return fallback;
  }

  const parsedValue = Number(rawValue);

  return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : fallback;
}

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

async function attemptRequestJson(checkName, request) {
  const startedAt = Date.now();
  const controller = typeof AbortController === 'function' ? new AbortController() : null;
  const timeoutMs = Number(process.env.API_CONTRACT_TIMEOUT_MS) || 15000;
  let timeoutId = null;

  if (controller) {
    timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  }

  try {
    const response = await fetch(request.url, {
      body: request.body,
      headers: request.headers,
      method: request.method || 'GET',
      signal: controller ? controller.signal : undefined
    });
    const rawBody = await response.text();
    let data;

    try {
      data = rawBody ? JSON.parse(rawBody) : null;
    } catch (error) {
      throw createCheckError(checkName + ' returned invalid JSON: ' + summarizeBody(rawBody), {
        endpoint: request.url,
        httpStatus: response.status
      });
    }

    if (!response.ok) {
      throw createCheckError(checkName + ' returned HTTP ' + response.status + ': ' + summarizeBody(rawBody), {
        endpoint: request.url,
        httpStatus: response.status
      });
    }

    return {
      data: data,
      durationMs: Date.now() - startedAt,
      httpStatus: response.status
    };
  } catch (error) {
    if (error.endpoint) {
      throw error;
    }

    throw createCheckError(checkName + ' request failed: ' + error.message, {
      endpoint: request.url,
      httpStatus: null,
      retryable: true
    });
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

// The upstream providers occasionally stall past the request timeout, which
// reddens the whole workflow without telling us anything about the contract.
// Only transport-level failures are retried: any real HTTP answer, malformed
// payload, or failed assertion is contract signal and must surface untouched.
async function requestJson(checkName, request) {
  ensureFetch();
  const retries = readNonNegativeEnv('API_CONTRACT_RETRIES', 1);
  const backoffMs = readNonNegativeEnv('API_CONTRACT_RETRY_DELAY_MS', 500);
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0 && backoffMs > 0) {
      await delay(backoffMs * attempt);
    }

    try {
      return await attemptRequestJson(checkName, request);
    } catch (error) {
      if (!error.retryable) {
        throw error;
      }

      lastError = error;
    }
  }

  throw lastError;
}

function createLiveCoinWatchHistoryCheck(now) {
  return {
    name: 'LiveCoinWatch official history (keyed)',
    provider: 'LiveCoinWatch',
    run: async function () {
      const endpoint = 'https://api.livecoinwatch.com/coins/single/history';
      const dayMs = 86400000;
      const endMs = Math.floor(now.getTime() / dayMs) * dayMs;
      const startMs = endMs - 100 * dayMs;
      const response = await requestJson('LiveCoinWatch official history (keyed)', {
        url: endpoint,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': process.env.LIVECOINWATCH_API_KEY
        },
        body: JSON.stringify({ code: 'BTC', currency: 'USD', start: startMs, end: endMs, meta: false })
      });
      const points = response.data && response.data.history;

      if (!Array.isArray(points) || points.length < 90) {
        const received = Array.isArray(points) ? points.length : 'no';
        throw createCheckError('100-day history returned ' + received + ' points; calculators expect ~daily resolution.', {
          endpoint: endpoint,
          httpStatus: response.httpStatus
        });
      }

      let previousDate = null;
      points.forEach(function (point, index) {
        const pointDate = requireFiniteNumber(point && point.date, 'history[' + index + '].date', endpoint);
        requirePositiveNumber(point && point.rate, 'history[' + index + '].rate', endpoint);

        if (pointDate < startMs || pointDate > endMs) {
          throw createCheckError('history[' + index + '].date is outside the requested range.', {
            endpoint: endpoint,
            httpStatus: response.httpStatus
          });
        }

        if (previousDate !== null && pointDate <= previousDate) {
          throw createCheckError('History dates must be strictly increasing.', {
            endpoint: endpoint,
            httpStatus: response.httpStatus
          });
        }

        previousDate = pointDate;
      });

      return {
        durationMs: response.durationMs,
        endpoint: endpoint,
        httpStatus: response.httpStatus,
        notes: '100-day BTC history returned ' + points.length + ' points with date and rate.'
      };
    }
  };
}

// CryptoCompare is fallback-only since the June 2026 LiveCoinWatch migration
// and is not monitored by default — its free key allows just 100 calls/month,
// and scheduled checks would spend the fallback's quota on watching the
// fallback. Set API_CONTRACT_INCLUDE_CRYPTOCOMPARE=1 to check it manually.
function shouldCheckCryptoCompare() {
  return process.env.API_CONTRACT_INCLUDE_CRYPTOCOMPARE === '1';
}

function createLiveCoinWatchPriceListCheck(currency) {
  return {
    name: 'LiveCoinWatch price list depth (' + currency + ')',
    provider: 'LiveCoinWatch',
    run: async function () {
      const endpoint = buildLiveCoinWatchPriceListUrl(currency);
      const response = await requestJson('LiveCoinWatch price list depth (' + currency + ')', { url: endpoint });
      const coins = response.data && response.data.data;

      if (!Array.isArray(coins) || coins.length < LIVECOINWATCH_PRICE_LIST_MIN_DEPTH) {
        const received = Array.isArray(coins) ? coins.length : 'no';
        throw createCheckError('Price list returned ' + received + ' coins; calculators expect the top ' + LIVECOINWATCH_PRICE_LIST_LIMIT + '.', {
          endpoint: endpoint,
          httpStatus: response.httpStatus
        });
      }

      const missingCodes = [];
      LIVECOINWATCH_PRESET_CODES.forEach(function (code) {
        const coin = coins.find(function (candidate) {
          return candidate && candidate.code === code;
        });

        if (!coin) {
          missingCodes.push(code);
          return;
        }

        requirePositiveNumber(coin.price, code + ' price', endpoint);
      });

      if (missingCodes.length) {
        throw createCheckError('Preset coins missing from the top-' + LIVECOINWATCH_PRICE_LIST_LIMIT + ' list: ' + missingCodes.join(', ') + '.', {
          endpoint: endpoint,
          httpStatus: response.httpStatus
        });
      }

      return {
        durationMs: response.durationMs,
        endpoint: endpoint,
        httpStatus: response.httpStatus,
        notes: 'Top-' + coins.length + ' ' + currency + ' price list includes all preset coins with positive prices.'
      };
    }
  };
}

function createContractChecks(now) {
  const yesterday = addDays(now, -1);
  const historicalDate = addDays(now, -2);
  const historicalTimestamp = Math.floor(Date.UTC(
    historicalDate.getUTCFullYear(),
    historicalDate.getUTCMonth(),
    historicalDate.getUTCDate(),
    12,
    0,
    0,
    0
  ) / 1000);

  const cryptoCompareChecks = [
    {
      name: 'CryptoCompare current price',
      provider: 'CryptoCompare',
      run: async function () {
        const endpoint = buildCryptoCompareUrl('/data/price', { fsym: 'BTC', tsyms: 'USD' });
        const response = await requestJson('CryptoCompare current price', { url: endpoint });
        requireUpstreamSuccess('CryptoCompare current price', response, endpoint);
        const usdPrice = requireFiniteNumber(response.data && response.data.USD, 'USD price', endpoint);

        if (usdPrice <= 0) {
          throw createCheckError('USD price must be positive.', { endpoint: endpoint, httpStatus: response.httpStatus });
        }

        return {
          durationMs: response.durationMs,
          endpoint: endpoint,
          httpStatus: response.httpStatus,
          notes: 'USD field is present and numeric.'
        };
      }
    },
    {
      name: 'CryptoCompare historical price',
      provider: 'CryptoCompare',
      run: async function () {
        const endpoint = buildCryptoCompareUrl('/data/pricehistorical', {
          fsym: 'BTC',
          ts: String(historicalTimestamp),
          tsyms: 'USD'
        });
        const response = await requestJson('CryptoCompare historical price', { url: endpoint });
        requireUpstreamSuccess('CryptoCompare historical price', response, endpoint);
        const historicalPrice = requireFiniteNumber(
          response.data && response.data.BTC && response.data.BTC.USD,
          'BTC.USD historical price',
          endpoint
        );

        if (historicalPrice <= 0) {
          throw createCheckError('Historical BTC.USD price must be positive.', { endpoint: endpoint, httpStatus: response.httpStatus });
        }

        return {
          durationMs: response.durationMs,
          endpoint: endpoint,
          httpStatus: response.httpStatus,
          notes: 'BTC.USD historical field is present and numeric.'
        };
      }
    },
    {
      name: 'CryptoCompare daily history',
      provider: 'CryptoCompare',
      run: async function () {
        const limit = 4;
        const toTs = Math.floor(Date.UTC(
          yesterday.getUTCFullYear(), yesterday.getUTCMonth(), yesterday.getUTCDate(), 12, 0, 0, 0
        ) / 1000);
        const endpoint = buildCryptoCompareUrl('/data/v2/histoday', {
          fsym: 'BTC',
          limit: String(limit),
          toTs: String(toTs),
          tsym: 'USD'
        });
        const response = await requestJson('CryptoCompare daily history', { url: endpoint });
        requireUpstreamSuccess('CryptoCompare daily history', response, endpoint);
        const dataArr = response.data && response.data.Data && response.data.Data.Data;

        if (!Array.isArray(dataArr) || !dataArr.length) {
          throw createCheckError('Data array is missing or empty. Upstream body: ' + summarizeBody(JSON.stringify(response.data)), {
            endpoint: endpoint,
            httpStatus: response.httpStatus
          });
        }

        requireFiniteNumber(dataArr[0].time, 'Data.Data[0].time', endpoint);
        requireFiniteNumber(dataArr[0].close, 'Data.Data[0].close', endpoint);

        return {
          durationMs: response.durationMs,
          endpoint: endpoint,
          httpStatus: response.httpStatus,
          notes: 'Daily history contains ' + dataArr.length + ' OHLC entries with time and close.'
        };
      }
    }
  ];

  const checks = [
    {
      name: 'LiveCoinWatch legacy market list',
      provider: 'LiveCoinWatch',
      run: async function () {
        const endpoint = LEGACY_LIVECOINWATCH_URL;
        const response = await requestJson('LiveCoinWatch legacy market list', { url: endpoint });
        const coins = response.data && response.data.data;
        const firstCoin = Array.isArray(coins) ? coins[0] : null;

        if (!firstCoin) {
          throw createCheckError('data[0] is missing.', { endpoint: endpoint, httpStatus: response.httpStatus });
        }

        requireFiniteNumber(firstCoin.rank, 'data[0].rank', endpoint);
        requireFiniteNumber(firstCoin.price, 'data[0].price', endpoint);
        requireFiniteNumber(firstCoin.cap, 'data[0].cap', endpoint);
        requireFiniteNumber(firstCoin.circulating, 'data[0].circulating', endpoint);

        if (!firstCoin.code || !firstCoin.name) {
          throw createCheckError('data[0].code or data[0].name is missing.', { endpoint: endpoint, httpStatus: response.httpStatus });
        }

        return {
          durationMs: response.durationMs,
          endpoint: endpoint,
          httpStatus: response.httpStatus,
          notes: 'Legacy market list still returns rank, price, cap, circulating, code, and name.'
        };
      }
    },
  ].concat(LIVECOINWATCH_PRICE_LIST_CURRENCIES.map(createLiveCoinWatchPriceListCheck));

  // The official-API check needs the key, so it only runs where the
  // LIVECOINWATCH_API_KEY secret is configured. In CI a missing key must be
  // a red run, not a silently smaller check list — otherwise a renamed or
  // expired secret leaves the primary history provider unmonitored while
  // the schedule stays green.
  if (process.env.LIVECOINWATCH_API_KEY) {
    checks.push(createLiveCoinWatchHistoryCheck(now));
  } else if (process.env.GITHUB_ACTIONS) {
    checks.push({
      name: 'LiveCoinWatch official history (keyed)',
      provider: 'LiveCoinWatch',
      run: async function () {
        throw createCheckError('LIVECOINWATCH_API_KEY secret is missing in CI — the primary history provider is unmonitored.', {
          endpoint: 'https://api.livecoinwatch.com/coins/single/history',
          httpStatus: null
        });
      }
    });
  }

  if (shouldCheckCryptoCompare()) {
    return cryptoCompareChecks.concat(checks);
  }

  return checks;
}

async function runContractChecks(options) {
  const settings = options || {};
  const now = settings.now || new Date();
  const checks = createContractChecks(now);
  const results = [];

  for (const check of checks) {
    try {
      const result = await check.run();
      results.push({
        durationMs: result.durationMs,
        endpoint: redactApiKey(result.endpoint),
        httpStatus: result.httpStatus,
        name: check.name,
        notes: result.notes,
        provider: check.provider,
        status: 'passed'
      });
    } catch (error) {
      results.push({
        durationMs: null,
        endpoint: redactApiKey(error.endpoint || 'unknown'),
        error: redactApiKey(error.message),
        httpStatus: Number.isFinite(error.httpStatus) ? error.httpStatus : null,
        name: check.name,
        notes: '',
        provider: check.provider,
        status: 'failed'
      });
    }
  }

  return {
    generatedAt: now.toISOString(),
    results: results,
    success: results.every((result) => result.status === 'passed')
  };
}

function escapeCell(value) {
  return String(value === null || value === undefined ? '' : value).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function formatConsoleCell(value) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  return String(value).replace(/\r?\n/g, ' ');
}

function formatConsoleTable(headers, rows) {
  const normalizedRows = rows.map((row) => row.map((cell) => formatConsoleCell(cell)));
  const widths = headers.map((header, index) => {
    return normalizedRows.reduce((maxWidth, row) => {
      return Math.max(maxWidth, row[index].length);
    }, header.length);
  });
  const divider = '+-' + widths.map((width) => '-'.repeat(width)).join('-+-') + '-+';

  function renderRow(cells) {
    return '| ' + cells.map((cell, index) => {
      return formatConsoleCell(cell).padEnd(widths[index], ' ');
    }).join(' | ') + ' |';
  }

  return [
    divider,
    renderRow(headers),
    divider
  ].concat(normalizedRows.map((row) => renderRow(row)), divider).join('\n');
}

function formatConsoleReport(report) {
  const rows = report.results.map((result) => {
    return [
      result.name,
      result.provider,
      result.status === 'passed' ? 'PASS' : 'FAIL',
      result.httpStatus,
      result.durationMs
    ];
  });
  const lines = [
    'Live API Contract Report',
    'Generated: ' + report.generatedAt,
    'Overall: ' + (report.success ? 'PASS' : 'FAIL'),
    '',
    formatConsoleTable(['Check', 'Provider', 'Status', 'HTTP', 'Time (ms)'], rows)
  ];

  if (report.results.length) {
    lines.push('', 'Details');

    report.results.forEach((result) => {
      const detailLabel = result.status === 'passed' ? 'Notes' : 'Error';
      const detailText = result.status === 'passed' ? result.notes : result.error;

      lines.push('- ' + result.name + ' (' + result.provider + ')');
      lines.push('  ' + detailLabel + ': ' + detailText);
      lines.push('  Endpoint: ' + result.endpoint);
    });
  }

  return lines.join('\n') + '\n';
}

function formatMarkdownReport(report) {
  const lines = [
    '# Live API Contract Report',
    '',
    '- Generated: ' + report.generatedAt,
    '- Overall: ' + (report.success ? 'PASS' : 'FAIL'),
    '',
    '| Check | Provider | Status | HTTP | Notes |',
    '| --- | --- | --- | --- | --- |'
  ];

  report.results.forEach((result) => {
    const statusLabel = result.status === 'passed' ? 'PASS' : 'FAIL';
    const notes = result.status === 'passed'
      ? result.notes + ' Endpoint: ' + result.endpoint
      : result.error + ' Endpoint: ' + result.endpoint;

    lines.push('| ' + escapeCell(result.name) + ' | ' + escapeCell(result.provider) + ' | ' + statusLabel + ' | ' + escapeCell(result.httpStatus || '-') + ' | ' + escapeCell(notes) + ' |');
  });

  return lines.join('\n') + '\n';
}

function writeReport(report, reportDir) {
  const targetDir = path.resolve(reportDir || DEFAULT_REPORT_DIR);
  const jsonPath = path.join(targetDir, 'report.json');
  const markdownPath = path.join(targetDir, 'report.md');
  const markdown = formatMarkdownReport(report);

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  fs.writeFileSync(markdownPath, markdown);

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown);
  }

  return {
    jsonPath: jsonPath,
    markdownPath: markdownPath
  };
}

async function main() {
  const report = await runContractChecks();
  const reportPaths = writeReport(report, process.env.API_CONTRACT_REPORT_DIR);

  console.log(formatConsoleReport(report));
  console.log('Saved JSON report to ' + reportPaths.jsonPath);
  console.log('Saved Markdown report to ' + reportPaths.markdownPath);

  if (!report.success) {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = {
  createContractChecks: createContractChecks,
  formatConsoleReport: formatConsoleReport,
  formatMarkdownReport: formatMarkdownReport,
  runContractChecks: runContractChecks,
  writeReport: writeReport
};
