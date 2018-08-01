
if (window.location.hash) {
    $(".tag-" + window.location.hash.replace("#","")).show();
}
$(window).on('hashchange', function() {
  $(".tag").hide();
  $(".tag-" + window.location.hash.replace("#","")).show();
  $(".selected-tag-title").html(window.location.hash.toUpperCase());
});