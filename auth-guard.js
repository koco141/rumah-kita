// ==========================================
//  RumahKita — Auth Guard
//  Sisipkan di setiap halaman sebelum app.js
//  Akan redirect ke login.html jika belum login
// ==========================================

(function () {
  'use strict';

  const LOGIN_PAGE   = 'login.html';
  const ALLOWED_ROLES = ['admin', 'anggota'];

  // Cek userRole di localStorage
  const userRole = localStorage.getItem('userRole');

  // Jika tidak ada role atau role tidak dikenal → redirect ke login
  if (!userRole || !ALLOWED_ROLES.includes(userRole)) {
    // Simpan halaman yang ingin dikunjungi, agar bisa redirect balik setelah login
    const intendedPage = window.location.href;
    sessionStorage.setItem('redirectAfterLogin', intendedPage);

    // Redirect ke halaman login
    window.location.replace(LOGIN_PAGE);
  }

  // Sembunyikan body sementara sampai auth terkonfirmasi
  // (mencegah flash of protected content)
  if (!document.body) {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.style.visibility = 'visible';
    });
  } else {
    document.body.style.visibility = 'visible';
  }

})();
