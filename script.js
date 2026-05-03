// ===================================================
// DONNY SETIAWAN — Portfolio Interactive Script
// ===================================================

// Always start at top on page load / refresh
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

  // === 1. NAVBAR: Scrolled State ===
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // === 2. HAMBURGER MENU ===
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // === 3. SMOOTH SCROLL for all anchor links ===
  // Uses scrollIntoView which respects CSS scroll-snap + smooth behavior
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // === 4. REVEAL ON SCROLL ===
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => { if (sib === entry.target) delay = idx * 80; });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObserver.observe(el));

  // === 5. SKILL BARS ANIMATION ===
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute('data-width') + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  // === 6. COUNTER ANIMATION ===
  function animateCounter(el, target, suffix = '') {
    let current = 0;
    const step = target / (1500 / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(num => {
          const val = parseInt(num.textContent.replace(/\D/g, ''));
          const suffix = num.textContent.includes('+') ? '+' : '';
          animateCounter(num, val, suffix);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) statsObserver.observe(statsSection);

  // === 7. HERO REVEAL on load ===
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 300 + i * 150);
    });
  });

  // === 8. CONTACT FORM ===
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('form-submit');
      btn.textContent = 'Mengirim...';
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.textContent = 'Kirim Pesan / Send Message';
        btn.disabled = false;
        successMsg.style.display = 'block';
        setTimeout(() => successMsg.style.display = 'none', 4000);
      }, 1500);
    });
  }

  // === 9. PORTFOLIO CARD hover ===
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
  });

  // === 10. ACTIVE NAV LINK on scroll ===
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active && !active.classList.contains('nav-cta')) {
          active.style.color = 'var(--gold)';
        }
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(sec => activeObserver.observe(sec));

});
