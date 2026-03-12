const pageConsole = require('../bin/check-page-console-errors.js');

describe('page console smoke helpers', () => {
  test('ignores blocked tracker stub failures but keeps real page failures', () => {
    const failures = [
      {
        kind: 'network',
        text: 'net::ERR_BLOCKED_BY_CLIENT http://127.0.0.1:4000/__test_stubs__/noop.js?id=GTM-TV5P5BH',
        url: 'http://127.0.0.1:4000/__test_stubs__/noop.js?id=GTM-TV5P5BH'
      },
      {
        kind: 'log',
        text: 'Failed to load resource: net::ERR_BLOCKED_BY_CLIENT',
        url: 'http://127.0.0.1:4000/__test_stubs__/noop.js?id=GTM-TV5P5BH'
      },
      {
        kind: 'console',
        text: 'Attempt 1 failed: Could not establish connection. Receiving end does not exist.'
      },
      {
        kind: 'log',
        text: 'Failed to load resource: the server responded with a status of 404 (Not Found)',
        url: 'http://127.0.0.1:4000/missing-script.js'
      },
      {
        kind: 'exception',
        text: 'ReferenceError: broken is not defined'
      },
      {
        kind: 'exception',
        text: 'ReferenceError: broken is not defined'
      }
    ];

    expect(pageConsole.shouldIgnoreFailure(failures[0])).toBe(true);
    expect(pageConsole.shouldIgnoreFailure(failures[1])).toBe(true);
    expect(pageConsole.shouldIgnoreFailure(failures[2])).toBe(true);
    expect(pageConsole.shouldIgnoreFailure(failures[3])).toBe(false);

    expect(pageConsole.normalizeFailures(failures)).toEqual([
      failures[3],
      failures[4]
    ]);
  });

  test('detects generated redirect alias pages', () => {
    const redirectHtml = [
      '<!DOCTYPE html>',
      '<html lang="en-US">',
      '<title>Redirecting&hellip;</title>',
      '<meta http-equiv="refresh" content="0; url=http://localhost:4000/en/investment/">',
      '<meta name="robots" content="noindex">',
      '</html>'
    ].join('');

    expect(pageConsole.isRedirectAliasHtml(redirectHtml)).toBe(true);
    expect(pageConsole.isRedirectAliasHtml('<html><head></head><body>Real page</body></html>')).toBe(false);
  });

  test('rewrites third-party scripts to local stubs and injects the prelude', () => {
    const html = '<html><head><script src="https://www.googletagmanager.com/gtm.js"></script></head><body></body></html>';
    const rewritten = pageConsole.rewriteHtml(html);

    expect(rewritten).toContain('/__test_stubs__/noop.js');
    expect(rewritten).toContain('window.fetch = function');
  });
  test('normalizes requested page paths from cli args', () => {
    expect(pageConsole.getRequestedPagePaths(['/calculadora/', '--page=/en/calculator/', 'de/gewinnrechner'])).toEqual([
      '/calculadora/',
      '/en/calculator/',
      'de/gewinnrechner'
    ]);
    expect(pageConsole.normalizeRequestedPagePath('https://127.0.0.1:4000/calculadora')).toBe('/calculadora/');
    expect(pageConsole.normalizeRequestedPagePath('de/gewinnrechner')).toBe('/de/gewinnrechner/');
    expect(() => pageConsole.getRequestedPagePaths(['--page'])).toThrow('Missing value for --page');
  });

  test('resolves requested page paths against generated pages', () => {
    const pagePaths = ['/', '/calculadora/', '/en/calculator/', '/de/gewinnrechner/'];

    expect(pageConsole.resolvePagePaths(pagePaths, ['/calculadora', 'de/gewinnrechner'])).toEqual([
      '/calculadora/',
      '/de/gewinnrechner/'
    ]);
    expect(pageConsole.resolvePagePaths(pagePaths)).toEqual(pagePaths);
    expect(() => pageConsole.resolvePagePaths(pagePaths, ['/missing/'])).toThrow('Unknown page path(s): /missing/');
  });

  test('formats a readable console report with a fixed-width table', () => {
    const report = {
      browser: 'msedge',
      generatedAt: '2026-03-10T12:00:00.000Z',
      results: [
        {
          failures: [],
          page: '/en/calculator/',
          status: 'passed'
        },
        {
          failures: [
            {
              kind: 'exception',
              text: 'ReferenceError: broken is not defined'
            },
            {
              kind: 'log',
              text: 'Failed to load resource: the server responded with a status of 404 (Not Found)',
              url: 'http://127.0.0.1:4000/missing-script.js'
            }
          ],
          page: '/de/gewinnrechner/',
          status: 'failed'
        }
      ],
      success: false
    };
    const consoleReport = pageConsole.formatConsoleReport(report);

    expect(consoleReport).toContain('Page Console Smoke Report');
    expect(consoleReport).toContain('| Page               | Status | Issues |');
    expect(consoleReport).toContain('| /en/calculator/    | PASS   | 0      |');
    expect(consoleReport).toContain('| /de/gewinnrechner/ | FAIL   | 2      |');
    expect(consoleReport).toContain('No console/runtime errors detected.');
    expect(consoleReport).toContain('exception: ReferenceError: broken is not defined');
    expect(consoleReport).toContain('log: Failed to load resource: the server responded with a status of 404 (Not Found) (http://127.0.0.1:4000/missing-script.js)');
  });
});
