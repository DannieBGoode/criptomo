const fs = require('fs');
const http = require('http');
const net = require('net');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const SITE_DIR = path.join(process.cwd(), '_site');
const REPORT_DIR = path.join(process.cwd(), 'artifacts', 'page-console');
const TEST_STUB_PREFIX = '/__test_stubs__';
const BROWSER_CANDIDATES = [
  process.env.PAGE_CONSOLE_BROWSER,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'msedge',
  'google-chrome',
  'chromium-browser',
  'chromium'
].filter(Boolean);

const THIRD_PARTY_REPLACEMENTS = [
  ['https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js', TEST_STUB_PREFIX + '/datatables.min.js'],
  ['https://cdn.datatables.net/plug-ins/1.10.16/api/processing().js', TEST_STUB_PREFIX + '/datatables-processing.js'],
  ['https://cdn.datatables.net/responsive/2.2.1/js/dataTables.responsive.min.js', TEST_STUB_PREFIX + '/datatables-responsive.js'],
  ['https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js', TEST_STUB_PREFIX + '/isotope.pkgd.min.js'],
  ['https://www.googletagmanager.com/gtm.js', TEST_STUB_PREFIX + '/noop.js'],
  ['https://www.googletagmanager.com/gtag/js?id=GTM-TV5P5BH', TEST_STUB_PREFIX + '/noop.js'],
  ['https://chimpstatic.com/mcjs-connected/js/users/b9de4a6450813cafe2bddbf2b/60c797cb12a5c763c13429d62.js', TEST_STUB_PREFIX + '/noop.js'],
  ['https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', TEST_STUB_PREFIX + '/noop.js']
];

const STUB_SCRIPTS = {
  [TEST_STUB_PREFIX + '/noop.js']: 'window.dataLayer = window.dataLayer || []; window.adsbygoogle = window.adsbygoogle || [];',
  [TEST_STUB_PREFIX + '/datatables.min.js']: `(function () {
    function createTableApi() {
      var api = {};
      api.clear = function () { return api; };
      api.draw = function () { return api; };
      api.processing = function () { return api; };
      api.columns = { adjust: function () { return api; } };
      api.responsive = { recalc: function () { return api; } };
      api.rows = { add: function () { return api; } };
      api.search = function () { return { draw: function () { return api; } }; };
      api.page = { len: function () { return { draw: function () { return api; } }; } };
      return api;
    }

    function install() {
      if (!window.jQuery) {
        return setTimeout(install, 0);
      }
      if (window.jQuery.fn.DataTable) {
        return;
      }
      window.jQuery.fn.DataTable = function (options) {
        this.each(function () {
          this.__dataTableOptions = options;
        });
        return createTableApi();
      };
      window.jQuery.fn.dataTable = window.jQuery.fn.dataTable || { ext: {} };
    }

    install();
  }());`,
  [TEST_STUB_PREFIX + '/datatables-processing.js']: '',
  [TEST_STUB_PREFIX + '/datatables-responsive.js']: '',
  [TEST_STUB_PREFIX + '/isotope.pkgd.min.js']: `(function () {
    function install() {
      if (!window.jQuery) {
        return setTimeout(install, 0);
      }
      if (window.jQuery.fn.isotope) {
        return;
      }
      window.jQuery.fn.isotope = function (options) {
        this.each(function () {
          this.__isotopeOptions = options;
        });
        return this;
      };
    }

    install();
  }());`
};

