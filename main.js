document.addEventListener('DOMContentLoaded', function() {
  // Navigation mobile
  var navToggle = document.querySelector('.nav-toggle');
  var navMain = document.querySelector('.nav-main');
  if (navToggle && navMain) {
    navToggle.addEventListener('click', function() {
      navMain.classList.toggle('open');
      var expanded = navMain.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
      navToggle.innerHTML = expanded ? '\u2715' : '\u2630';
    });
    navMain.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMain.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '\u2630';
      });
    });
  }

  // Active nav
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-main a').forEach(function(link) {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  // Scroll animations
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

  document.querySelectorAll('.card, .stat-item, .service-item, .elu-card, .agenda-item, .content-block').forEach(function(el) {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Contact form
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var fields = contactForm.querySelectorAll('[required]');
      var valid = true;
      fields.forEach(function(f) {
        if (!f.value.trim() && f.type !== 'checkbox') {
          f.style.borderColor = '#DC2626';
          valid = false;
        } else if (f.type === 'checkbox' && !f.checked) {
          valid = false;
        } else if (f.type !== 'checkbox') {
          f.style.borderColor = '';
        }
      });
      var email = document.getElementById('email');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#DC2626';
        valid = false;
      }
      if (valid) {
        var btn = contactForm.querySelector('button[type="submit"]');
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;
        setTimeout(function() {
          contactForm.innerHTML = '<div style="text-align:center;padding:40px 0"><div style="font-size:3rem;margin-bottom:16px;color:#16A34A">\u2713</div><h3 style="color:#16A34A;margin-bottom:8px">Message envoy\u00e9 avec succ\u00e8s</h3><p style="color:#78716C">Nous vous r\u00e9pondrons dans les meilleurs d\u00e9lais.</p></div>';
        }, 1500);
      }
    });
    contactForm.querySelectorAll('.form-control').forEach(function(f) {
      f.addEventListener('focus', function() { this.style.borderColor = '#3478B2'; });
    });
  }

  // Back to top
  var btn = document.createElement('button');
  btn.innerHTML = '\u2191';
  btn.setAttribute('aria-label', 'Retour en haut');
  btn.style.cssText = 'position:fixed;bottom:24px;right:24px;width:44px;height:44px;border-radius:50%;background:#1B3A5C;color:#fff;border:none;font-size:1.2rem;cursor:pointer;opacity:0;transition:all .3s;z-index:999;box-shadow:0 4px 12px rgba(0,0,0,.15)';
  document.body.appendChild(btn);
  btn.addEventListener('click', function() { window.scrollTo({top:0,behavior:'smooth'}); });
  window.addEventListener('scroll', function() {
    btn.style.opacity = window.scrollY > 400 ? '1' : '0';
    btn.style.transform = window.scrollY > 400 ? 'translateY(0)' : 'translateY(16px)';
  });
});