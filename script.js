const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = systemPrefersDark ? 'light' : 'dark';
  root.setAttribute('data-theme', currentTheme);
  themeToggle.setAttribute('aria-pressed', String(currentTheme === 'light'));

  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', currentTheme);
    themeToggle.setAttribute('aria-pressed', String(currentTheme === 'light'));
    // localStorage.setItem('portfolio-theme', currentTheme); // uncomment when self-hosting
  });

  // Mobile menu toggle
  const burger = document.getElementById('burger');
  const navlinks = document.getElementById('navlinks');
  burger.addEventListener('click', () => {
    const isOpen = navlinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });
  navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navlinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  // Scroll-spy active nav link
  const navA = document.querySelectorAll('[data-nav]');
  const targets = Array.from(navA).map(a => document.querySelector(a.getAttribute('href')));
  const spy = () => {
    let idx = 0;
    const y = window.scrollY + 140;
    targets.forEach((t, i) => { if (t && t.offsetTop <= y) idx = i; });
    navA.forEach((a, i) => a.classList.toggle('active', i === idx));
  };
  window.addEventListener('scroll', spy, { passive: true });
  spy();

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));