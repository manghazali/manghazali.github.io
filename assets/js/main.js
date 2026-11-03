// Portfolio interactions: theme, mobile menu, projects grid, screenshot viewer.
(() => {
  const root = document.documentElement;
  const img = (n) => `assets/img/portfolio-${String(n).padStart(2, '0')}.jpg`;
  const thumb = (n) => `assets/img/thumbs/portfolio-${String(n).padStart(2, '0')}.jpg`;

  const PROJECTS = [
    { name: 'BayarNow', desc: 'Payment gateway integration for government agencies (MDA) using FPX services.', cat: 'finance', tag: 'Payments · Century Software', shots: [25] },
    { name: 'iPayment', desc: 'Government payment system for the Ministry of Finance (MOF).', cat: 'finance', tag: 'Payments · Century Software', shots: [23, 24] },
    { name: 'SSPNi-Plus (SPU & SPO)', desc: 'Education savings plan systems: e-Mandate, salary deduction, withdrawals, statements, FPX and card payments.', cat: 'finance', tag: 'Finance · PTPTN', shots: [7, 8, 11, 12, 13, 14, 15, 16, 17, 18] },
    { name: 'Source Fund System (DANA)', desc: 'PTPTN source fund management system.', cat: 'finance', tag: 'Finance · PTPTN', shots: [9, 10] },
    { name: 'eMAS', desc: 'e-Learning materials system for managing and delivering course content.', cat: 'education', tag: 'Education · OUM', shots: [1, 2] },
    { name: 'Alumni Management System', desc: 'Alumni registration, profiles and engagement portal.', cat: 'education', tag: 'Education · OUM', shots: [3, 4] },
    { name: 'Scholarship Management System', desc: 'Scholarship application and processing system.', cat: 'education', tag: 'Education · OUM', shots: [5, 6] },
    { name: 'centrOUM', desc: 'Central university portal; maintained and enhanced its modules and APIs.', cat: 'education', tag: 'Education · OUM', shots: [21, 22] },
    { name: 'HIS@KKM', desc: 'Hospital Information System for the Ministry of Health; assisted development and built iReport reports.', cat: 'health', tag: 'Healthcare · HeiTech', shots: [19, 20] },
  ];

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  const isDark = () => root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  themeBtn.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Dynamic numbers
  document.getElementById('year').textContent = new Date().getFullYear();
  document.querySelectorAll('[data-years-since]').forEach((el) => {
    el.textContent = `${new Date().getFullYear() - Number(el.dataset.yearsSince)}+`;
  });

  // Projects grid
  const grid = document.getElementById('projects');
  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="project" data-cat="${p.cat}">
      <button type="button" class="project__btn" data-index="${i}" aria-label="View ${p.name} screenshots">
        <div class="project__img">
          <img src="${thumb(p.shots[0])}" alt="" loading="lazy" width="720" height="405">
        </div>
        <div class="project__body">
          <span class="project__tag">${p.tag}</span>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <span class="project__more">View ${p.shots.length} ${p.shots.length === 1 ? 'screenshot' : 'screenshots'} →</span>
        </div>
      </button>
    </article>`).join('');

  // Filters
  document.querySelectorAll('.filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach((b) => b.classList.toggle('is-active', b === btn));
      const f = btn.dataset.filter;
      grid.querySelectorAll('.project').forEach((card) => {
        card.hidden = f !== 'all' && card.dataset.cat !== f;
      });
    });
  });

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbTitle = document.getElementById('lb-title');
  const lbCount = document.getElementById('lb-count');
  let cur = { p: 0, s: 0 };

  const show = () => {
    const p = PROJECTS[cur.p];
    lbImg.src = img(p.shots[cur.s]);
    lbImg.alt = `${p.name} screenshot ${cur.s + 1}`;
    lbTitle.textContent = p.name;
    lbCount.textContent = `${cur.s + 1} / ${p.shots.length}`;
    lb.classList.toggle('is-single', p.shots.length === 1);
  };
  const step = (d) => {
    const n = PROJECTS[cur.p].shots.length;
    cur.s = (cur.s + d + n) % n;
    show();
  };

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.project__btn');
    if (!btn) return;
    cur = { p: Number(btn.dataset.index), s: 0 };
    show();
    lb.showModal();
  });
  document.getElementById('lb-close').addEventListener('click', () => lb.close());
  document.getElementById('lb-prev').addEventListener('click', () => step(-1));
  document.getElementById('lb-next').addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  // Highlight the sidebar link for the section in view
  const navLinks = [...document.querySelectorAll('.toc a')];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('is-active', a.hash === `#${en.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
})();
