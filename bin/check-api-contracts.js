const fs = require('fs');
const path = require('path');

const DEFAULT_REPORT_DIR = path.join(process.cwd(), 'artifacts', 'api-contracts');
const LEGACY_LIVECOINWATCH_URL = 'https://http-api.livecoinwatch.com/coins?offset=0&limit=1&sort=rank&order=ascending&currency=USD';

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

function ensureFetch() {
  if (typeof fetch !== 'function') {
    throw new Error('Global fetch is not available. Run this script with Node 18 or newer.');
  }
}

function summarizeBody(rawBody) {
  return String(rawBody || '').replace(/\s+/g, ' ').trim().slice(0, 200);
}

function requireFiniteNumber(value, label, endpoint) {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw createCheckError(label + ' is missing or not numeric.', { endpoint: endpoint });
  }

  return parsedValue;
}

async function requestJson(checkName, request) {
  ensureFetch();
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
      httpStatus: null
    });
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
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

  return [
    {
      name: 'CryptoCompare current price',
      provider: 'CryptoCompare',
      run: async function () {
        const endpoint = buildCryptoCompareUrl('/data/price', { fsym: 'BTC', tsyms: 'USD' });
        const response = await requestJson('CryptoCompare current price', { url: endpoint });
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
      name: 'CoinDesk historical days',
      provider: 'CoinDesk',
      run: async function () {
        const limit = 4;
        const toTs = Math.floor(Date.UTC(
          yesterday.getUTCFullYear(), yesterday.getUTCMonth(), yesterday.getUTCDate(), 12, 0, 0, 0
        ) / 1000);
        const endpoint = 'https://data-api.coindesk.com/index/cc/v1/historical/days'
          + '?market=sda&instrument=XBX-USD&limit=' + limit + '&groups=OHLC&to_ts=' + toTs;
        const response = await requestJson('CoinDesk historical days', { url: endpoint });
        const dataArr = response.data && response.data.Data;

        if (!Array.isArray(dataArr) || !dataArr.length) {
          throw createCheckError('Data array is missing or empty.', { endpoint: endpoint, httpStatus: response.httpStatus });
        }

        requireFiniteNumber(dataArr[0].TIMESTAMP, 'Data[0].TIMESTAMP', endpoint);
        requireFiniteNumber(dataArr[0].CLOSE, 'Data[0].CLOSE', endpoint);

        return {
          durationMs: response.durationMs,
          endpoint: endpoint,
          httpStatus: response.httpStatus,
          notes: 'Data array contains ' + dataArr.length + ' OHLC entries with TIMESTAMP and CLOSE.'
        };
      }
    },
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
    }
  ];
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
        endpoint: result.endpoint,
        httpStatus: result.httpStatus,
        name: check.name,
        notes: result.notes,
        provider: check.provider,
        status: 'passed'
      });
    } catch (error) {
      results.push({
        durationMs: null,
        endpoint: error.endpoint || 'unknown',
        error: error.message,
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
  return String(value || '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
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

  console.log(formatMarkdownReport(report));
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
  formatMarkdownReport: formatMarkdownReport,
  runContractChecks: runContractChecks,
  writeReport: writeReport
};