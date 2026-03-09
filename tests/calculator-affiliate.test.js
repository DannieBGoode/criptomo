const { loadModule } = require('./helpers/load-module');

describe('calculator-affiliate.js', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = `
      <div class="calculator-affiliate-codebox" data-copied="Copied now" tabindex="0">
        <span class="calculator-affiliate-code" data-code="SAVE20">SAVE20</span>
      </div>
    `;
    document.execCommand = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('copies with clipboard api and restores label text', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: jest.fn().mockResolvedValue(undefined)
      }
    });

    loadModule('../js/calculator-affiliate.js');
    document.querySelector('.calculator-affiliate-codebox').click();
    await Promise.resolve();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('SAVE20');
    expect(document.querySelector('.calculator-affiliate-code').textContent).toBe('Copied now');

    jest.advanceTimersByTime(2000);
    expect(document.querySelector('.calculator-affiliate-code').textContent).toBe('SAVE20');
  });

  test('falls back to execCommand for keyboard activation when clipboard api is unavailable', () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined
    });

    loadModule('../js/calculator-affiliate.js');
    document.querySelector('.calculator-affiliate-codebox').dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      key: 'Enter'
    }));

    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(document.querySelector('.calculator-affiliate-code').textContent).toBe('Copied now');
  });
});
