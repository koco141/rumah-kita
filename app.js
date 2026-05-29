// ── GLOBAL LOGOUT — tersedia segera (sebelum DOMContentLoaded) ──────────────
window.doLogout = function () {
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  try {
    if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
      firebase.auth().signOut().catch(function () {});
    }
  } catch (e) {}
  // Paksa redirect ke login
  window.location.href = 'login.html';
};

// ── CUSTOM MODALS (ALERT & CONFIRM) ────────
window.customConfirm = (message, title = 'Konfirmasi', isDanger = true) => {
  return new Promise((resolve) => {
    let overlay = document.getElementById('custom-confirm-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'custom-confirm-modal';
      overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(15,23,42,0.6);
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        z-index: 99999; display: flex; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none; transition: opacity 0.25s ease;
        padding: 20px; font-family: 'Outfit', sans-serif;
      `;
      overlay.innerHTML = `
        <div class="confirm-card" style="
          background: white; width: 100%; max-width: 400px;
          border-radius: 24px; padding: 32px; text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
          transform: scale(0.9); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        ">
          <div class="confirm-icon" style="
            width: 64px; height: 64px; border-radius: 50%;
            margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;
            font-size: 28px; background: #fee2e2; color: #ef4444;
          ">🗑️</div>
          <h3 class="confirm-title" style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Hapus Data</h3>
          <p class="confirm-msg" style="font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 28px;"></p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="btn-cancel" style="
              flex: 1; padding: 12px 24px; border-radius: 12px; border: 1px solid #e2e8f0;
              background: white; color: #475569; font-weight: 700; font-size: 14px; cursor: pointer; transition: 0.15s;
            ">Batal</button>
            <button class="btn-ok" style="
              flex: 1; padding: 12px 24px; border-radius: 12px; border: none;
              background: #ef4444; color: white; font-weight: 700; font-size: 14px; cursor: pointer; transition: 0.15s;
            ">Ya, Hapus</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      
      const btnCancel = overlay.querySelector('.btn-cancel');
      btnCancel.addEventListener('mouseenter', () => btnCancel.style.background = '#f8fafc');
      btnCancel.addEventListener('mouseleave', () => btnCancel.style.background = 'white');
    }

    const card = overlay.querySelector('.confirm-card');
    const iconEl = overlay.querySelector('.confirm-icon');
    const titleEl = overlay.querySelector('.confirm-title');
    const msgEl = overlay.querySelector('.confirm-msg');
    const btnCancel = overlay.querySelector('.btn-cancel');
    const btnOk = overlay.querySelector('.btn-ok');

    if (isDanger) {
      iconEl.textContent = '🗑️';
      iconEl.style.background = '#fee2e2';
      iconEl.style.color = '#ef4444';
      btnOk.textContent = 'Ya, Hapus';
      btnOk.style.background = '#ef4444';
      btnOk.style.color = 'white';
    } else {
      iconEl.textContent = '❓';
      iconEl.style.background = '#e0f2fe';
      iconEl.style.color = '#0284c7';
      btnOk.textContent = 'Ya, Benar';
      btnOk.style.background = '#0284c7';
      btnOk.style.color = 'white';
    }

    titleEl.textContent = title;
    msgEl.textContent = message;

    // Show
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
    setTimeout(() => { card.style.transform = 'scale(1)'; }, 10);

    const cleanup = (val) => {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
      card.style.transform = 'scale(0.9)';
      
      // Remove event listeners by replacing buttons
      btnOk.replaceWith(btnOk.cloneNode(true));
      btnCancel.replaceWith(btnCancel.cloneNode(true));
      
      resolve(val);
    };

    // Add fresh listeners
    overlay.querySelector('.btn-ok').addEventListener('click', () => cleanup(true));
    overlay.querySelector('.btn-cancel').addEventListener('click', () => cleanup(false));
  });
};