const PRELUDE_SCRIPT = `<script>
(function () {
  var blockedScriptHosts = [
    /googletagmanager\.com/i,
    /chimpstatic\.com/i,
    /googlesyndication\.com/i
  ];
  var originalFetch = window.fetch ? window.fetch.bind(window) : null;
  var scriptSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src');

  function getStubbedPayload(rawUrl) {
    var url = new URL(rawUrl, window.location.href);

    if (url.hostname === 'min-api.cryptocompare.com' && url.pathname === '/data/price') {
      return { status: 200, body: { USD: 50000, EUR: 46000 } };
    }
    if (url.hostname === 'min-api.cryptocompare.com' && url.pathname === '/data/pricehistorical') {
      return { status: 200, body: { BTC: { USD: 48000, EUR: 44000 } } };
    }
    if (url.hostname === 'min-api.cryptocompare.com' && url.pathname === '/data/pricemulti') {
      return { status: 200, body: { BTC: { USD: 50000 }, ETH: { USD: 2500 } } };
    }
    if (url.hostname === 'api.coindesk.com' && url.pathname === '/v1/bpi/historical/close.json') {
      return {
        status: 200,
        body: {
          bpi: {
            '2014-12-10': 350,
            '2014-12-17': 360,
            '2014-12-24': 370,
            '2014-12-31': 380
          }
        }
      };
    }
    if (url.hostname === 'http-api.livecoinwatch.com' && url.pathname === '/coins') {
      return {
        status: 200,
        body: {
          data: [{
            cap: 1000000,
            circulating: 19000000,
            code: 'BTC',
            delta: { day: 1.01, hour: 1.001, week: 0.99, year: 1.2, second: 1.0 },
            extremes: { all: { max: { date: '2024-01-01', usd: 70000 } } },
            name: 'Bitcoin',
            price: 60000,
            rank: 1
          }]
        }
      };
    }

    return null;
  }

  Object.defineProperty(HTMLScriptElement.prototype, 'src', {
    configurable: true,
    enumerable: scriptSrcDescriptor.enumerable,
    get: function () {
      return scriptSrcDescriptor.get.call(this);
    },
    set: function (value) {
      var nextValue = String(value);
      if (blockedScriptHosts.some(function (pattern) { return pattern.test(nextValue); })) {
        scriptSrcDescriptor.set.call(this, '${TEST_STUB_PREFIX}/noop.js');
        return;
      }
      scriptSrcDescriptor.set.call(this, value);
    }
  });

  window.fetch = function (resource, options) {
    var rawUrl = typeof resource === 'string' ? resource : resource.url;
    var stubbedPayload = getStubbedPayload(rawUrl);

    if (stubbedPayload) {
      return Promise.resolve(new Response(JSON.stringify(stubbedPayload.body), {
        status: stubbedPayload.status,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    if (!originalFetch) {
      return Promise.reject(new Error('Fetch is not available.'));
    }

    return originalFetch(resource, options);
  };

  (function patchJQueryGet() {
    if (!window.jQuery) {
      return setTimeout(patchJQueryGet, 0);
    }
    if (window.jQuery.__pageConsoleSmokePatched) {
      return;
    }

    window.jQuery.__pageConsoleSmokePatched = true;
    window.jQuery.get = function (url, callback) {
      var stubbedPayload = getStubbedPayload(url);
      var chain = {
        success: function (handler) {
          if (stubbedPayload && typeof handler === 'function') {
            handler(stubbedPayload.body);
          }
          return chain;
        },
        error: function (handler) {
          if (!stubbedPayload && typeof handler === 'function') {
            handler({});
          }
          return chain;
        },
        always: function (handler) {
          if (typeof handler === 'function') {
            handler();
          }
          return chain;
        }
      };

      if (stubbedPayload && typeof callback === 'function') {
        callback(stubbedPayload.body);
      }

      return chain;
    };
  }());
}());
</script>`;

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
  case '.css':
    return 'text/css; charset=utf-8';
  case '.html':
    return 'text/html; charset=utf-8';
  case '.ico':
    return 'image/x-icon';
  case '.jpg':
  case '.jpeg':
    return 'image/jpeg';
  case '.js':
    return 'application/javascript; charset=utf-8';
  case '.json':
    return 'application/json; charset=utf-8';
  case '.png':
    return 'image/png';
  case '.svg':
    return 'image/svg+xml';
  case '.webp':
    return 'image/webp';
  case '.xml':
    return 'application/xml; charset=utf-8';
  default:
    return 'text/plain; charset=utf-8';
  }
}

