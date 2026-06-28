(() => {
  const prompt = document.querySelector('#languagePrompt');
  const currentPageIsFrench = document.documentElement.lang.toLowerCase().startsWith('fr');

  const readPreference = () => {
    try { return localStorage.getItem('siteLanguage'); } catch { return null; }
  };

  const savePreference = language => {
    try { localStorage.setItem('siteLanguage', language); } catch {}
  };

  document.querySelectorAll('.language-option').forEach(link => {
    link.addEventListener('click', () => savePreference(link.dataset.language));
  });

  if (!prompt || currentPageIsFrench) return;

  prompt.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      const language = button.dataset.language === 'fr' ? 'fr' : 'en';
      savePreference(language);
      prompt.hidden = true;
      if (language === 'fr') window.location.href = 'index-fr.html';
    });
  });

  const browserLanguage = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase();
  const hasPreference = ['en', 'fr'].includes(readPreference());
  prompt.hidden = hasPreference || browserLanguage.startsWith('en');
})();