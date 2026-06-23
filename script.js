document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile menu ---- */
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.overlay');

  function closeMenu() {
    hamburger?.classList.remove('open');
    nav?.classList.remove('open');
    overlay?.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open');
    overlay?.classList.toggle('show');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---- Header scroll ---- */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---- Scroll reveal ---- */
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));

  /* ---- Service filter tabs ---- */
  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.srv-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      cards.forEach(c => {
        const show = cat === 'all' || c.dataset.cat === cat;
        c.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---- FAQ Accordion ---- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active')); // close all
      if (!isActive) item.classList.add('active'); // toggle current
    });
  });

  /* ---- Smooth scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
      }
    });
  });
});
