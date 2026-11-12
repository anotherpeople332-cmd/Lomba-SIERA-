(() => {
  const timeline = document.querySelector('[data-sultan-timeline]');
  const indexNav = document.querySelector('[data-sultan-index-nav]');
  if (!timeline || !indexNav) return;
  const sultans = [
    {
      name: 'Sri Sultan Hamengkubuwono I',
      image: 'assets/images/Sultan%201.jpg',
      birth: '1717',
      reign: '1755–1792',
      accession: '1755',
      summary: 'Pangeran Mangkubumi mendirikan Kesultanan Yogyakarta setelah Perjanjian Giyanti dan membangun pusat pemerintahan baru.',
      event: 'Perjanjian Giyanti pada 1755 mengakhiri konflik suksesi Mataram dan menjadi titik awal Kesultanan Yogyakarta.',
      legacy: 'Membangun Keraton Yogyakarta sebagai pusat pemerintahan, kebudayaan, dan kehidupan masyarakat.',
    },
    {
      name: 'Sri Sultan Hamengkubuwono II',
      image: 'assets/images/sultan%202.jpg',
      birth: '1750',
      reign: '1792–1810 · 1811–1812 · 1826–1828',
      accession: '1792',
      summary: 'Masa pemerintahannya berlangsung dalam beberapa periode yang diwarnai persaingan politik dan campur tangan kekuatan kolonial.',
      event: 'Geger Sepehi pada 1812 berujung pada pendudukan Keraton oleh pasukan Inggris dan pengasingannya.',
      legacy: 'Kembalinya ia ke takhta dalam periode berikutnya menandai perjuangan mempertahankan otoritas Kesultanan.',
    },
    {
      name: 'Sri Sultan Hamengkubuwono III',
      image: 'assets/images/sultan%203.jpg',
      birth: '1769',
      reign: '1812–1814',
      accession: '1812',
      summary: 'Naik takhta pada masa pendudukan Inggris di Jawa, setelah perubahan besar di lingkungan Keraton.',
      event: 'Diangkat menjadi Sultan pada 1812 setelah Hamengkubuwono II diturunkan oleh pemerintah Inggris.',
      legacy: 'Menjadi penghubung suksesi Keraton pada masa pemerintahan Inggris; Pangeran Diponegoro adalah salah satu putranya.',
    },
    {
      name: 'Sri Sultan Hamengkubuwono IV',
      image: 'assets/images/sultan%204.jpg',
      birth: '1804',
      reign: '1814–1822',
      accession: '1814',
      summary: 'Masih berusia muda ketika naik takhta, sehingga pemerintahan dijalankan dalam situasi politik istana yang kompleks.',
      event: 'Wafat pada 1822 saat masih muda, beberapa tahun sebelum pecahnya Perang Jawa.',
      legacy: 'Masa pemerintahannya menjaga kesinambungan takhta di tengah perubahan politik pada awal abad ke-19.',
    },
    {
      name: 'Sri Sultan Hamengkubuwono V',
      image: 'assets/images/sultan%205.jpg',
      birth: '1820',
      reign: '1822–1826 · 1828–1855',
      accession: '1822',
      summary: 'Memerintah dalam dua periode, termasuk saat Perang Jawa (1825–1830) mengguncang wilayah Yogyakarta dan sekitarnya.',
      event: 'Perang Jawa berlangsung pada 1825–1830; pemerintahannya terputus dan kemudian dipulihkan pada 1828.',
      legacy: 'Memimpin Kesultanan melewati perang dan masa pemulihan yang mengubah tatanan politik Jawa.',
    },
    {
      name: 'Sri Sultan Hamengkubuwono VI',
      image: 'assets/images/sultan%206.jpg',
      birth: '1821',
      reign: '1855–1877',
      accession: '1855',
      summary: 'Memimpin Kesultanan pada paruh kedua abad ke-19, ketika hubungan pemerintahan lokal dan kolonial terus berkembang.',
      event: 'Gempa besar Yogyakarta pada 1867 terjadi pada masa pemerintahannya dan merusak sejumlah bangunan di kota.',
      legacy: 'Melanjutkan lembaga Keraton serta tradisi pemerintahan Kesultanan pada masa kolonial.',
    },
    {
      name: 'Sri Sultan Hamengkubuwono VII',
      image: 'assets/images/sultan%207.jpg',
      birth: '1839',
      reign: '1877–1921',
      accession: '1877',
      summary: 'Memerintah pada masa tumbuhnya industri gula dan perubahan ekonomi yang mengubah lanskap Yogyakarta.',
      event: 'Perkembangan perkebunan dan pabrik gula menjadi bagian menonjol dari perubahan ekonomi pada akhir abad ke-19.',
      legacy: 'Memimpin Yogyakarta melewati perubahan ekonomi dan infrastruktur pada masa modernisasi kolonial.',
    },
    {
      name: 'Sri Sultan Hamengkubuwono VIII',
      image: 'assets/images/sultan%208.jpg',
      birth: '1880',
      reign: '1921–1939',
      accession: '1921',
      summary: 'Memimpin pada masa pergerakan kebangsaan dan perubahan sosial yang semakin kuat di Hindia Belanda.',
      event: 'Masa pemerintahannya berlangsung bersamaan dengan menguatnya organisasi dan gerakan kebangsaan di Hindia Belanda.',
      legacy: 'Menjaga keberlanjutan tradisi Keraton saat pendidikan dan kehidupan sosial masyarakat berkembang.',
    },
    {
      name: 'Sri Sultan Hamengkubuwono IX',
      image: 'assets/images/sultan%209.jpg',
      birth: '1912',
      reign: '1939–1988',
      accession: '1939',
      summary: 'Menyatakan dukungan Kesultanan kepada Republik Indonesia setelah kemerdekaan dan menjadi pemimpin penting pada masa revolusi.',
      event: 'Yogyakarta mendukung Republik pada 1945; Sri Sultan kemudian menjadi Wakil Presiden RI pada 1973–1978.',
      legacy: 'Berperan dalam perjuangan dan pemerintahan Republik, serta memimpin DIY sebagai Gubernur.',
    },
    {
      name: 'Sri Sultan Hamengkubuwono X',
      image: 'assets/images/sultan%2010.jpg',
      birth: '1946',
      reign: '1989–sekarang',
      accession: '1989',
      summary: 'Meneruskan kepemimpinan Kesultanan di era reformasi dan kehidupan pemerintahan daerah modern.',
      event: 'Memimpin DIY sebagai Gubernur sejak 1998; Undang-Undang Keistimewaan DIY disahkan pada 2012.',
      legacy: 'Meneruskan peran Kesultanan dalam kehidupan budaya dan tata pemerintahan istimewa Yogyakarta.',
    },
  ];

  const formatNumber = (index) => String(index + 1).padStart(2, '0');
  const ordinals = ['PERTAMA', 'KEDUA', 'KETIGA', 'KEEMPAT', 'KELIMA', 'KEENAM', 'KETUJUH', 'KEDELAPAN', 'KESEMBILAN', 'KESEPULUH'];

  timeline.innerHTML = sultans.map((sultan, index) => `
    <article class="sultan-card sultan-card-${index + 1}" data-sultan-index="${index}" data-generation="${formatNumber(index)}" aria-labelledby="sultan-card-title-${index}">
      <div class="sultan-card-portrait">
        <img src="${sultan.image}" alt="Potret ${sultan.name}" loading="lazy" decoding="async">
      </div>
      <div class="sultan-card-copy">
        <span class="sultan-card-kicker">${formatNumber(index)} / SULTAN ${ordinals[index]}</span>
        <h3 id="sultan-card-title-${index}">${sultan.name}</h3>
        <p class="sultan-card-title">Gelar Kesultanan Yogyakarta</p>
        <div class="sultan-card-dates">
          <span>Lahir <strong>${sultan.birth}</strong></span>
          <span>Naik takhta <strong>${sultan.accession}</strong></span>
          <span>Masa pemerintahan <strong>${sultan.reign}</strong></span>
        </div>
        <p class="sultan-card-summary">${sultan.summary}</p>
        <p class="sultan-card-event"><strong>PERISTIWA PENTING</strong>${sultan.event}</p>
        <p class="sultan-card-legacy"><strong>KONTRIBUSI & WARISAN</strong>${sultan.legacy}</p>
      </div>
    </article>
  `).join('');

  indexNav.innerHTML = sultans.map((_, index) =>
    `<button type="button" data-sultan-jump="${index}" aria-label="Ke Sultan ${formatNumber(index)}">${formatNumber(index)}</button>`,
  ).join('');

  const buttons = [...indexNav.querySelectorAll('[data-sultan-jump]')];
  const cards = [...timeline.querySelectorAll('[data-sultan-index]')];
  const position = document.querySelector('[data-sultan-progress-label]');
  const previous = document.querySelector('[data-sultan-nav-prev]');
  const next = document.querySelector('[data-sultan-nav-next]');
  let currentIndex = 0;

  const navigateTo = (index) => {
    currentIndex = Math.max(0, Math.min(cards.length - 1, index));
    buttons.forEach((button, buttonIndex) => {
      if (buttonIndex === currentIndex) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    if (position) position.textContent = `${formatNumber(currentIndex)} / ${formatNumber(cards.length)}`;
    if (previous) previous.disabled = currentIndex === 0;
    if (next) next.disabled = currentIndex === cards.length - 1;
    cards[currentIndex].scrollIntoView({ behavior: 'auto', block: 'center' });
  };

  indexNav.addEventListener('click', (event) => {
    const button = event.target.closest('[data-sultan-jump]');
    if (button) navigateTo(Number(button.dataset.sultanJump));
  });
  if (previous) previous.addEventListener('click', () => navigateTo(currentIndex - 1));
  if (next) next.addEventListener('click', () => navigateTo(currentIndex + 1));
  buttons[0].setAttribute('aria-current', 'step');
  if (previous) previous.disabled = true;
})();