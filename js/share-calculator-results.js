function getShareUrl(social, pageUrl, text) {
  if (social === 'facebook') {
    return 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl + '&amp;t=' + text;
  } else if (social === 'twitter') {
    return 'https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + text + ' %23criptomo';
  } else if (social === 'whatsapp') {
    return 'https://api.whatsapp.com/send?phone=whatsappphonenumber&text=' + text + ' ' + pageUrl;
  } else if (social === 'telegram') {
    return 'https://telegram.me/share/url?url=' + pageUrl + '&text=' + text;
  } else if (social === 'linkedin') {
    return 'https://www.linkedin.com/shareArticle?mini=true&url=' + pageUrl + '&title=' + text;
  } else if (social === 'reddit') {
    return 'http://www.reddit.com/submit?url=' + pageUrl +' &title=' + text;
  }

  return '';
}

function shareOnSocial(social) {
  const URL = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(document.querySelector(".calculator-results-text").textContent);
  let shareUrl = getShareUrl(social, URL, text);
  window.open(shareUrl, 'newWindow', width=600,height=300);
  return false;
}

if (typeof module !== 'undefined') {
  module.exports = {
    getShareUrl: getShareUrl,
    shareOnSocial: shareOnSocial
  };
}
