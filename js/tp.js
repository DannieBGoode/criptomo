// On mobile we lazy loads ads
if mobileAndTabletcheck() {

    let elements;
    function initAds() {
        elements = document.getElementsByClassName('lazy-load-ad');
        if (!elements.length) {
            return null;
        }
    }
    initAds();

    var googleAdScriptAppended = false;

    window.addEventListener('scroll', function (e) {
        var currentScroll = document.scrollingElement.scrollTop;

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if ((currentScroll > element.getBoundingClientRect().top - 100)) {

                if (!googleAdScriptAppended) {

                    googleAdScriptAppended = true;
                    var scriptElement = document.createElement("script");
                    scriptElement.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
                    document.body.appendChild(scriptElement);
                }

                if (window.adsbygoogle) {
                    element.classList.remove('lazy-load-ad');
                    element.classList.add('lazy-loaded-ad');
                    element.innerHTML = getAdsenseCode();
                    loadAd();

                    elements = document.getElementsByClassName('lazy-load-ad');
                }
            }
        }
    }, false);

    //TODO change this to your ad unit!
    var getAdsenseCode = function () {
        return '<div class="addsense-add">' +
                  '<ins class="adsbygoogle white-ad"' +
                        'style="display:block"' +
                        'data-ad-format="auto"' +
                        'data-ad-client="ca-pub-1252171391624665"' +
                        'data-ad-slot="1002456567">' + 
                  '</ins > ' +
               '</div>';
    };

    var loadAd = function () {
        (adsbygoogle = window.adsbygoogle || []).push({});
    };
}
// Desktop
else {

    var scriptElement = document.createElement("script");
    scriptElement.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    document.body.appendChild(scriptElement);

    (adsbygoogle = window.adsbygoogle || []).onload = function () {
        [].forEach.call(document.getElementsByClassName('adsbygoogle'), function () {
            adsbygoogle.push({
                google_ad_client: "ca-pub-1252171391624665",
                enable_page_level_ads: true
            });
        });
    }
}