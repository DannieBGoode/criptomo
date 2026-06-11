// Minimal local server for manual testing of the market-data features:
// serves the built _site/ directory and routes /api/market/* into the real
// Netlify function handler (netlify/functions/market-data.js), so the
// calculators work locally exactly like in production.
//
// Usage:
//   bundle exec jekyll build
//   LIVECOINWATCH_API_KEY=<key> [CRYPTOCOMPARE_API_KEY=<key>] node bin/dev-server.js
//   open http://localhost:8888/inversion/
//
// Without the keys the LiveCoinWatch history route returns 500 and the
// CryptoCompare fallback calls go out keyless (401) — current prices still
// work because they hit LiveCoinWatch's keyless list directly.

const fs = require('fs');
const http = require('http');
const path = require('path');

const marketData = require('../netlify/functions/market-data.js');

const SITE_DIR = path.join(__dirname, '..', '_site');
const PORT = Number(process.env.PORT) || 8888;

const MIME_TYPES = {
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.xml': 'application/xml'
};

function resolveStaticFile(pathname) {
  const safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(SITE_DIR, safePath);

  if (!filePath.startsWith(SITE_DIR)) {
    return null;
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  return fs.existsSync(filePath) ? filePath : null;
}

const server = http.createServer(async function (req, res) {
  const url = new URL(req.url, 'http://localhost:' + PORT);

  if (url.pathname.indexOf('/api/market') === 0) {
    const queryStringParameters = {};
    url.searchParams.forEach(function (value, key) {
      queryStringParameters[key] = value;
    });

    try {
      const result = await marketData.handler({
        path: url.pathname,
        queryStringParameters: queryStringParameters
      });
      res.writeHead(result.statusCode, result.headers);
      res.end(result.body);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  const filePath = resolveStaticFile(url.pathname);

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found: ' + url.pathname);
    return;
  }

  res.writeHead(200, { 'Content-Type': MIME_TYPES[path.extname(filePath)] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, function () {
  console.log('Serving _site/ with the market-data function on http://localhost:' + PORT);
  console.log('LIVECOINWATCH_API_KEY: ' + (process.env.LIVECOINWATCH_API_KEY ? 'set' : 'NOT SET (lcw/history will 500)'));
  console.log('CRYPTOCOMPARE_API_KEY: ' + (process.env.CRYPTOCOMPARE_API_KEY ? 'set' : 'not set (fallback calls go keyless)'));
});