function findBrowserExecutable() {
  for (const candidate of BROWSER_CANDIDATES) {
    if (!candidate) {
      continue;
    }
    if (path.isAbsolute(candidate)) {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
      continue;
    }
    return candidate;
  }

  throw new Error('No Chromium-based browser was found. Set PAGE_CONSOLE_BROWSER to an Edge/Chrome executable.');
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}

function getSiteFilePath(requestPath) {
  let normalizedPath = decodeURIComponent(requestPath.split('?')[0]);

  if (normalizedPath === '/') {
    normalizedPath = '/index.html';
  }
  if (!path.extname(normalizedPath) && !normalizedPath.endsWith('/')) {
    normalizedPath += '/';
  }
  if (normalizedPath.endsWith('/')) {
    normalizedPath += 'index.html';
  }

  return path.join(SITE_DIR, normalizedPath.replace(/^\//, '').replace(/\//g, path.sep));
}

function isRedirectAliasHtml(html) {
  return html.includes('<title>Redirecting&hellip;</title>')
    && html.includes('<meta http-equiv="refresh" content="0; url=')
    && html.includes('<meta name="robots" content="noindex">');
}

function rewriteHtml(html) {
  let output = html;

  THIRD_PARTY_REPLACEMENTS.forEach(([from, to]) => {
    output = output.split(from).join(to);
  });

  if (output.includes('</head>')) {
    output = output.replace('</head>', PRELUDE_SCRIPT + '</head>');
  } else {
    output = PRELUDE_SCRIPT + output;
  }

  return output;
}

function createStaticServer() {
  const server = http.createServer((request, response) => {
    const requestPath = request.url.split('?')[0];

    if (STUB_SCRIPTS[requestPath] !== undefined) {
      response.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
      response.end(STUB_SCRIPTS[requestPath]);
      return;
    }

    const filePath = getSiteFilePath(request.url);

    if (!filePath.startsWith(SITE_DIR)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    const contentType = getContentType(filePath);

    if (contentType.startsWith('text/html')) {
      const html = fs.readFileSync(filePath, 'utf8');
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(rewriteHtml(html));
      return;
    }

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(fs.readFileSync(filePath));
  });

  return server;
}

function collectPagePaths() {
  const htmlFiles = [];

  function visit(currentDir) {
    fs.readdirSync(currentDir, { withFileTypes: true }).forEach((entry) => {
      const entryPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        visit(entryPath);
        return;
      }
      if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== '.html') {
        return;
      }
      if (isRedirectAliasHtml(fs.readFileSync(entryPath, 'utf8'))) {
        return;
      }

      htmlFiles.push(entryPath);
    });
  }

  visit(SITE_DIR);

  return htmlFiles
    .map((filePath) => {
      const relativePath = path.relative(SITE_DIR, filePath).replace(/\\/g, '/');

      if (relativePath === 'index.html') {
        return '/';
      }
      if (relativePath.endsWith('/index.html')) {
        return '/' + relativePath.slice(0, -'index.html'.length);
      }
      return '/' + relativePath;
    })
    .sort();
}

function normalizeRequestedPagePath(pagePath) {
  if (!pagePath) {
    return '/';
  }

  let normalizedPath = String(pagePath).trim();
  if (!normalizedPath) {
    return '/';
  }

  if (/^https?:\/\//i.test(normalizedPath)) {
    normalizedPath = new URL(normalizedPath).pathname;
  }

  if (!normalizedPath.startsWith('/')) {
    normalizedPath = '/' + normalizedPath;
  }

  if (!path.extname(normalizedPath) && normalizedPath !== '/' && !normalizedPath.endsWith('/')) {
    normalizedPath += '/';
  }

  if (normalizedPath.endsWith('/index.html')) {
    normalizedPath = normalizedPath.slice(0, -'index.html'.length);
  }

  return normalizedPath;
}

function resolvePagePaths(allPagePaths, requestedPagePaths) {
  if (!requestedPagePaths || requestedPagePaths.length === 0) {
    return allPagePaths;
  }

  const normalizedPagePaths = requestedPagePaths.map(normalizeRequestedPagePath);
  const missingPagePaths = normalizedPagePaths.filter((pagePath) => !allPagePaths.includes(pagePath));

  if (missingPagePaths.length > 0) {
    throw new Error('Unknown page path(s): ' + missingPagePaths.join(', '));
  }

  return allPagePaths.filter((pagePath) => normalizedPagePaths.includes(pagePath));
}

function getRequestedPagePaths(argv) {
  return (argv || []).map((arg) => String(arg).trim()).filter((arg) => arg).map((arg) => {
    if (arg.startsWith('--page=')) {
      return arg.slice('--page='.length);
    }
    if (arg === '--page') {
      throw new Error('Missing value for --page');
    }
    return arg;
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForProcessExit(childProcess, timeoutMs) {
  if (childProcess.exitCode !== null) {
    return;
  }

  await new Promise((resolve) => {
    const timeoutId = setTimeout(resolve, timeoutMs);

    childProcess.once('exit', () => {
      clearTimeout(timeoutId);
      resolve();
    });
  });
}

function removeDirectoryWithRetries(targetDir) {
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      fs.rmSync(targetDir, { force: true, recursive: true });
      return;
    } catch (error) {
      if (error.code !== 'EBUSY' && error.code !== 'ENOTEMPTY') {
        throw error;
      }
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 250);
    }
  }

  fs.rmSync(targetDir, { force: true, recursive: true });
}

async function waitForJson(url, timeoutMs) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      // Browser not ready yet.
    }
    await delay(100);
  }

  throw new Error('Timed out waiting for DevTools at ' + url);
}

