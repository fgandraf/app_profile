(function () {
  'use strict';

  const STORAGE_KEY = 'granawiz_lang';
  const DEFAULT_LANG = 'en';
  const LANG_ATTR = { br: 'pt-BR', en: 'en' };
  const LANG_IMG_SUFFIX = { br: 'pt', en: 'en' };

  let currentLang = DEFAULT_LANG;
  let detectedOS = 'mac';

  function detectOS() {
    const ua = (navigator.userAgent || '').toLowerCase();
    const platform = (navigator.platform || '').toLowerCase();
    if (/win/.test(platform) || /windows/.test(ua)) detectedOS = 'win';
    else if (/linux/.test(platform) || /linux/.test(ua)) detectedOS = 'linux';
    const card = document.querySelector('.download-card[data-os="' + detectedOS + '"]');
    if (card) card.classList.add('recommended');
  }

  async function fetchTranslation(lang) {
    const cached = sessionStorage.getItem('gw_t_' + lang);
    if (cached) return JSON.parse(cached);
    const res = await fetch('languages/' + lang + '.json');
    if (!res.ok) throw new Error('Failed to load: ' + lang + '.json');
    const data = await res.json();
    sessionStorage.setItem('gw_t_' + lang, JSON.stringify(data));
    return data;
  }

  function get(obj, path) {
    return path.split('.').reduce(function (o, k) { return o != null ? o[k] : undefined; }, obj);
  }

  function applyTranslations(t) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = get(t, el.dataset.i18n);
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var val = get(t, el.dataset.i18nHtml);
      if (val !== undefined) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var parts = el.dataset.i18nAttr.split(':');
      var val = get(t, parts[1]);
      if (val !== undefined) el.setAttribute(parts[0], val);
    });

    if (t.page) {
      if (t.page.title) document.title = t.page.title;
      var meta = document.querySelector('meta[name="description"]');
      if (meta && t.page.description) meta.setAttribute('content', t.page.description);
    }

    document.documentElement.lang = LANG_ATTR[currentLang] || 'pt-BR';

    var heroLabel = document.getElementById('heroDownloadLabel');
    if (heroLabel) {
      var osBtn = get(t, 'download.' + detectedOS + '.btn');
      if (osBtn) heroLabel.textContent = osBtn;
    }

    var detectedLabel = get(t, 'download.detected');
    if (detectedLabel) {
      document.querySelectorAll('.download-card').forEach(function (card) {
        card.dataset.detectedLabel = detectedLabel;
      });
    }

    var suffix = LANG_IMG_SUFFIX[currentLang] || 'en';
    document.querySelectorAll('[data-lang-src]').forEach(function (img) {
      img.src = img.dataset.langSrc.replace('{lang}', suffix);
    });
  }

  function updateSelector() {
    document.querySelectorAll('.gw-lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
  }

  async function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    var t = await fetchTranslation(lang);
    applyTranslations(t);
    updateSelector();
  }

  function init() {
    detectOS();

    document.querySelectorAll('.gw-lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        setLanguage(btn.dataset.lang);
      });
    });

    var lang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    setLanguage(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
