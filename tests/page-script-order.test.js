const fs = require('fs');
const path = require('path');

function readPage(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
}

describe('page script order', () => {
  test.each([
    ['_pages/es/invest.md', '/js/invest.js'],
    ['_pages/en/en-invest.md', '/js/invest.js'],
    ['_pages/es/icos.md', '/js/icos.js'],
    ['_pages/en/en-icos.md', '/js/icos.js'],
    ['_pages/es/marketcaps.md', '/js/marketcaps.js'],
    ['_pages/en/en-marketcaps.md', '/js/marketcaps.js']
  ])('loads DataTables before %s page script', (relativePath, pageScriptPath) => {
    const content = readPage(relativePath);
    const datatablesIndex = content.indexOf('https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js');
    const processingIndex = content.indexOf('https://cdn.datatables.net/plug-ins/1.10.16/api/processing().js');
    const responsiveIndex = content.indexOf('https://cdn.datatables.net/responsive/2.2.1/js/dataTables.responsive.min.js');
    const pageScriptIndex = content.indexOf(pageScriptPath);

    expect(datatablesIndex).toBeGreaterThan(-1);
    expect(processingIndex).toBeGreaterThan(-1);
    expect(responsiveIndex).toBeGreaterThan(-1);
    expect(pageScriptIndex).toBeGreaterThan(-1);
    expect(datatablesIndex).toBeLessThan(pageScriptIndex);
    expect(processingIndex).toBeLessThan(pageScriptIndex);
    expect(responsiveIndex).toBeLessThan(pageScriptIndex);
  });
});