class DevToolsClient {
  constructor(webSocket) {
    this.id = 0;
    this.pending = new Map();
    this.eventHandlers = new Map();
    this.webSocket = webSocket;

    this.webSocket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) {
          return;
        }
        this.pending.delete(message.id);
        if (message.error) {
          pending.reject(new Error(message.error.message));
        } else {
          pending.resolve(message.result || {});
        }
        return;
      }

      const handlers = this.eventHandlers.get(message.method) || [];
      handlers.forEach((handler) => handler(message.params || {}));
    });
  }

  on(method, handler) {
    const handlers = this.eventHandlers.get(method) || [];
    handlers.push(handler);
    this.eventHandlers.set(method, handlers);
  }

  send(method, params) {
    const id = ++this.id;

    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve: resolve, reject: reject });
      this.webSocket.send(JSON.stringify({ id: id, method: method, params: params || {} }));
    });
  }

  close() {
    this.webSocket.close();
  }
}

function serializeRemoteObject(remoteObject) {
  if (remoteObject === null || remoteObject === undefined) {
    return '';
  }
  if (remoteObject.value !== undefined) {
    return String(remoteObject.value);
  }
  if (remoteObject.unserializableValue !== undefined) {
    return String(remoteObject.unserializableValue);
  }
  if (remoteObject.description) {
    return remoteObject.description;
  }
  return remoteObject.type || 'unknown';
}

function isStubbedResourceUrl(resourceUrl) {
  if (!resourceUrl) {
    return false;
  }

  try {
    const parsedUrl = new URL(resourceUrl, 'http://127.0.0.1');
    return parsedUrl.pathname.startsWith(TEST_STUB_PREFIX + '/');
  } catch (error) {
    return resourceUrl.indexOf(TEST_STUB_PREFIX + '/') !== -1;
  }
}

function shouldIgnoreFailure(failure) {
  if (!failure || !failure.text) {
    return false;
  }

  if (failure.text === 'Failed to load resource: net::ERR_BLOCKED_BY_CLIENT') {
    return true;
  }

  if (failure.text === 'Attempt 1 failed: Could not establish connection. Receiving end does not exist.') {
    return true;
  }

  if (failure.kind === 'network' && failure.text.indexOf('net::ERR_BLOCKED_BY_CLIENT') !== -1) {
    return isStubbedResourceUrl(failure.url) || isStubbedResourceUrl(failure.text);
  }

  return false;
}

