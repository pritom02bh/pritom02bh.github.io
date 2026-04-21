document.addEventListener('DOMContentLoaded', init);

function init() {
  initDarkMode();
  initTypingAnimation();
  initNavigation();
  initMobileMenu();
  initProjectFilters();
  initProjectCarousels();
  initBackToTop();
  initScrollReveal();
  initStatCounters();
  initParallaxBlobs();
}

function initDarkMode() {
  const toggle = document.querySelector('.dark-mode-toggle');
  if (localStorage.getItem('theme') === 'dark') setTheme('dark');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }
}

function setTheme(mode) {
  if (mode === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateToggleIcon('fa-sun');
  } else {
    document.documentElement.removeAttribute('data-theme');
    updateToggleIcon('fa-moon');
  }
  localStorage.setItem('theme', mode);
}

function updateToggleIcon(cls) {
  const icon = document.querySelector('.dark-mode-toggle i');
  if (icon) icon.className = 'fas ' + cls;
}

function initTypingAnimation() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const roles = [
    'Data Science',
    'Machine Learning',
    'NLP & RAG Systems',
    'Data Analytics',
    'AI Research',
    'Product Management'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = roles[roleIdx];

    if (deleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = deleting ? 35 : 70;

    if (!deleting && charIdx === current.length) {
      delay = 2400;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 500;
    }

    setTimeout(tick, delay);
  }

  tick();
}

function initNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    if (!navbar) return;

    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', throttle(onScroll, 50));
  onScroll();
}

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card, i) => {
        const cats = card.getAttribute('data-category') || '';
        const show = filter === 'all' || cats.includes(filter);
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = `cardReveal 0.55s cubic-bezier(0.4,0,0,1) ${i * 0.06}s both`;
        }
      });
    });
  });
}

function initProjectCarousels() {
  const intervals = {};

  document.querySelectorAll('.project-card').forEach((card, idx) => {
    const images = card.querySelectorAll('.carousel-image');
    const dots = card.querySelectorAll('.indicator');
    if (images.length <= 1) return;

    let current = 0;

    function show(i) {
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      images[i].classList.add('active');
      dots[i].classList.add('active');
      current = i;
    }

    function next() { show((current + 1) % images.length); }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        show(i);
        restart();
      });
    });

    function restart() {
      clearInterval(intervals[idx]);
      intervals[idx] = setInterval(next, 4500);
    }

    intervals[idx] = setInterval(next, 4500);

    const carousel = card.querySelector('.project-image-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(intervals[idx]));
    carousel.addEventListener('mouseleave', restart);

    let startX = 0;
    carousel.addEventListener('touchstart', e => {
      startX = e.changedTouches[0].screenX;
      clearInterval(intervals[idx]);
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].screenX - startX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) next();
        else show((current - 1 + images.length) % images.length);
      }
      restart();
    }, { passive: true });
  });
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', throttle(() => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, 80));

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.timeline-item, .project-card, .skill-category, .education-card, ' +
    '.contact-card, .stat-item, .section-header'
  );

  elements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i % 6, 4) * 0.08}s`;
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

function initStatCounters() {
  const statNums = document.querySelectorAll('.stat-number');
  if (!statNums.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2200;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = Math.round(eased * target);
    el.textContent = value + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initParallaxBlobs() {
  const blobs = document.querySelectorAll('.mesh-blob');
  if (!blobs.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        blobs.forEach((blob, i) => {
          const speed = 0.02 + (i * 0.01);
          blob.style.transform += '';
          blob.style.translate = `0 ${scrollY * speed}px`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

function throttle(fn, ms) {
  let locked = false;
  return function (...args) {
    if (locked) return;
    locked = true;
    fn.apply(this, args);
    setTimeout(() => { locked = false; }, ms);
  };
}

const style = document.createElement('style');
style.textContent = `
  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(20px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
`;
document.head.appendChild(style);
