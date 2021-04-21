/**
 * Main JS file for theme behaviours
 */

docReady(function() {
  'use strict';

  $(document).ready(function () {
    // Responsive video embeds
    $('.entry-content').fitVids();
  });
});
