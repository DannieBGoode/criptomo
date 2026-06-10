const { loadModule } = require('./helpers/load-module');

function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function buildSimulatorDom() {
  document.body.innerHTML = `
    <select id="invest-currency">
      <option value="BTC" selected>Bitcoin</option>
      <option value="ETH">Ethereum</option>
      <option class="editable">Otra moneda...</option>
    </select>
    <input class="calculator-othercoins" placeholder="XYZ" value="" />
    <input id="invest-quantity" type="number" value="1" />
    <input id="invest-target-price" type="number" value="100000" />
    <select id="invest-fiat">
      <option value="USD" selected>USD</option>
      <option value="EUR">EUR</option>
    </select>
    <div class="loader calculator-loader-container"></div>
    <div class="calculator-result-container">
      <div id="simulator-results">
        <table>
          <tr>
            <th class="label-current-price" data-prefix="Precio">Precio 1 BTC</th>
            <td><span class="result-coin"></span></td>
          </tr>
          <tr><th>Cantidad</th><td><span class="result-quantity"></span></td></tr>
          <tr><th></th><td><span class="result-current-price"></span></td></tr>
          <tr><th>Valor actual</th><td><span class="result-current-value"></span></td></tr>
          <tr><th>Precio Futuro</th><td><span class="result-target-price"></span></td></tr>
          <tr><th>Valor futuro</th><td><span class="result-future-value"></span></td></tr>
          <tr><th>Ganancia</th><td><span class="result-gain"></span></td></tr>
          <tr><th>Porcentaje</th><td><span class="gained-percentage"></span></td></tr>
        </table>
      </div>
      <div class="error coin-error"></div>
      <div class="error api-error"></div>
    </div>
  `;
}

