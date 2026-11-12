(() => {
  const search = document.querySelector('#destination-search');
  const cards = [...document.querySelectorAll('.directory-card')];
  const filters = [...document.querySelectorAll('.directory-filter')];
  const count = document.querySelector('#directory-count');
  const empty = document.querySelector('#directory-empty');
  if (!search || !cards.length || !filters.length || !count || !empty) return;

  let activeCategory = 'semua';

  const normalize = (value) => value
    .toLocaleLowerCase('id')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  const updateResults = () => {
    const query = normalize(search.value);
    let visible = 0;
    cards.forEach((card) => {
      const matchesCategory = activeCategory === 'semua' || card.dataset.category === activeCategory;
      const matchesQuery = !query || normalize(`${card.dataset.search} ${card.textContent}`).includes(query);
      card.hidden = !(matchesCategory && matchesQuery);
      if (!card.hidden) visible += 1;
    });
    count.textContent = `Menampilkan ${visible} dari ${cards.length} destinasi`;
    empty.hidden = visible > 0;
  };

  search.addEventListener('input', updateResults);
  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      activeCategory = filter.dataset.filter;
      filters.forEach((item) => {
        const selected = item === filter;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      updateResults();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey &&
      !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      event.preventDefault();
      search.focus();
    }
  });

  updateResults();
})();