window.customAlert = (message, title = 'Pemberitahuan', icon = '✨') => {
  return new Promise((resolve) => {
    let overlay = document.getElementById('custom-alert-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'custom-alert-modal';
      overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(15,23,42,0.6);
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        z-index: 99999; display: flex; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none; transition: opacity 0.25s ease;
        padding: 20px; font-family: 'Outfit', sans-serif;
      `;
      overlay.innerHTML = `
        <div class="alert-card" style="
          background: white; width: 100%; max-width: 400px;
          border-radius: 24px; padding: 32px; text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
          transform: scale(0.9); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        ">
          <div class="alert-icon" style="
            width: 64px; height: 64px; border-radius: 50%;
            margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;
            font-size: 28px; background: #e0f2fe; color: #0284c7;
          ">✨</div>
          <h3 class="alert-title" style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Pemberitahuan</h3>
          <p class="alert-msg" style="font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 28px;"></p>
          <button class="btn-alert-ok" style="
            width: 100%; padding: 12px 24px; border-radius: 12px; border: none;
            background: #8b5cf6; color: white; font-weight: 700; font-size: 14px; cursor: pointer; transition: 0.15s;
          ">OK</button>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    const card = overlay.querySelector('.alert-card');
    const iconEl = overlay.querySelector('.alert-icon');
    const titleEl = overlay.querySelector('.alert-title');
    const msgEl = overlay.querySelector('.alert-msg');
    const btnOk = overlay.querySelector('.btn-alert-ok');

    iconEl.textContent = icon;
    if (icon === '⚠️') {
      iconEl.style.background = '#fef3c7';
      iconEl.style.color = '#d97706';
      btnOk.style.background = '#d97706';
    } else if (icon === '✅') {
      iconEl.style.background = '#dcfce7';
      iconEl.style.color = '#16a34a';
      btnOk.style.background = '#16a34a';
    } else {
      iconEl.style.background = '#f3e8ff';
      iconEl.style.color = '#8b5cf6';
      btnOk.style.background = '#8b5cf6';
    }

    titleEl.textContent = title;
    msgEl.textContent = message;

    // Show
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
    setTimeout(() => { card.style.transform = 'scale(1)'; }, 10);

    const cleanup = () => {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
      card.style.transform = 'scale(0.9)';
      btnOk.replaceWith(btnOk.cloneNode(true));
      resolve();
    };

    overlay.querySelector('.btn-alert-ok').addEventListener('click', cleanup);
  });
};

document.addEventListener('DOMContentLoaded', () => {

  // ── LOGOUT FUNCTION (global) ─────────────────────────
  window.doLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    if (typeof auth !== 'undefined' && auth) {
      auth.signOut().catch(() => {});
    }
    window.location.replace('login.html');
  };

  // ── DISPLAY USER NAME IN NAVBAR ───────────────────────
  const userName  = localStorage.getItem('userName')  || '';
  const userEmail = localStorage.getItem('userEmail') || '';
  const userRole  = localStorage.getItem('userRole')  || 'anggota';
  const navUserNameEl = document.getElementById('navUserName');
  if (navUserNameEl && (userName || userEmail)) {
    const displayName = userName || userEmail.split('@')[0];
    const roleIcon = userRole === 'admin' ? '⚙️ ' : '👤 ';
    navUserNameEl.textContent = roleIcon + displayName;
    navUserNameEl.style.display = 'inline';
  }

  // ── KELOLA ANGGOTA (Admin only) ───────────────────────
  // Inject tombol "Kelola Anggota" ke navbar jika admin
  if (userRole === 'admin') {
    injectKelolaAnggotaBtn();
    injectKelolaAnggotaModal();
  }

  // Inject mobile actions (profile + logout) into hamburger dropdown menu
  injectMobileMenuActions();

  function injectKelolaAnggotaBtn() {
    // Cari nav-actions di halaman ini
    const navActions = document.querySelector('.nav-actions');
    if (!navActions || document.getElementById('btn-kelola-anggota')) return;

    const btn = document.createElement('button');
    btn.id = 'btn-kelola-anggota';
    btn.title = 'Kelola Akses Anggota';
    btn.style.cssText = `
      background: rgba(16,185,129,0.12); color: #059669;
      border: 1px solid rgba(16,185,129,0.3);
      padding: 8px 16px; border-radius: 50px;
      font-size: 13px; font-weight: 700;
      cursor: pointer; transition: 0.2s;
      font-family: 'Outfit', sans-serif;
      display: flex; align-items: center; gap: 6px;
      white-space: nowrap;
    `;
    btn.innerHTML = '👥 Anggota';
    btn.addEventListener('mouseenter', () => {
      btn.style.background = '#10b981';
      btn.style.color = 'white';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'rgba(16,185,129,0.12)';
      btn.style.color = '#059669';
    });
    btn.addEventListener('click', () => openKelolaAnggota());

    // Insert sebelum tombol Keluar
    const keluarBtn = navActions.querySelector('.btn-login');
    if (keluarBtn) {
      navActions.insertBefore(btn, keluarBtn);
    } else {
      navActions.prepend(btn);
    }
  }

  function injectKelolaAnggotaModal() {
    if (document.getElementById('modal-kelola-anggota')) return;

    const styles = document.createElement('style');
    styles.textContent = `
      #modal-kelola-anggota {
        position: fixed; inset: 0;
        background: rgba(15,23,42,0.65);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        z-index: 99990;
        display: flex; align-items: center; justify-content: center;
        padding: 20px;
        opacity: 0; pointer-events: none;
        transition: opacity 0.25s ease;
        font-family: 'Outfit', sans-serif;
      }
      #modal-kelola-anggota.active {
        opacity: 1; pointer-events: all;
      }
      .ka-card {
        background: white;
        width: 100%; max-width: 520px;
        border-radius: 28px;
        box-shadow: 0 40px 100px rgba(0,0,0,0.25);
        overflow: hidden;
        transform: scale(0.94) translateY(20px);
        transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        max-height: 90vh;
        display: flex; flex-direction: column;
      }
      #modal-kelola-anggota.active .ka-card {
        transform: scale(1) translateY(0);
      }
      .ka-header {
        background: linear-gradient(135deg, #10b981, #059669);
        padding: 24px 28px 20px;
        position: relative;
      }
      .ka-header-title {
        font-size: 20px; font-weight: 900; color: white;
        margin-bottom: 4px;
      }
      .ka-header-sub {
        font-size: 13px; color: rgba(255,255,255,0.75);
      }
      .ka-close {
        position: absolute; top: 16px; right: 16px;
        width: 32px; height: 32px; border-radius: 50%;
        background: rgba(255,255,255,0.2); border: none;
        color: white; font-size: 16px; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: 0.2s;
      }
      .ka-close:hover { background: rgba(255,255,255,0.35); }
      .ka-stats {
        display: flex; gap: 12px; margin-top: 16px;
      }
      .ka-stat {
        background: rgba(255,255,255,0.15);
        border-radius: 10px; padding: 8px 14px;
        font-size: 12px; color: white; font-weight: 600;
      }
      .ka-stat span {
        font-size: 20px; font-weight: 900;
        display: block; line-height: 1;
      }
      .ka-body {
        padding: 20px 28px;
        overflow-y: auto;
        flex: 1;
      }
      .ka-add-form {
        display: flex; gap: 10px; margin-bottom: 20px;
      }
      .ka-add-input {
        flex: 1; padding: 11px 16px;
        border-radius: 12px; border: 1.5px solid #e2e8f0;
        font-size: 14px; font-family: 'Outfit', sans-serif;
        outline: none; transition: 0.2s;
      }
      .ka-add-input:focus {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
      }
      .ka-add-btn {
        padding: 11px 18px; border-radius: 12px; border: none;
        background: #10b981; color: white;
        font-size: 14px; font-weight: 700;
        cursor: pointer; transition: 0.2s;
        font-family: 'Outfit', sans-serif;
        white-space: nowrap;
      }
      .ka-add-btn:hover { background: #059669; transform: translateY(-1px); }
      .ka-list-header {
        font-size: 11px; font-weight: 800;
        text-transform: uppercase; letter-spacing: 1.5px;
        color: #94a3b8; margin-bottom: 10px;
      }
      .ka-list {
        display: flex; flex-direction: column; gap: 8px;
        min-height: 80px;
      }
      .ka-item {
        display: flex; align-items: center; gap: 12px;
        background: #f8fafc; border: 1px solid #f1f5f9;
        border-radius: 12px; padding: 12px 14px;
        transition: 0.2s; animation: kaFadeIn 0.3s ease;
      }
      .ka-item:hover { border-color: #e2e8f0; background: white; }
      @keyframes kaFadeIn {
        from { opacity: 0; transform: translateX(-8px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      .ka-avatar {
        width: 36px; height: 36px; border-radius: 50%;
        background: linear-gradient(135deg, #10b981, #059669);
        display: flex; align-items: center; justify-content: center;
        font-size: 16px; flex-shrink: 0; color: white; font-weight: 700;
      }
      .ka-email {
        flex: 1; font-size: 14px; font-weight: 600; color: #1e293b;
        word-break: break-all;
      }
      .ka-del {
        width: 30px; height: 30px; border-radius: 8px;
        background: #fee2e2; border: none; color: #ef4444;
        font-size: 14px; cursor: pointer; transition: 0.2s;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .ka-del:hover { background: #ef4444; color: white; }
      .ka-empty {
        text-align: center; padding: 28px;
        color: #94a3b8; font-size: 14px; font-weight: 500;
      }
      .ka-empty span { font-size: 32px; display: block; margin-bottom: 8px; }
      .ka-info {
        background: #f0fdf4; border: 1px solid #bbf7d0;
        border-radius: 10px; padding: 10px 14px;
        font-size: 12px; color: #15803d;
        margin-top: 16px; line-height: 1.6;
      }
      .ka-saving {
        font-size: 12px; color: #94a3b8;
        text-align: right; margin-top: 8px;
        min-height: 18px;
      }
    `;
    document.head.appendChild(styles);

    const modal = document.createElement('div');
    modal.id = 'modal-kelola-anggota';
    modal.innerHTML = `
      <div class="ka-card">
        <div class="ka-header">
          <button class="ka-close" onclick="closeKelolaAnggota()">✕</button>
          <div class="ka-header-title">👥 Kelola Akses Anggota</div>
          <div class="ka-header-sub">Daftar Gmail yang diizinkan masuk ke portal</div>
          <div class="ka-stats">
            <div class="ka-stat"><span id="ka-count">0</span>Anggota</div>
            <div class="ka-stat" style="background:rgba(255,255,255,0.1);">
              <span style="font-size:13px;">🔒</span>Hanya yang terdaftar
            </div>
          </div>
        </div>
        <div class="ka-body">
          <div class="ka-add-form">
            <input type="email" class="ka-add-input" id="ka-input"
              placeholder="nama@gmail.com" autocomplete="off" />
            <button class="ka-add-btn" id="ka-add-btn" onclick="kaAddEmail()">
              + Tambah
            </button>
          </div>
          <div class="ka-list-header">Email yang terdaftar</div>
          <div class="ka-list" id="ka-list">
            <div class="ka-empty">
              <span>📭</span>
              Memuat daftar anggota...
            </div>
          </div>
          <div class="ka-info">
            ✅ Hanya Gmail yang ada di daftar ini yang bisa masuk sebagai <strong>Anggota</strong>.<br/>
            ⚙️ Admin tetap bisa masuk menggunakan username & password.<br/>
            💡 Pastikan email yang dimasukkan aktif dan huruf kecil semua.
          </div>
          <div class="ka-saving" id="ka-saving"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeKelolaAnggota();
    });

    // Enter key on input
    document.getElementById('ka-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') kaAddEmail();
    });
  }

  // State whitelist
  let _kaEmails = [];

  window.openKelolaAnggota = async () => {
    const modal = document.getElementById('modal-kelola-anggota');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    await kaLoadEmails();
  };

  window.closeKelolaAnggota = () => {
    const modal = document.getElementById('modal-kelola-anggota');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  async function kaLoadEmails() {
    const listEl = document.getElementById('ka-list');
    listEl.innerHTML = `<div class="ka-empty"><span>⏳</span>Memuat...</div>`;

    try {
      if (typeof db !== 'undefined' && db) {
        const doc = await db.collection('data').doc('whitelist').get();
        if (doc.exists && Array.isArray(doc.data().emails)) {
          _kaEmails = doc.data().emails.map(e => e.toLowerCase().trim()).filter(Boolean);
        } else {
          _kaEmails = [];
        }
      } else {
        // Fallback: baca dari localStorage
        _kaEmails = JSON.parse(localStorage.getItem('whitelistEmails') || '[]');
      }
    } catch (err) {
      console.warn('Gagal load whitelist:', err);
      _kaEmails = JSON.parse(localStorage.getItem('whitelistEmails') || '[]');
    }
    kaRender();
  }

  function kaRender() {
    const listEl  = document.getElementById('ka-list');
    const countEl = document.getElementById('ka-count');
    if (countEl) countEl.textContent = _kaEmails.length;

    if (_kaEmails.length === 0) {
      listEl.innerHTML = `
        <div class="ka-empty">
          <span>📭</span>
          Belum ada anggota terdaftar.<br/>
          <small>Semua Gmail bisa masuk selama list ini kosong!</small>
        </div>`;
      return;
    }

    listEl.innerHTML = _kaEmails.map((email, i) => `
      <div class="ka-item" id="ka-item-${i}">
        <div class="ka-avatar">${email.charAt(0).toUpperCase()}</div>
        <div class="ka-email">${email}</div>
        <button class="ka-del" onclick="kaRemoveEmail(${i})" title="Hapus akses ${email}">✕</button>
      </div>
    `).join('');
  }

  window.kaAddEmail = async () => {
    const input = document.getElementById('ka-input');
    const email = (input.value || '').toLowerCase().trim();

    if (!email) return;

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      kaSavingMsg('⚠️ Format email tidak valid!', '#d97706');
      input.focus();
      return;
    }

    // Cek duplikat
    if (_kaEmails.includes(email)) {
      kaSavingMsg('ℹ️ Email sudah terdaftar.', '#0891b2');
      input.value = '';
      input.focus();
      return;
    }

    _kaEmails.push(email);
    input.value = '';
    kaRender();
    await kaSave();
    input.focus();
  };

  window.kaRemoveEmail = async (idx) => {
    const email = _kaEmails[idx];
    const confirmed = await customConfirm(
      `Hapus akses "${email}" dari portal?`,
      'Hapus Akses Anggota',
      true
    );
    if (!confirmed) return;
    _kaEmails.splice(idx, 1);
    kaRender();
    await kaSave();
  };

  async function kaSave() {
    kaSavingMsg('💾 Menyimpan...', '#94a3b8');
    try {
      if (typeof db !== 'undefined' && db) {
        await db.collection('data').doc('whitelist').set({ emails: _kaEmails });
      }
      // Juga simpan di localStorage sebagai cache
      localStorage.setItem('whitelistEmails', JSON.stringify(_kaEmails));
      kaSavingMsg('✅ Tersimpan!', '#10b981');
    } catch (err) {
      console.error('Gagal simpan whitelist:', err);
      localStorage.setItem('whitelistEmails', JSON.stringify(_kaEmails));
      kaSavingMsg('⚠️ Tersimpan lokal (Firestore gagal)', '#d97706');
    }
    setTimeout(() => kaSavingMsg('', ''), 3000);
  }

  function kaSavingMsg(msg, color) {
    const el = document.getElementById('ka-saving');
    if (el) { el.textContent = msg; el.style.color = color; }
  }

  // ── NAVBAR SCROLL ──────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  });

  // ── ACTIVE NAV LINK ────────────────────────
  const sections = ['home','fitur','anggota','galeri','kontak'];
  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(id => {
      const el = document.getElementById(id);
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

  // ── INJECT MOBILE MENU ACTIONS ───────────────────────
  function injectMobileMenuActions() {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks || document.getElementById('nav-mobile-actions')) return;

    const userName  = localStorage.getItem('userName')  || '';
    const userEmail = localStorage.getItem('userEmail') || '';
    const userRole  = localStorage.getItem('userRole')  || 'anggota';

    if (!userName && !userEmail) return; // Belum login?

    const displayName = userName || userEmail.split('@')[0];
    const roleBadge = userRole === 'admin' ? '<span class="nav-mobile-badge-admin">Admin</span>' : '';

    const li = document.createElement('li');
    li.id = 'nav-mobile-actions';
    li.className = 'nav-mobile-only-item';
    
    let adminBtnHtml = '';
    if (userRole === 'admin') {
      adminBtnHtml = `
        <button class="btn-mobile-action btn-mobile-kelola" onclick="openKelolaAnggota()">
          👥 Kelola Anggota
        </button>
      `;
    }

    li.innerHTML = `
      <div class="nav-mobile-profile">
        <span class="nav-mobile-avatar">${userRole === 'admin' ? '⚙️' : '👤'}</span>
        <div class="nav-mobile-user-details">
          <span class="nav-mobile-name">${displayName}</span>
          ${roleBadge}
        </div>
      </div>
      <div class="nav-mobile-buttons">
        ${adminBtnHtml}
        <button class="btn-mobile-action btn-mobile-logout" onclick="doLogout()">
          🚪 Keluar
        </button>
      </div>
    `;

    navLinks.appendChild(li);
  }

  // ── HAMBURGER MENU ─────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const navbarEl  = document.getElementById('navbar');

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    hamburger.classList.toggle('active');
    navbarEl?.classList.toggle('nav-active');
  });

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navLinks) {
        navLinks.classList.remove('active');
        hamburger?.classList.remove('active');
        navbarEl?.classList.remove('nav-active');
      }
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && navLinks?.classList.contains('active')) {
      if (!navLinks.contains(e.target) && !hamburger?.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger?.classList.remove('active');
        navbarEl?.classList.remove('nav-active');
      }
    }
  });

  // ── ROLE & SESSION MANAGEMENT ──────────────
  // (userRole sudah dideklarasikan di bagian atas DOMContentLoaded)

  // Apply role classes to body for styling
  if (userRole === 'admin') {
    document.body.classList.add('is-admin');
    document.body.classList.remove('not-admin');
  } else {
    document.body.classList.add('not-admin');
    document.body.classList.remove('is-admin');
  }

  // Adjust non-admin restrictions dynamically
  if (userRole !== 'admin') {
    const addMemberCard = document.getElementById('member-add');
    if (addMemberCard) addMemberCard.style.display = 'none';

    const btnUsul = document.getElementById('btn-usul');
    if (btnUsul) btnUsul.style.display = 'none';
  }

  // ── MODAL LOGIN ────────────────────────────
  const backdrop   = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');

  function openModal() {
    if (backdrop) {
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeModal() {
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  modalClose?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── STANDARDIZE LOGIN/LOGOUT NAV BUTTONS ──
  // (Tombol sudah di-handle oleh doLogout() + auth-guard.js)
  // Kept for backward compatibility but login redirect now goes to login.html
  const loginBtns = document.querySelectorAll('.btn-login, #btn-login, #btnLoginNav');
  loginBtns.forEach(btn => {
    // If not already bound by onclick attribute, bind logout
    if (!btn.getAttribute('onclick')) {
      btn.addEventListener('click', () => {
        if (typeof window.doLogout === 'function') {
          window.doLogout();
        } else {
          localStorage.removeItem('userRole');
          window.location.replace('login.html');
        }
      });
    }
  });

  // Remove auto-open modal (no longer needed — login is on login.html)
  // const urlParams = ...

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

    const isFirebaseConfigured = typeof firebaseConfig !== 'undefined' && 
                                 firebaseConfig.apiKey && 
                                 !firebaseConfig.apiKey.includes('Fake');

    if (typeof auth !== 'undefined' && auth && isFirebaseConfigured) {
      btnSubmit.textContent = 'Memverifikasi...';
      btnSubmit.disabled = true;
      auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
          localStorage.setItem('userRole', 'admin');
          showToast('✅ Berhasil masuk sebagai Admin Cloud!', 'success');
          setTimeout(() => {
            closeModal();
            window.location.reload();
          }, 1200);
        })
        .catch((error) => {
          console.error("Login failed: ", error);
          btnSubmit.textContent = 'Masuk Sekarang';
          btnSubmit.disabled = false;

          // Descriptive error messages
          let errorMsg = '❌ Email atau kata sandi salah!';
          if (error.code === 'auth/operation-not-allowed' || error.code === 'auth/configuration-not-found') {
            errorMsg = '⚠️ Metode Email/Password belum diaktifkan di Firebase Console ➔ Authentication!';
          } else if (error.code === 'auth/user-not-found') {
            errorMsg = '⚠️ Akun admin belum terdaftar di tab Users Firebase Console!';
          } else if (error.code === 'auth/wrong-password') {
            errorMsg = '❌ Kata sandi salah!';
          } else if (error.code === 'auth/invalid-email') {
            errorMsg = '❌ Format email tidak valid!';
          } else {
            errorMsg = `❌ Gagal: ${error.message}`;
          }
          showToast(errorMsg, 'error');
        });
    } else {
      // Validate Admin Credentials Fallback (Using local credentials if Firebase is not yet configured)
      if (email === 'admin@keluarga.com' && pass === 'MbahAman@2026') {
        localStorage.setItem('userRole', 'admin');
        showToast('✅ Berhasil masuk sebagai Admin Lokal!', 'success');
        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 1500);
      } else {
        showToast('❌ Email atau kata sandi salah!', 'error');
      }
    }
  });

  // Keep localStorage userRole in sync with Firebase state if active and configured
  const isFirebaseActive = typeof firebaseConfig !== 'undefined' && 
                           firebaseConfig.apiKey && 
                           !firebaseConfig.apiKey.includes('Fake');

  if (typeof auth !== 'undefined' && auth && isFirebaseActive) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Hanya user dengan email admin@keluarga.com yang berhak mendapatkan role admin
        const isAdmin = user.email === 'admin@keluarga.com';
        if (isAdmin) {
          if (localStorage.getItem('userRole') !== 'admin') {
            localStorage.setItem('userRole', 'admin');
            window.location.reload();
          }
        } else {
          // Google Auth user (Anggota)
          if (localStorage.getItem('userRole') !== 'anggota') {
            localStorage.setItem('userRole', 'anggota');
            window.location.reload();
          }
        }
      } else {
        // Jika tidak ada user Firebase
        // Kita hanya reset ke anggota jika sebelumnya bukan Admin lokal (admin@keluarga.com)
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail !== 'admin@keluarga.com') {
          if (localStorage.getItem('userRole') === 'admin') {
            localStorage.setItem('userRole', 'anggota');
            window.location.reload();
          }
        }
      }
    });
  }

  // ── SMOOTH SCROLL BUTTONS ──────────────────
  const scrollTargets = {
    'btn-jelajahi'    : '#fitur',
    'btn-galeri'      : '#galeri',
    'btn-lihat-foto'  : '#galeri',
    'btn-all-galeri'  : '#galeri',
    'btn-all-announce': '#home',
  };

  Object.entries(scrollTargets).forEach(([id, target]) => {
    document.getElementById(id)?.addEventListener('click', () => {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Feature buttons navigation
  const featTargets = {
    'fbtn-galeri'   : 'galeri.html',
    'fbtn-silsilah' : 'silsilah.html',
    'fbtn-agenda'   : 'agenda.html',
    'fbtn-kas'      : null,
    'fbtn-cerita'   : null,
    'fbtn-kontak'   : 'kontak.html',
  };

  Object.entries(featTargets).forEach(([id, target]) => {
    document.getElementById(id)?.addEventListener('click', () => {
      if (target) {
        window.location.href = target;
      } else {
        showToast('🚧 Fitur ini segera hadir!', 'info');
      }
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
      if (name) showToast(`👤 ${name}`, 'info');
    });
  });

  // ── AGENDA CLICK ──────────────────────────
  document.querySelectorAll('.agenda-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.querySelector('.agenda-name')?.textContent;
      if (name) showToast(`📅 ${name}`, 'info');
    });
  });

  // ── GALERI ITEM CLICK ─────────────────────
  document.querySelectorAll('.galeri-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      showToast('🖼️ Membuka galeri lengkap...', 'info');
    });
  });

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