describe('simulator.js', () => {
  beforeEach(() => {
    buildSimulatorDom();
  });

  // ── Pure utilities ────────────────────────────────────────────

  describe('formatCurrency', () => {
    test('formats amount with fiat prefix and two decimal places', () => {
      const sim = loadModule('../js/simulator.js');
      expect(sim.formatCurrency(1000, 'USD')).toBe('USD 1,000.00');
    });

    test('formats fractional amount correctly', () => {
      const sim = loadModule('../js/simulator.js');
      expect(sim.formatCurrency(0.5, 'EUR')).toBe('EUR 0.50');
    });

    test('formats large amounts with thousand separators', () => {
      const sim = loadModule('../js/simulator.js');
      expect(sim.formatCurrency(1234567.89, 'USD')).toBe('USD 1,234,567.89');
    });
  });

  describe('formatPercentage', () => {
    test('prefixes positive values with +', () => {
      const sim = loadModule('../js/simulator.js');
      expect(sim.formatPercentage(17.5)).toBe('+17.50%');
    });

    test('does not add + prefix to negative values', () => {
      const sim = loadModule('../js/simulator.js');
      expect(sim.formatPercentage(-33.33)).toBe('-33.33%');
    });

    test('treats zero as non-negative', () => {
      const sim = loadModule('../js/simulator.js');
      expect(sim.formatPercentage(0)).toBe('+0.00%');
    });
  });

  // ── Coin selection ────────────────────────────────────────────

  describe('getSimulatorCoin', () => {
    test('returns the value of the selected option', () => {
      const sim = loadModule('../js/simulator.js');
      expect(sim.getSimulatorCoin()).toBe('BTC');
    });

    test('returns a different coin when a different option is selected', () => {
      const sim = loadModule('../js/simulator.js');
      document.querySelector('#invest-currency').value = 'ETH';
      expect(sim.getSimulatorCoin()).toBe('ETH');
    });

    test('returns the text input uppercased when editable option is selected', () => {
      const sim = loadModule('../js/simulator.js');
      const select = document.querySelector('#invest-currency');
      const editableOption = select.querySelector('.editable');
      Array.from(select.options).forEach((opt) => { opt.selected = false; });
      editableOption.selected = true;
      document.querySelector('.calculator-othercoins').value = 'doge';
      expect(sim.getSimulatorCoin()).toBe('DOGE');
    });

    test('returns empty string when editable is selected but input is blank', () => {
      const sim = loadModule('../js/simulator.js');
      const select = document.querySelector('#invest-currency');
      const editableOption = select.querySelector('.editable');
      Array.from(select.options).forEach((opt) => { opt.selected = false; });
      editableOption.selected = true;
      document.querySelector('.calculator-othercoins').value = '   ';
      expect(sim.getSimulatorCoin()).toBe('');
    });
  });

  // ── Result painting ───────────────────────────────────────────

  describe('paintSimulatorResults', () => {
    test('renders coin, quantity, prices and computed values in the DOM', () => {
      const sim = loadModule('../js/simulator.js');
      sim.paintSimulatorResults('BTC', 2, 'USD', 50000, 100000);

      expect(document.querySelector('.result-coin').textContent).toBe('BTC');
      expect(document.querySelector('.result-quantity').textContent).toBe('2');
      expect(document.querySelector('.result-current-price').textContent).toBe('USD 50,000.00');
      expect(document.querySelector('.result-current-value').textContent).toBe('USD 100,000.00');
      expect(document.querySelector('.result-target-price').textContent).toBe('USD 100,000.00');
      expect(document.querySelector('.result-future-value').textContent).toBe('USD 200,000.00');
      expect(document.querySelector('.result-gain').textContent).toBe('USD 100,000.00');
    });

    test('updates the label-current-price th with data-prefix and coin name', () => {
      const sim = loadModule('../js/simulator.js');
      sim.paintSimulatorResults('ETH', 1, 'USD', 3000, 5000);
      expect(document.querySelector('.label-current-price').textContent).toBe('Precio 1 ETH');
    });

    test('marks gained-percentage with positive class and correct text on gain', () => {
      const sim = loadModule('../js/simulator.js');
      sim.paintSimulatorResults('BTC', 1, 'USD', 50000, 100000);
      const el = document.querySelector('.gained-percentage');
      expect(el.textContent).toBe('+100.00%');
      expect(el.className).toContain('gained-percentage-positive');
      expect(el.className).not.toContain('gained-percentage-negative');
    });

    test('marks gained-percentage with negative class and correct text on loss', () => {
      const sim = loadModule('../js/simulator.js');
      sim.paintSimulatorResults('BTC', 1, 'USD', 100000, 50000);
      const el = document.querySelector('.gained-percentage');
      expect(el.textContent).toBe('-50.00%');
      expect(el.className).toContain('gained-percentage-negative');
      expect(el.className).not.toContain('gained-percentage-positive');
    });

    test('reports +0.00% gain when currentPrice is zero', () => {
      const sim = loadModule('../js/simulator.js');
      sim.paintSimulatorResults('BTC', 1, 'USD', 0, 50000);
      expect(document.querySelector('.gained-percentage').textContent).toBe('+0.00%');
    });
  });

  // ── State transitions ─────────────────────────────────────────

  describe('showSimulatorLoading', () => {
    test('adds is-visible to loader and removes it from result container and results', () => {
      const sim = loadModule('../js/simulator.js');
      document.querySelector('.calculator-result-container').classList.add('is-visible');
      document.querySelector('#simulator-results').classList.add('is-visible');

      sim.showSimulatorLoading();

      expect(document.querySelector('.calculator-loader-container').classList.contains('is-visible')).toBe(true);
      expect(document.querySelector('.calculator-result-container').classList.contains('is-visible')).toBe(false);
      expect(document.querySelector('#simulator-results').classList.contains('is-visible')).toBe(false);
    });
  });

  describe('showSimulatorResults', () => {
    test('adds is-visible to result container and results, removes from loader', () => {
      const sim = loadModule('../js/simulator.js');
      document.querySelector('.calculator-loader-container').classList.add('is-visible');

      sim.showSimulatorResults();

      expect(document.querySelector('.calculator-loader-container').classList.contains('is-visible')).toBe(false);
      expect(document.querySelector('.calculator-result-container').classList.contains('is-visible')).toBe(true);
      expect(document.querySelector('#simulator-results').classList.contains('is-visible')).toBe(true);
    });
  });

  describe('showSimulatorError', () => {
    test('shows coin-error and result container, hides results and loader', () => {
      const sim = loadModule('../js/simulator.js');
      document.querySelector('#simulator-results').classList.add('is-visible');
      document.querySelector('.calculator-loader-container').classList.add('is-visible');

      sim.showSimulatorError();

      expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(true);
      expect(document.querySelector('.calculator-result-container').classList.contains('is-visible')).toBe(true);
      expect(document.querySelector('#simulator-results').classList.contains('is-visible')).toBe(false);
      expect(document.querySelector('.calculator-loader-container').classList.contains('is-visible')).toBe(false);
    });
  });

  // ── calculateSimulator ────────────────────────────────────────

  describe('calculateSimulator', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ USD: 85000 })
      });
    });

    test('shows error and skips fetch when quantity is zero', () => {
      const sim = loadModule('../js/simulator.js');
      document.querySelector('#invest-quantity').value = '0';
      sim.calculateSimulator();
      expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(true);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('shows error and skips fetch when quantity is negative', () => {
      const sim = loadModule('../js/simulator.js');
      document.querySelector('#invest-quantity').value = '-5';
      sim.calculateSimulator();
      expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(true);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('shows error and skips fetch when target price is zero', () => {
      const sim = loadModule('../js/simulator.js');
      document.querySelector('#invest-target-price').value = '0';
      sim.calculateSimulator();
      expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(true);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('shows error and skips fetch when coin is empty', () => {
      const sim = loadModule('../js/simulator.js');
      const select = document.querySelector('#invest-currency');
      const editableOption = select.querySelector('.editable');
      Array.from(select.options).forEach((opt) => { opt.selected = false; });
      editableOption.selected = true;
      document.querySelector('.calculator-othercoins').value = '';
      sim.calculateSimulator();
      expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(true);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('fetches from cryptocompare API with the selected coin and fiat', async () => {
      const sim = loadModule('../js/simulator.js');
      sim.calculateSimulator();
      await flushPromises();
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('fsym=BTC'));
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('tsyms=USD'));
    });

    test('shows error when API returns Response: Error', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ Response: 'Error' })
      });
      const sim = loadModule('../js/simulator.js');
      sim.calculateSimulator();
      await flushPromises();
      await flushPromises();
      expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(true);
      expect(document.querySelector('#simulator-results').classList.contains('is-visible')).toBe(false);
    });

    test('shows api-error when API returns an auth/provider error payload', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          Data: {},
          Err: {
            message: 'API key required',
            http_status_code: 401
          }
        })
      });
      const sim = loadModule('../js/simulator.js');
      sim.calculateSimulator();
      await flushPromises();
      await flushPromises();
      expect(document.querySelector('.api-error').classList.contains('is-visible')).toBe(true);
      expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(false);
      expect(document.querySelector('#simulator-results').classList.contains('is-visible')).toBe(false);
    });

    test('shows error when API returns a price of zero', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ USD: 0 })
      });
      const sim = loadModule('../js/simulator.js');
      sim.calculateSimulator();
      await flushPromises();
      await flushPromises();
      expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(true);
    });

    test('shows error when the network request fails', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
      const sim = loadModule('../js/simulator.js');
      sim.calculateSimulator();
      await flushPromises();
      await flushPromises();
      expect(document.querySelector('.api-error').classList.contains('is-visible')).toBe(true);
      expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(false);
    });

    test('paints results and shows simulator-results on a successful API response', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ USD: 85000 })
      });
      const sim = loadModule('../js/simulator.js');
      document.querySelector('#invest-quantity').value = '2';
      document.querySelector('#invest-target-price').value = '100000';
      sim.calculateSimulator();
      await flushPromises();
      await flushPromises();

      expect(document.querySelector('#simulator-results').classList.contains('is-visible')).toBe(true);
      expect(document.querySelector('.result-coin').textContent).toBe('BTC');
      expect(document.querySelector('.result-future-value').textContent).toBe('USD 200,000.00');
      expect(document.querySelector('.result-gain').textContent).toBe('USD 30,000.00');
    });
  });
});
