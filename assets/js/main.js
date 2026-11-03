// Portfolio interactions: theme, mobile menu, projects grid, screenshot viewer.
(() => {
  const root = document.documentElement;
  const img = (n) => `assets/img/portfolio-${String(n).padStart(2, '0')}.png`;

  const PROJECTS = [
    { name: 'HIS@KKM', desc: 'Health information system for the Ministry of Health Malaysia.', cat: 'health', tag: 'Healthcare', shots: [19, 20] },
    { name: 'Simpan SSPN Plus', desc: 'Education savings plan platform: registration, contributions and member services.', cat: 'finance', tag: 'Finance', shots: [7, 8, 11, 12, 13, 14, 15, 16, 17, 18] },
    { name: 'Sistem Pengurusan Dana', desc: 'Fund management system for tracking and administering funds.', cat: 'finance', tag: 'Finance', shots: [9, 10] },
    { name: 'iPayment', desc: 'Online payment module for fees and transactions.', cat: 'finance', tag: 'Payments', shots: [23, 24] },
    { name: 'BayarNow', desc: 'Quick-pay portal for settling outstanding payments online.', cat: 'finance', tag: 'Payments', shots: [25] },
    { name: 'e-Learning Materials System', desc: 'Manage and deliver course learning materials to students.', cat: 'education', tag: 'Education', shots: [1, 2] },
    { name: 'Alumni System', desc: 'Alumni registration, profiles and engagement portal.', cat: 'education', tag: 'Education', shots: [3, 4] },
    { name: 'Scholarship', desc: 'Scholarship application and processing system.', cat: 'education', tag: 'Education', shots: [5, 6] },
    { name: 'CentrOUM', desc: 'Central student services portal.', cat: 'education', tag: 'Education', shots: [21, 22] },
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

  // Mobile menu
  const menuBtn = document.getElementById('menu-toggle');
  const links = document.getElementById('nav-links');
  const setMenu = (open) => {
    links.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  menuBtn.addEventListener('click', () => setMenu(!links.classList.contains('is-open')));
  links.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

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
          <img src="${img(p.shots[0])}" alt="" loading="lazy">
          <span class="project__count">${p.shots.length} ${p.shots.length === 1 ? 'screenshot' : 'screenshots'}</span>
        </div>
        <div class="project__body">
          <span class="project__tag">${p.tag}</span>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
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

  // Highlight the nav link for the section in view
  const navLinks = [...links.querySelectorAll('a')];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('is-active', a.hash === `#${en.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
})();
