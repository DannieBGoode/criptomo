  function shareOnSocial(social) {
    const URL = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.querySelector(".calculator-results-text").textContent);
    let shareUrl;
    if (social === 'facebook') {
      shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + URL + '&amp;t=' + text;
    } else if (social === 'twitter') {
      shareUrl = 'https://twitter.com/intent/tweet?url=' + URL + '&text=' + text;
    } else if (social === 'whatsapp') {
      shareUrl = 'https://api.whatsapp.com/send?phone=whatsappphonenumber&text=' + text + ' ' + URL;
    } else if (social === 'telegram') {
      shareUrl = 'tg://msg_url?url=' + URL;
    } else if (social === 'linkedin') {
      shareUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=' + URL;
    } else if (social === 'reddit') {
      shareUrl = 'http://www.reddit.com/submit?url=' + URL +' &title=' + text;
    }
    window.open(shareUrl, 'newWindow',width=600,height=300);
    return false;
  }