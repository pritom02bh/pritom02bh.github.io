// ===== Modern portfolio interactions =====
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---- Theme toggle (persists) ---- */
  const themeBtn = $('#themeToggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('pb-theme');
  if (saved) root.setAttribute('data-theme', saved);
  const setIcon = () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (themeBtn) themeBtn.innerHTML = `<i class="fas fa-${isLight ? 'sun' : 'moon'}"></i>`;
  };
  setIcon();
  themeBtn?.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) { root.removeAttribute('data-theme'); localStorage.setItem('pb-theme', 'dark'); }
    else { root.setAttribute('data-theme', 'light'); localStorage.setItem('pb-theme', 'light'); }
    setIcon();
  });

  /* ---- Tabs (workspace) shared with topnav ---- */
  const tabs = $$('.tab');
  const navTabs = $$('.topnav-link');
  const panels = $$('.panel');
  function activate(name) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    navTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === name));
  }
  tabs.forEach(t => t.addEventListener('click', () => {
    activate(t.dataset.tab);
    document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  navTabs.forEach(t => t.addEventListener('click', () => {
    activate(t.dataset.tab);
    document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  /* ---- Project filters ---- */
  const filters = $$('.filter');
  const projects = $$('.proj');
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(x => x.classList.remove('active'));
    f.classList.add('active');
    const k = f.dataset.filter;
    projects.forEach(p => {
      const cats = (p.dataset.cat || '').split(' ');
      p.classList.toggle('hide', k !== 'all' && !cats.includes(k));
    });
  }));

  /* ---- Animated counters ---- */
  const counters = $$('[data-count]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseInt(el.dataset.count, 10);
      const dur = 1100;
      const start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => io.observe(c));

  /* ---- Broken-image cleanup for project thumbnails ---- */
  $$('.proj-thumb img').forEach(img => {
    img.addEventListener('error', () => {
      img.parentElement.classList.add('thumb-fallback');
      img.remove();
    });
  });
})();
