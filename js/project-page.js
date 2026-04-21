document.addEventListener('DOMContentLoaded', function () {
  initImageGallery();
  initScrollReveal();
});

function initImageGallery() {
  const items = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('modalImage');
  const title = document.getElementById('modalTitle');
  const desc = document.getElementById('modalDescription');
  const close = document.querySelector('.modal .close');
  if (!modal || !img) return;

  let currentIdx = 0;

  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      currentIdx = i;
      showImage(item);
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  function showImage(item) {
    img.src = item.getAttribute('data-image');
    if (title) title.textContent = item.getAttribute('data-title') || '';
    if (desc) desc.textContent = item.getAttribute('data-desc') || '';
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (close) close.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  document.addEventListener('keydown', e => {
    if (modal.style.display !== 'block') return;
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowRight' && currentIdx < items.length - 1) { currentIdx++; showImage(items[currentIdx]); }
    if (e.key === 'ArrowLeft' && currentIdx > 0) { currentIdx--; showImage(items[currentIdx]); }
  });
}

function initScrollReveal() {
  const els = document.querySelectorAll(
    '.gallery-item, .tech-item, .project-stats .stat-item, ' +
    '.project-timeline .timeline-item, .related-item, .details-main h2, .details-main h3'
  );

  els.forEach(el => { el.classList.add('reveal'); });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => observer.observe(el));
}
