/**
 * Pre-paint bootstrap — runs before the React bundle so neither the theme nor
 * the text direction ever flashes.
 *
 * SECURITY: this lives in an external same-origin file on purpose. As inline
 * <script> blocks it forced `script-src 'unsafe-inline'` in the CSP, which
 * disables the single most effective XSS mitigation. `script-src 'self'` is
 * enough now. Keep it free of any dynamic/injected code.
 */
(function () {
  try {
    /* ---- theme ---- */
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'dark';

    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;

    /* ---- language / direction ---- */
    var locale = localStorage.getItem('locale');
    if (locale !== 'en' && locale !== 'ar') {
      var preferred = navigator.language || 'en';
      locale = preferred.toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en';
    }

    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  } catch (error) {
    /* Private-mode / storage-disabled browsers must still render. */
  }
})();