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

function setupGet(response) {
  $.get = jest.fn(function(url, callback) {
    if (callback) {
      callback(response);
    }

    return {
      always: function(fn) {
        if (fn) {
          fn(response);
        }
        return this;
      },
      error: function() {
        return this;
      },
      success: function(fn) {
        if (fn) {
          fn(response);
        }
        return this;
      }
    };
  });
}

module.exports = {
  setupGet: setupGet,
  setupJQuery: setupJQuery
};
