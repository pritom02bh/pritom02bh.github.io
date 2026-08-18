(() => {
  "use strict";

  /* ------------------------------------------------------------------
     Mobile nav toggle
  ------------------------------------------------------------------ */
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ------------------------------------------------------------------
     Scroll-spy — highlight active nav link
  ------------------------------------------------------------------ */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => spyObserver.observe(section));

  /* ------------------------------------------------------------------
     Back to top button
  ------------------------------------------------------------------ */
  const toTop = document.getElementById("to-top");
  window.addEventListener(
    "scroll",
    () => {
      toTop.classList.toggle("is-visible", window.scrollY > 640);
    },
    { passive: true }
  );
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ------------------------------------------------------------------
     Logo — scroll to top without leaving a "#hero" hash in the URL
  ------------------------------------------------------------------ */
  const logoHome = document.getElementById("logo-home");
  logoHome.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, "", "/");
  });

  /* ------------------------------------------------------------------
     Toast helper
  ------------------------------------------------------------------ */
  const toast = document.getElementById("toast");
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  /* ------------------------------------------------------------------
     Copy email
  ------------------------------------------------------------------ */
  const copyBtn = document.getElementById("copy-email");
  copyBtn.addEventListener("click", async () => {
    const email = "bhowmik01dev@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied to clipboard");
    } catch {
      showToast("Copy failed — email is " + email);
    }
  });

  /* ------------------------------------------------------------------
     Footer year
  ------------------------------------------------------------------ */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     Shared modal (project case studies + research notes)
  ------------------------------------------------------------------ */
  const modal = document.getElementById("detail-modal");
  const modalBody = document.getElementById("modal-body");
  const modalPanel = document.getElementById("modal-panel");
  let lastFocused = null;

  function metricsHTML(metrics) {
    if (!metrics || !metrics.length) return "";
    const line = metrics.map((m) => `${m.value} ${m.label}`).join("  ·  ");
    return `<p class="modal-stats mono">${line}</p>`;
  }

  function blockHTML(title, content) {
    if (!content) return "";
    return `<div class="modal-block"><h3>${title}</h3>${content}</div>`;
  }

  function openModal(bodyHTML) {
    modalBody.innerHTML = bodyHTML;
    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    modalPanel.focus();
    document.addEventListener("keydown", onModalKeydown);
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    document.removeEventListener("keydown", onModalKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onModalKeydown(e) {
    if (e.key === "Escape") closeModal();
  }

  modal.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });
  modalPanel.setAttribute("tabindex", "-1");

  /* ------------------------------------------------------------------
     Research papers — rendered from PAPERS in data.js. Each card links
     straight out to the paper (no modal) since there's no abstract to
     show on-page — just bibliographic details.
  ------------------------------------------------------------------ */
  const papersList = document.getElementById("papers-list");

  function renderPapers() {
    if (!PAPERS.length) {
      papersList.innerHTML = `<div class="entry-empty">No papers listed yet — add one in <code>js/data.js</code>.</div>`;
      return;
    }
    papersList.innerHTML = PAPERS.map((p) => {
      const tag = `<span class="tag">${p.type}</span>`;
      const date = `<span class="entry-date mono">${p.date}</span>`;
      const venue = p.venue ? `<p class="entry-venue">${p.venue}</p>` : "";
      const doi = p.doi ? `<p class="entry-doi mono">DOI: ${p.doi}</p>` : "";
      const link = p.link ? `<span class="entry-link">Read full paper ↗</span>` : "";
      const inner = `
        <div class="entry-top">${tag}${date}</div>
        <h3 class="entry-title">${p.title}</h3>
        ${venue}
        ${doi}
        ${link}`;

      return p.link
        ? `<a class="entry-card" href="${p.link}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="entry-card entry-card--static">${inner}</div>`;
    }).join("");
  }

  renderPapers();

  /* ------------------------------------------------------------------
     Projects — rendered from PROJECTS in data.js
  ------------------------------------------------------------------ */
  const projectList = document.getElementById("project-list");

  function renderProjects() {
    projectList.innerHTML = PROJECTS
      .map((p) => {
        const href = p.links.code || p.links.caseStudy;
        return `
        <a class="entry-card" href="${href}" target="_blank" rel="noopener">
          <div class="entry-top">
            <span class="tag">${p.category}</span>
            ${p.metrics && p.metrics[0] ? `<span class="entry-date mono">${p.metrics[0].value} ${p.metrics[0].label}</span>` : ""}
          </div>
          <h3 class="entry-title">${p.title}</h3>
          <p class="entry-excerpt">${p.summary}</p>
          <span class="entry-link">View case study →</span>
        </a>`;
      })
      .join("");
  }

  renderProjects();

  /* ------------------------------------------------------------------
     Scroll reveal — subtle fade/rise-in for section content, cards,
     and the avatar. Purely decorative: adds the .reveal class via JS
     (so nothing is hidden if this runs before render, or if JS fails),
     then fades each element in once when it enters the viewport.
  ------------------------------------------------------------------ */
  const revealTargets = document.querySelectorAll(
    ".section-head, .entry-card, .exp-card, .edu-card, .contact-panel, .avatar-ring"
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i % 3, 2) * 60}ms`;
    revealObserver.observe(el);
  });
})();
