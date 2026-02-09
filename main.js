// ============================================
// MAIRIE DE SAINT-MARTIN-DE-L'HÃRAULT
// Site web institutionnel - Scripts
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // === Navigation mobile ===
  const navToggle = document.querySelector('.nav-toggle');
  const navMain = document.querySelector('.nav-main');
  
  if (navToggle && navMain) {
    navToggle.addEventListener('click', function() {
      navMain.classList.toggle('open');
      const expanded = navMain.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
      navToggle.innerHTML = expanded ? '&#10005;' : '&#9776;';
    });

    // Fermer le menu au clic sur un lien
    navMain.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMain.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '&#9776;';
      });
    });
  }

  // === Navigation active ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-main a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // === Animations au scroll ===
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .stat-item, .service-item, .elu-card, .agenda-item, .content-block').forEach(function(el) {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // === Formulaire de contact ===
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validation simple
      const nom = document.getElementById('nom');
      const email = document.getElementById('email');
      const objet = document.getElementById('objet');
      const message = document.getElementById('message');
      let isValid = true;

      [nom, email, objet, message].forEach(function(field) {
        if (field && !field.value.trim()) {
          field.style.borderColor = '#DC3545';
          isValid = false;
        } else if (field) {
          field.style.borderColor = '#DEE2E6';
        }
      });

      if (email && email.value && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        email.style.borderColor = '#DC3545';
        isValid = false;
      }

      if (isValid) {
        // Simulation d'envoi
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Envoi en cours...';
        submitBtn.disabled = true;

        setTimeout(function() {
          contactForm.innerHTML = '<div style="text-align:center;padding:40px 0;"><div style="font-size:3rem;margin-bottom:16px;color:#198754;">&#10003;</div><h3 style="color:#198754;margin-bottom:8px;">Message envoy\u00e9 avec succ\u00e8s</h3><p style="color:#6C757D;">Votre demande a bien \u00e9t\u00e9 prise en compte. Nous vous r\u00e9pondrons dans les meilleurs d\u00e9lais.</p></div>';
        }, 1500);
      }
    });

    // Reset des bordures au focus
    contactForm.querySelectorAll('.form-control').forEach(function(field) {
      field.addEventListener('focus', function() {
        this.style.borderColor = '#3B82F6';
      });
    });
  }

  // === Smooth scroll pour les ancres ===
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollTo({ behavior: 'smooth' });
        target.focus();
      }
    });
  });

  // === Retour en haut ===
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '&#8679;';
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Retour en haut de page');
  backToTop.style.cssText = 'position:fixed;bottom:24px;right:24px;width:48px;height:48px;border-radius:50%;background:var(--bleu-primary);color:white;border:none;font-size:1.4rem;cursor:pointer;opacity:0;transition:opacity 0.3s,transform 0.3s;transform:translateY(20px);z-index:999;box-shadow:0 4px 12px rgba(0,0,0,0.2);';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      backToTop.style.opacity = '1';
      backToTop.style.transform = 'translateY(0)';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.transform = 'translateY(20px)';
    }
  });

});
