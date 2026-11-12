(() => {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.querySelector('.lightbox');
  const filters = Array.from(document.querySelectorAll('.gallery-filter'));
  if (!items.length || !lightbox) return;

  const image = lightbox.querySelector('figure img');
  const caption = lightbox.querySelector('figcaption');
  let activeIndex = 0;
  let previousFocus = null;

  const showImage = (index) => {
    const visibleItems = items.filter((item) => !item.hidden);
    if (!visibleItems.length) return;
    activeIndex = (index + visibleItems.length) % visibleItems.length;
    const item = visibleItems[activeIndex];
    const nextImage = new Image();
    caption.textContent = item.dataset.caption || '';
    image.alt = item.querySelector('img').alt;
    nextImage.onload = () => {
      image.src = nextImage.src;
    };
    nextImage.onerror = () => {
      image.src = item.dataset.full;
    };
    nextImage.src = item.dataset.full;
  };

  const close = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    if (previousFocus) previousFocus.focus();
  };

  items.forEach((item) => {
    item.addEventListener('click', () => {
      previousFocus = item;
      const visibleIndex = items.filter((visibleItem) => !visibleItem.hidden).indexOf(item);
      showImage(visibleIndex);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      lightbox.querySelector('.lightbox-close').focus();
    });
  });

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.filter;
      filters.forEach((button) => {
        const selected = button === filter;
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      items.forEach((item) => {
        item.hidden = category !== 'all' && item.dataset.category !== category;
      });
    });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', close);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showImage(activeIndex - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => showImage(activeIndex + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') showImage(activeIndex - 1);
    if (event.key === 'ArrowRight') showImage(activeIndex + 1);
  });
})();
