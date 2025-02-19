//TDS
(function () {
  var url = new URL(window.location.href);
  var params = ['l', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'param1', 'param2', 'param3', 'param4', 'creative_type', 'creative_id'];
  var linkParams = ['affid', 'cpaid']; // ищем в url redirectUrl в url:

  if (url.searchParams.has('redirectUrl')) {
      var redirectUrl = new URL(url.searchParams.get('redirectUrl'));

      if (redirectUrl.href.match(/\//g).length === 4 && redirectUrl.searchParams.get('l')) {
          //если ссылка в ссылка redirectUrl корректная
          localStorage.setItem('redirectUrl', redirectUrl.href); // указываем точкой входа домен с протоколом из redirectUrl
      }
  }

  params.forEach(function (param) {
      if (url.searchParams.has(param)) localStorage.setItem(param, url.searchParams.get(param));
  });

  linkParams.forEach(function (linkParam) {
      if (url.searchParams.has(linkParam)) localStorage.setItem(linkParam, url.searchParams.get(linkParam));
  });

  window.addEventListener('click', function (e) {
      var link,
          parent = e.target.closest('a');

      if (parent.getAttribute('href') !== 'https://tds.favbet.partners') {
          return;
      }

      if (parent) {
          e.preventDefault();
          var affid = localStorage.getItem('affid');
          var cpaid = localStorage.getItem('cpaid');

          if (localStorage.getItem("redirectUrl")) {
              link = new URL(localStorage.getItem("redirectUrl"));
          } else {
              link = new URL(parent.href);
              if (affid && cpaid) {
                  link.pathname = '/' + affid + '/' + cpaid;
              }
          }

          params.forEach(function (param) {
              if (url.searchParams.has(param)) {
                  link.searchParams.set(param, localStorage.getItem(param));
              }
          });

          document.location.href = link;
      }
  });
})();

// need ???
(function init100vh() {
    function setHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setHeight();
    window.addEventListener('resize', setHeight);
})();

window.addEventListener("orientationchange", () => {
    location.reload(true)
});

// color padding-top
document.addEventListener("DOMContentLoaded", function() {
    function isIOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    function isMacOS() {
        return navigator.platform === 'MacIntel' && !navigator.userAgent.includes('Mobile');
    }

    let bannerDate = document.querySelector('.banner__date');
    let bannerTime = document.querySelector('.banner__time');
    let bannerTeam = document.querySelector('.banner__team');
    let bannerBonusL = document.querySelector('.banner__bonus-left');
    let bannerBonusR = document.querySelector('.banner__bonus-right');

    if (!isIOS() && !isMacOS() && bannerDate && bannerTime && bannerBonusL && bannerBonusR && bannerTeam) {
        bannerDate.classList.add('noios-padding');
        bannerTime.classList.add('noios-padding');
        bannerBonusL.classList.add('noios-padding');
        bannerBonusR.classList.add('noios-padding');
        bannerTeam.classList.add('noios-padding');
    }
});