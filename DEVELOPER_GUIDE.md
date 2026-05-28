# 📚 Panduan Pengembang: Pemeliharaan & Skalabilitas (Developer Guide)

Panduan ini ditulis khusus agar website **RumahKita (Portal Keluarga Besar)** dapat dipelihara, dikembangkan, dan ditingkatkan skalanya secara mandiri oleh pemilik website atau oleh AI coding assistant (seperti Antigravity) di masa depan hanya dengan instruksi sederhana dalam chat.

---

## 📂 Struktur Berkas & Arsitektur Proyek

Website ini dibangun menggunakan teknologi web murni (*pure vanilla frontend*) yang sangat cepat, ringan, responsif, dan mudah di-host di mana saja:

```
d:/Keluarga Ibu/
├── index.html           # Halaman Beranda (Portal Utama & Statistik)
├── agenda.html          # Halaman Kalender Agenda Keluarga & RSVP
├── galeri.html          # Halaman Album Galeri Foto (Proteksi 1MB)
├── silsilah.html        # Halaman Visual Canvas Pohon Keluarga (Silsilah)
├── kontak.html          # Halaman Buku Direktori Kontak Keluarga Besar
├── app.js               # Logika Log in/out Admin & Menu Navigasi Hamburger
├── style.css            # Sentralisasi Desain, CSS Variables, & Media Queries
└── firebase-config.js   # Konfigurasi Koneksi Cloud Firebase (Auth & Firestore)
```

---

## 🎨 1. Mengubah Desain & Warna Secara Global (CSS Variables)

Seluruh sistem warna, sudut membulat, bayangan, dan font dipusatkan menggunakan **CSS Variables** pada baris `:root` di berkas [style.css](file:///d:/Keluarga%20Ibu/style.css#L13-L40):

* **Warna Aksen & Gradien**: Jika ingin mengubah warna tema website (misalnya dari hijau zamrud menjadi merah bata hangat atau biru laut), AI cukup memodifikasi variabel `--accent-purple`, `--accent-teal`, `--grad-main`, dst.
* **Ukuran Sudut (Radius)**: Diatur lewat `--radius-sm` hingga `--radius-xl` untuk konsistensi lengkungan kotak (*card*).
* **Bayangan (Shadow)**: Diatur lewat `--shadow-card` untuk memberikan efek melayang premium.

---

## 🔑 2. Memperbarui Koneksi Database & Akun Admin (Firebase)

Seluruh konfigurasi cloud Firebase dipusatkan di berkas [firebase-config.js](file:///d:/Keluarga%20Ibu/firebase-config.js):

* **Mengganti Kunci Proyek Firebase**: Jika Anda ingin memindahkan database ke akun Firebase pribadi Anda, cukup ganti objek `firebaseConfig` dengan parameter proyek Firebase Anda yang baru.
* **Autentikasi Admin**: Untuk mendaftarkan akun Admin baru di cloud, cukup daftarkan email `admin@keluarga.com` (atau email pilihan Anda) dan kata sandinya di menu **Firebase Console -> Authentication -> Users -> Add User**.
* **Keamanan Database (Firestore Rules)**: Gunakan aturan pengamanan berikut di Firebase Console Anda agar database aman dari peretasan luar:
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /data/{document} {
        allow read: if true;
        allow write: if request.auth != null;
      }
    }
  }
  ```

---

## 💬 3. Memanggil Pop-up Dialog Premium (`customConfirm` & `customAlert`)

Website ini tidak lagi menggunakan dialog bawaan browser yang kaku. Melalui [app.js](file:///d:/Keluarga%20Ibu/app.js), kami menyediakan fungsi dialog kustom premium yang dapat dipanggil langsung dari berkas JavaScript mana pun:

* **Pemberitahuan / Informasi (`window.customAlert`)**:
  ```javascript
  // Sintaks: customAlert(Pesan, Judul, Ikon)
  customAlert('Ukuran foto maksimal 1 MB!', 'Peringatan', '⚠️');
  customAlert('RSVP Anda berhasil dikonfirmasi!', 'Sukses', '✅');
  ```
* **Konfirmasi Keputusan (`window.customConfirm` - Mengembalikan Promise)**:
  ```javascript
  // Sintaks: await customConfirm(Pesan, Judul, ApakahTindakanBahaya/Hapus)
  const confirmed = await customConfirm('Hapus kontak ini?', 'Hapus Kontak', true);
  if (confirmed) {
    // Jalankan kode penghapusan...
  }
  ```

---

## 🚀 4. Cara Melakukan Pembaruan Fitur di Masa Depan (Untuk AI)

Jika Anda ingin AI menambahkan halaman baru (misal: "Kas Keluarga" atau "Buku Cerita") atau memperbarui fitur yang ada, Anda cukup menulis perintah seperti ini dalam chat:

> *"Tolong buatkan halaman Kas Keluarga. Sesuaikan desainnya agar serasi dengan style.css, hubungkan ke database Firestore real-time menggunakan firebase-config.js, gunakan burger menu responsif, dan pakai customConfirm jika ada data kas yang ingin dihapus."*

Dengan membaca berkas **`DEVELOPER_GUIDE.md`** ini, AI di sesi chat mendatang akan langsung memahami arsitektur website dan menuliskan pembaruan yang **100% akurat, aman, dan tidak akan merusak fitur yang sudah berjalan**.
