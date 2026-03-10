function setupJQuery(tableFactory) {
  const $ = require('jquery');

  $.fn.isotope = jest.fn(function(options) {
    this[0] && (this[0].__isotopeOptions = options);
    return this;
  });

  $.fn.DataTable = jest.fn(function() {
    return tableFactory || {
      clear: jest.fn().mockReturnThis(),
      columns: {
        adjust: jest.fn().mockReturnThis()
      },
      draw: jest.fn().mockReturnThis(),
      page: {
        len: jest.fn().mockReturnValue({
          draw: jest.fn()
        })
      },
      processing: jest.fn().mockReturnThis(),
      responsive: {
        recalc: jest.fn()
      },
      rows: {
        add: jest.fn().mockReturnThis()
      },
      search: jest.fn().mockReturnValue({
        draw: jest.fn()
      })
    };
  });

  global.$ = $;
  global.jQuery = $;

  return $;
}

function normalizeGetStep(step) {
  if (step && typeof step === 'object' && Object.prototype.hasOwnProperty.call(step, 'response')) {
    return step;
  }

  return {
    response: step
  };
}

function setupGetQueue(steps) {
  const queue = steps.map(normalizeGetStep);

  $.get = jest.fn(function(url, callback) {
    const step = queue.length > 1 ? queue.shift() : queue[0];
    const callbackResponse = Object.prototype.hasOwnProperty.call(step, 'callbackResponse')
      ? step.callbackResponse
      : step.response;

    if (callback && step.trigger !== 'error' && step.invokeCallback !== false) {
      callback(callbackResponse);
    }

    return {
      always: function(fn) {
        if (fn && step.invokeAlways !== false) {
          fn(step.response);
        }
        return this;
      },
      error: function(fn) {
        if (fn && step.trigger === 'error') {
          fn(step.response);
        }
        return this;
      },
      success: function(fn) {
        if (fn && step.trigger !== 'error') {
          fn(step.response);
        }
        return this;
      }
    };
  });
}

function setupGet(response) {
  setupGetQueue([{ response: response }]);
}

module.exports = {
  setupGet: setupGet,
  setupGetQueue: setupGetQueue,
  setupJQuery: setupJQuery
};
