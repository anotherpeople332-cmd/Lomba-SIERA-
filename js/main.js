(() => {
  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const nav = document.querySelector('.nav-links');
      const menuButton = document.querySelector('.hamburger');
      if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Buka menu');
      }
    }
  });
})();
