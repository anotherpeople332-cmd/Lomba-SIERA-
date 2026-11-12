(() => {
  const pages = [
    ['Beranda', 'index.html'],
    ['Cerita Jogja', 'sejarah.html'],
    ['Galeri', 'galeri.html'],
    ['Berita', 'berita.html'],
  ];
  const nested = window.location.pathname.split('/').includes('destinasi');
  const base = nested ? '../' : './';
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const headerMount = document.querySelector('[data-site-header]');
  const footerMount = document.querySelector('[data-site-footer]');

  if (headerMount) {
    const isDestinationPage = nested || currentFile === 'destinasi.html';
    const isNewsPage = /^berita(?:[1-5])?\.html$/.test(currentFile);
    const pageLinks = pages.map(([label, file]) => {
      const current = currentFile === file || (file === 'berita.html' && isNewsPage) ? ' aria-current="page"' : '';
      return `<li><a href="${base}${file}"${current}>${label}</a></li>`;
    }).join('');
    headerMount.innerHTML = `
      <header class="site-header">
        <nav class="nav-inner" aria-label="Navigasi utama">
          <a class="brand" href="${base}index.html" aria-label="Jelajah Jogja, beranda"><span class="brand-mark"><img src="${base}assets/icons/1.png" alt=""></span><span>jelajah<span style="color:#e3a47c">.</span>jogja</span></a>
          <button class="hamburger" type="button" aria-label="Buka menu" aria-expanded="false" aria-controls="primary-navigation"><span></span><span></span></button>
          <ul class="nav-links" id="primary-navigation">
            ${pageLinks}
            <li><a href="${base}destinasi.html"${isDestinationPage ? ' aria-current="page"' : ''}>Destinasi</a></li>
            <li><a href="${base}sejarah-sultan.html"${currentFile === 'sejarah-sultan.html' ? ' aria-current="page"' : ''}>Sejarah Sultan</a></li>
          </ul>
        </nav>
      </header>`;

    const header = headerMount.querySelector('.site-header');
    const menuButton = headerMount.querySelector('.hamburger');
    const navLinks = headerMount.querySelector('.nav-links');
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Buka menu' : 'Tutup menu');
      navLinks.classList.toggle('is-open', !expanded);
      document.body.classList.toggle('menu-open', !expanded);
    });

    navLinks.addEventListener('click', (event) => {
      if (event.target.closest('a') && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Buka menu');
        document.body.classList.remove('menu-open');
      }
    });

    const updateScrollState = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState, { passive: true });
    updateScrollState();
  }

  if (footerMount) {
    footerMount.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-main">
          <div class="footer-about">
            <a class="brand footer-brand" href="${base}index.html"><span class="brand-mark"><img src="${base}assets/icons/1.png" alt=""></span><span>jelajah<span style="color:#e3a47c">.</span>jogja</span></a>
            <p>Panduan kecil untuk menemukan cerita besar di Yogyakarta. Dibuat untuk perjalanan yang lebih dekat dan bermakna.</p>
          </div>
          <div><p class="footer-heading">JELAJAHI</p><div class="footer-links">
            ${pages.map(([label, file]) => `<a href="${base}${file}">${label}</a>`).join('')}
            <a href="${base}destinasi.html">Destinasi</a>
            <a href="${base}sejarah-sultan.html">Sejarah Sultan</a>
          </div></div>
          <div><p class="footer-heading">SEBUAH CATATAN</p><p class="footer-about"><span>Hormati budaya setempat, jaga kebersihan, dan periksa informasi resmi sebelum berkunjung.</span></p></div>
        </div>
        <div class="container footer-bottom"><p>© <span data-current-year></span> Jelajah Jogja. Dengan hangat dari Yogyakarta.</p><div class="footer-small-links"><a href="${base}berita.html">Berita Jogja</a><a href="${base}destinasi.html">Destinasi</a></div></div>
      </footer>`;
  }
})();