function normalizeFailures(failures) {
  const seen = new Set();

  return failures.filter((failure) => !shouldIgnoreFailure(failure)).filter((failure) => {
    const key = [failure.kind, failure.text, failure.url || ''].join('::');

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

async function inspectPage(devtoolsBaseUrl, pageUrl) {
  const targetResponse = await fetch(devtoolsBaseUrl + '/json/new?' + encodeURIComponent('about:blank'), { method: 'PUT' });
  const target = await targetResponse.json();
  const webSocket = new WebSocket(target.webSocketDebuggerUrl);
  const failures = [];
  const requests = new Map();

  await new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new Error('Timed out connecting to DevTools target.')), 5000);

    webSocket.addEventListener('open', () => {
      clearTimeout(timeoutId);
      resolve();
    }, { once: true });
    webSocket.addEventListener('error', (event) => {
      clearTimeout(timeoutId);
      reject(new Error('Failed to connect to DevTools target.'));
    }, { once: true });
  });

  const client = new DevToolsClient(webSocket);
  let loadResolve;
  let loadReject;
  const loadPromise = new Promise((resolve, reject) => {
    loadResolve = resolve;
    loadReject = reject;
  });
  const loadTimeoutId = setTimeout(() => loadReject(new Error('Timed out waiting for page load.')), 10000);

  client.on('Page.loadEventFired', () => {
    clearTimeout(loadTimeoutId);
    loadResolve();
  });
  client.on('Runtime.consoleAPICalled', (params) => {
    if (params.type !== 'error' && params.type !== 'assert') {
      return;
    }
    failures.push({
      kind: 'console',
      text: (params.args || []).map(serializeRemoteObject).join(' ')
    });
  });
  client.on('Runtime.exceptionThrown', (params) => {
    const details = params.exceptionDetails || {};
    const exception = details.exception || {};
    failures.push({
      kind: 'exception',
      text: exception.description || details.text || 'Unknown runtime exception'
    });
  });
  client.on('Log.entryAdded', (params) => {
    const entry = params.entry || {};
    if (entry.level === 'error') {
      const entryUrl = entry.url || requests.get(entry.networkRequestId) || '';
      failures.push({
        kind: 'log',
        text: entry.text || 'Unknown log error',
        url: entryUrl
      });
    }
  });
  client.on('Network.requestWillBeSent', (params) => {
    requests.set(params.requestId, params.request.url);
  });
  client.on('Network.loadingFailed', (params) => {
    const requestUrl = requests.get(params.requestId) || '';
    if (params.errorText === 'net::ERR_ABORTED') {
      return;
    }
    if (requestUrl.startsWith(pageUrl.split('/').slice(0, 3).join('/'))) {
      failures.push({
        kind: 'network',
        text: params.errorText + ' ' + requestUrl,
        url: requestUrl
      });
    }
  });

  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('Log.enable');
  await client.send('Network.enable');
  await client.send('Page.navigate', { url: pageUrl });
  await loadPromise;
  await delay(Number(process.env.PAGE_CONSOLE_DELAY_MS) || 150);

  client.close();
  await fetch(devtoolsBaseUrl + '/json/close/' + target.id);

  return normalizeFailures(failures);
}

