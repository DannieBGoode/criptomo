let src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
let id = "adsense";
let callback = function() {
	(adsbygoogle = window.adsbygoogle || []).push({
	    google_ad_client: "ca-pub-1252171391624665",
	    enable_page_level_ads: true
	  });
};
function loadScript (src, id, callback) {
    let script = document.createElement('script');
    script.src = src; // URL for the third-party library being loaded.
    //script.id = id; // e.g., googleMaps or stripe
    script.defer = true; // make sure that browser will run script after page loaded
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback(); // conditional callback
    };
};
loadScript(src, id, callback);