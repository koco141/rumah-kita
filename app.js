// ===========================
//  RumahKita — App JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL ──────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  });

  // ── ACTIVE NAV LINK ────────────────────────
  const sections = ['home','fitur','anggota','galeri','kontak'];
  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(id => {
      const el = document.getElementById(id) || document.getElementById(
        id === 'anggota' ? 'anggota' :
        id === 'fitur'   ? 'fitur'   :
        id === 'kontak'  ? 'kontak'  : id
      );
      if (!el) return;
      const link = document.querySelector(`a[href="#${id}"]`) ||
                   document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;
      if (el.offsetTop <= scrollY && el.offsetTop + el.offsetHeight > scrollY) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  // ── HAMBURGER MENU ─────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(13,13,18,0.98)';
    navLinks.style.padding = '16px 24px';
    navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.07)';
    navLinks.style.backdropFilter = 'blur(20px)';
  });

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
      }
    });
  });

  // ── MODAL LOGIN ────────────────────────────
  const backdrop   = document.getElementById('modalBackdrop');
  const btnLogin   = document.getElementById('btn-login');
  const modalClose = document.getElementById('modalClose');

  function openModal() { backdrop.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeModal() { backdrop.classList.remove('active'); document.body.style.overflow = ''; }

  btnLogin?.addEventListener('click', openModal);
  modalClose?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── MODAL FORM SUBMIT ──────────────────────
  const btnSubmit  = document.getElementById('btn-submit-login');
  const inputEmail = document.getElementById('input-email');
  const inputPass  = document.getElementById('input-pass');

  btnSubmit?.addEventListener('click', () => {
    const email = inputEmail.value.trim();
    const pass  = inputPass.value.trim();
    if (!email || !pass) {
      showToast('⚠️ Mohon isi email dan kata sandi', 'warning');
      return;
    }
    showToast('✅ Berhasil masuk! Selamat datang.', 'success');
    setTimeout(closeModal, 1500);
  });

  // ── SMOOTH SCROLL BUTTONS ──────────────────
  const scrollTargets = {
    'btn-jelajahi'  : '#fitur',
    'btn-galeri'    : '#galeri',
    'btn-lihat-foto': '#galeri',
    'btn-all-galeri': '#galeri',
    'btn-all-announce': '#home',
  };

  Object.entries(scrollTargets).forEach(([id, target]) => {
    document.getElementById(id)?.addEventListener('click', () => {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Feature buttons scroll
  const featTargets = {
    'fbtn-galeri'   : '#galeri',
    'fbtn-silsilah' : '#home',
    'fbtn-agenda'   : '#home',
    'fbtn-kas'      : '#home',
    'fbtn-cerita'   : '#home',
    'fbtn-kontak'   : '#kontak',
  };

  Object.entries(featTargets).forEach(([id, target]) => {
    document.getElementById(id)?.addEventListener('click', () => {
      showToast('🚧 Fitur ini segera hadir!', 'info');
    });
  });

  // ── SCROLL REVEAL ANIMATION ────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll(
    '.feature-card, .member-card, .galeri-item'
  ).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.5s ${i * 0.07}s ease, transform 0.5s ${i * 0.07}s ease`;
    observer.observe(el);
  });

  // ── MEMBER CARD CLICK ──────────────────────
  document.querySelectorAll('.member-card:not(.add-card)').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.member-name')?.textContent;
      showToast(`👤 Profil ${name} segera hadir!`, 'info');
    });
  });

  document.getElementById('member-add')?.addEventListener('click', () => {
    showToast('📨 Fitur undang anggota segera hadir!', 'info');
  });

  // ── AGENDA CLICK ──────────────────────────
  document.querySelectorAll('.agenda-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.querySelector('.agenda-name')?.textContent;
      showToast(`📅 Detail acara: ${name}`, 'info');
    });
  });

  // ── GALERI ITEM CLICK ─────────────────────
  document.querySelectorAll('.galeri-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      showToast('🖼️ Membuka galeri lengkap...', 'info');
    });
  });

  // ── COUNTER ANIMATION ─────────────────────
  function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.textContent.replace('+',''));
      const hasPlus = el.textContent.includes('+');
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (hasPlus && current === target ? '+' : '');
        if (current >= target) clearInterval(timer);
      }, 30);
    });
  }

  // Trigger counter when hero is visible
  const heroObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); heroObs.disconnect(); }
  }, { threshold: 0.3 });
  const heroEl = document.querySelector('.hero-stats');
  if (heroEl) heroObs.observe(heroEl);

  // ── TOAST NOTIFICATION ────────────────────
  function showToast(msg, type = 'info') {
    const existing = document.getElementById('toast-container');
    if (existing) existing.remove();

    const colors = {
      success: '#22c55e',
      warning: '#f59e0b',
      info:    '#8b5cf6',
      error:   '#ef4444',
    };

    const toast = document.createElement('div');
    toast.id = 'toast-container';
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '28px',
      right: '28px',
      background: colors[type] || colors.info,
      color: 'white',
      padding: '14px 22px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      fontFamily: "'Outfit', sans-serif",
      zIndex: '9999',
      boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
      transform: 'translateY(20px)',
      opacity: '0',
      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
      maxWidth: '320px',
      lineHeight: '1.4',
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // ── HOVER TILT EFFECT (hero cards) ────────
  document.querySelectorAll('.hero-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-3px) rotateX(${-y*4}deg) rotateY(${x*4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  console.log('🏡 RumahKita Portal loaded!');
});
