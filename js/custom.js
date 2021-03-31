/**
 * Main JS file for theme behaviours
 */

docReady(function() {
  'use strict';

  $(document).ready(function () {
    // Responsive video embeds
    $('.entry-content').fitVids();

    // mgnific
    $('.image-link').magnificPopup({type: 'image'});
    $('.popup-link').magnificPopup({
      type: 'image'
      // other options
    });
  });
});