async function runConsoleSmokeCheck(requestedPagePaths) {
  if (!fs.existsSync(SITE_DIR)) {
    throw new Error('_site does not exist. Build the site first before running the console smoke check.');
  }

  const browserExecutable = findBrowserExecutable();
  const browserPort = await getFreePort();
  const serverPort = await getFreePort();
  const server = createStaticServer();
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'criptomo-page-console-'));
  const browserProcess = spawn(browserExecutable, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--remote-debugging-address=127.0.0.1',
    '--remote-debugging-port=' + browserPort,
    '--user-data-dir=' + userDataDir,
    'about:blank'
  ], {
    stdio: ['ignore', 'ignore', 'pipe']
  });
  const browserErrors = [];

  browserProcess.stderr.on('data', (chunk) => {
    browserErrors.push(chunk.toString());
  });

  await new Promise((resolve) => server.listen(serverPort, '127.0.0.1', resolve));

  try {
    await waitForJson('http://127.0.0.1:' + browserPort + '/json/version', 10000);
    const devtoolsBaseUrl = 'http://127.0.0.1:' + browserPort;
    const pagePaths = resolvePagePaths(collectPagePaths(), requestedPagePaths);
    const results = [];

    for (const pagePath of pagePaths) {
      const pageUrl = 'http://127.0.0.1:' + serverPort + pagePath;
      const failures = await inspectPage(devtoolsBaseUrl, pageUrl);

      results.push({
        page: pagePath,
        status: failures.length ? 'failed' : 'passed',
        failures: failures
      });
    }

    return {
      browser: browserExecutable,
      generatedAt: new Date().toISOString(),
      results: results,
      success: results.every((result) => result.status === 'passed')
    };
  } finally {
    server.close();
    browserProcess.kill();
    await waitForProcessExit(browserProcess, 5000);
    removeDirectoryWithRetries(userDataDir);
  }
}

function formatReport(report) {
  const lines = [
    '# Page Console Smoke Report',
    '',
    '- Generated: ' + report.generatedAt,
    '- Browser: ' + report.browser,
    '- Overall: ' + (report.success ? 'PASS' : 'FAIL'),
    '',
    '| Page | Status | Details |',
    '| --- | --- | --- |'
  ];

  report.results.forEach((result) => {
    const details = result.failures.length
      ? result.failures.map((failure) => failure.kind + ': ' + failure.text).join(' | ')
      : 'No console/runtime errors detected.';

    lines.push('| ' + result.page.replace(/\|/g, '\\|') + ' | ' + result.status.toUpperCase() + ' | ' + details.replace(/\|/g, '\\|') + ' |');
  });

  return lines.join('\n') + '\n';
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

function formatFailureDetail(failure) {
  if (!failure.url || String(failure.text).indexOf(failure.url) !== -1) {
    return failure.kind + ': ' + failure.text;
  }

  return failure.kind + ': ' + failure.text + ' (' + failure.url + ')';
}

function formatConsoleReport(report) {
  const rows = report.results.map((result) => {
    return [
      result.page,
      result.status === 'passed' ? 'PASS' : 'FAIL',
      result.failures.length
    ];
  });
  const lines = [
    'Page Console Smoke Report',
    'Generated: ' + report.generatedAt,
    'Browser: ' + report.browser,
    'Overall: ' + (report.success ? 'PASS' : 'FAIL'),
    '',
    formatConsoleTable(['Page', 'Status', 'Issues'], rows)
  ];

  if (report.results.length) {
    lines.push('', 'Details');

    report.results.forEach((result) => {
      lines.push('- ' + result.page);

      if (!result.failures.length) {
        lines.push('  No console/runtime errors detected.');
        return;
      }

      result.failures.forEach((failure) => {
        lines.push('  ' + formatFailureDetail(failure));
      });
    });
  }

  return lines.join('\n') + '\n';
}

function writeReport(report) {
  const markdown = formatReport(report);

  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(path.join(REPORT_DIR, 'report.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(REPORT_DIR, 'report.md'), markdown);

  return markdown;
}

async function main() {
  const report = await runConsoleSmokeCheck(getRequestedPagePaths(process.argv.slice(2)));
  const markdown = writeReport(report);

  console.log(formatConsoleReport(report));
  console.log('Saved JSON report to ' + path.join(REPORT_DIR, 'report.json'));
  console.log('Saved Markdown report to ' + path.join(REPORT_DIR, 'report.md'));

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
  collectPagePaths: collectPagePaths,
  formatConsoleReport: formatConsoleReport,
  formatReport: formatReport,
  getRequestedPagePaths: getRequestedPagePaths,
  normalizeRequestedPagePath: normalizeRequestedPagePath,
  resolvePagePaths: resolvePagePaths,
  rewriteHtml: rewriteHtml,
  isRedirectAliasHtml: isRedirectAliasHtml,
  normalizeFailures: normalizeFailures,
  shouldIgnoreFailure: shouldIgnoreFailure
};
