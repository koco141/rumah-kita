# 🏡 RumahKita — Portal & Silsilah Keluarga Digital Premium

Selamat datang di **RumahKita**, sebuah portal digital interaktif premium khusus untuk keluarga besar **Sumadiwirja** (dan keturunannya) agar dapat saling terhubung, melestarikan silsilah leluhur, berbagi kenangan, serta berkoordinasi dalam agenda arisan atau reuni secara terorganisir.

Website ini dibangun menggunakan arsitektur **Pure Vanilla Frontend** (HTML5, CSS3, JS modern) yang super cepat, ringan, responsif penuh di HP/tablet, dilengkapi efek *glassmorphism*, micro-animations premium, serta sistem sinkronisasi database cloud real-time Firebase dengan fallback penyimpanan lokal yang cerdas.

---

## 🚀 Daftar Isi
1. [💻 Cara Menjalankan Website Secara Lokal](#-1-cara-menjalankan-website-secara-lokal)
2. [🔑 Kredensial Akses Admin & Cara Masuk](#-2-kredensial-akses-admin--cara-masuk)
3. [🌳 Panduan Penggunaan Halaman & Fitur](#-3-panduan-penggunaan-halaman--fitur)
4. [🌐 Cara Memperbarui Website Secara Online (Netlify)](#-4-cara-memperbarui-website-secara-online-netlify)
5. [☁️ Langkah Aktivasi Sinkronisasi Cloud (Firebase)](#-5-langkah-aktivasi-sinkronisasi-cloud-firebase)
6. [🛠️ Panduan Skalabilitas & Pemeliharaan Kode](#-6-panduan-skalabilitas--pemeliharaan-kode)

---

## 💻 1. Cara Menjalankan Website Secara Lokal

Untuk membuka dan mencoba website ini langsung di komputer Anda tanpa memerlukan jaringan internet:
1. Pastikan seluruh berkas website berada di folder **`D:\Keluarga Ibu`** komputer Anda.
2. Buka penjelajah file (*File Explorer*) dan navigasikan ke folder tersebut.
3. Klik ganda (double-click) pada berkas **`index.html`** untuk langsung membukanya di browser pilihan Anda (Google Chrome, Microsoft Edge, Safari, dll.).
4. Anda dapat beralih ke halaman lain menggunakan menu navigasi (*navbar*) di bagian atas halaman.

---

## 🔑 2. Kredensial Akses Admin & Cara Masuk

Sebagian besar fitur pembaruan data (menambah, mengubah, atau menghapus anggota silsilah, kontak, agenda, dan galeri) hanya dapat diakses setelah Anda masuk sebagai **Admin**.

### 📌 Akun Admin Utama
* **Email Admin**: `admin@keluarga.com`
* **Kata Sandi**: `MbahAman@2026`

### 🔓 Cara Masuk ke Akun Admin:
1. Klik tombol **"Masuk"** di pojok kanan atas menu navigasi (*navbar*) di halaman mana saja.
2. Jika Anda sedang membuka halaman interior (seperti Silsilah atau Kontak) pada layar HP, klik tombol menu hamburger (tiga garis) terlebih dahulu untuk memunculkan tombol **"Masuk"**.
3. Masukkan Email dan Kata Sandi di atas pada pop-up dialog modern yang muncul, lalu klik **"Masuk Sekarang"**.
4. Website akan memuat ulang halaman secara otomatis. Seluruh tombol pengelolaan data (**Tambah**, **Edit**, **Hapus**) kini telah aktif dan siap digunakan!
5. Untuk keluar, cukup klik kembali tombol **"Keluar"** di pojok kanan atas.

---

## 🌳 3. Panduan Penggunaan Halaman & Fitur

### 🌳 3.1. Halaman Silsilah Keluarga (Family Tree Canvas)
Halaman ini adalah jantung dari portal ini, menyajikan visualisasi struktur keturunan secara interaktif menggunakan Canvas HTML5.

* **Navigasi Layar (Pan & Zoom)**: 
  - **Menggeser (Pan)**: Klik dan tahan area kosong pada papan silsilah, lalu seret (*drag*) mouse Anda ke arah mana saja.
  - **Memperbesar/Mengecilkan (Zoom)**: Putar roda mouse (*scroll*) ke atas untuk memperbesar dan ke bawah untuk mengecilkan. Pada HP/tablet, gunakan gerakan mencubit layar (*pinch*) dengan dua jari.
* **Memulai Leluhur Tertua**:
  - Jika silsilah masih kosong, klik tombol besar **`🌳 Tambah Leluhur Pertama`** di tengah layar untuk mengisi nama leluhur tertua keluarga besar Anda.
* **Menambahkan Pasangan (💕)**:
  - Dekatkan kursor ke kartu anggota keluarga yang ingin ditambahkan pasangannya, lalu klik tombol **`💕`** di sebelah kanan kartu tersebut. Isi datanya di formulir pop-up.
* **Menambahkan Anak (👶)**:
  - Setelah pasangan ditambahkan, tombol **`👶`** akan muncul tepat di bawah pasangan tersebut.
  - Klik tombol **`👶`**, tentukan jumlah anak yang ingin ditambahkan (mendukung hingga 20 anak sekaligus secara berurutan), lalu isi detail nama, jenis kelamin, dan nomor HP/telepon anak.
* **Mengedit atau Menghapus Anggota**:
  - Klik pada kartu anggota keluarga mana saja untuk membuka panel detail.
  - Jika Anda masuk sebagai Admin, klik **`✏️ Edit Data`** untuk mengubah informasi, atau klik **`🗑️ Hapus`** untuk menghapus anggota beserta seluruh keturunan di bawahnya secara otomatis.

> [!IMPORTANT]
> Sistem silsilah ini mendukung pembuatan cabang keturunan rekursif tak terbatas. Anda dapat terus menambahkan anak dan pasangan hingga ke tingkat cicit atau generasi di bawahnya!

---

### 📞 3.2. Halaman Buku Kontak Keluarga
Buku Kontak mengelompokkan nomor telepon kerabat berdasarkan cabang keluarga masing-masing (misal: grup keturunan anak pertama, anak kedua, dst.).

* **Sinkronisasi Otomatis Silsilah ➔ Kontak**:
  - Setiap kali Anda menambahkan anggota baru di halaman **Silsilah**, sistem secara otomatis mendaftarkan nama dan nomor HP kerabat tersebut ke **Buku Kontak** secara real-time!
* **Aksi WhatsApp Cerdas (📱)**:
  - Klik tombol WhatsApp berwarna hijau di samping nama kontak untuk langsung membuka percakapan chat.
  - Jika nomor HP kerabat tersebut belum diisi, tombol WhatsApp akan otomatis berganti gaya menjadi abu-abu (*disabled style*) dan tidak dapat diklik.
* **Penyuntingan & Pengikatan Balik (Sync Back)**:
  - Admin dapat mengedit detail kontak secara langsung di halaman Kontak dengan mengklik tombol **`✏️`**.
  - Jika kontak tersebut terikat dengan silsilah keluarga, setiap pembaruan nama atau nomor HP di Buku Kontak akan **otomatis disinkronkan balik ke Silsilah Keluarga**!

---

### 📅 3.3. Halaman Agenda & RSVP Terpadu
Halaman ini berguna untuk mengumumkan acara keluarga besar (seperti arisan bulanan, arisan triwulan, reuni akbar, ziarah, atau syukuran).

* **Menambah Agenda Baru**:
  - Klik tombol **`Tambah Acara Baru +`** (khusus Admin), isi nama acara, deskripsi, tanggal, jam, lokasi, dan tautan Google Maps (opsional).
* **Konfirmasi RSVP Instan**:
  - Anggota keluarga yang membuka situs dapat mengisi kehadiran secara instan dengan mengklik tombol **`🟢 Hadir`** atau **`🔴 Tidak Hadir`**.
  - Jumlah partisipan akan terhitung secara real-time dan daftar nama kehadiran akan dikelompokkan dengan rapi di bawah detail acara.
* **Fitur Pengingat Kalender (Android & iPhone)**:
  - Klik tombol **`🔔 Ingatkan Saya (Kalender)`** di kartu acara. Sistem akan membuat pintasan unduhan file kalender universal (`.ics`) yang otomatis terintegrasi ke Google Calendar, Outlook, kalender HP Android, atau Apple Calendar iPhone Anda.

---

### 📸 3.4. Halaman Album Galeri Foto
Tempat mengabadikan momen-momen indah kebersamaan keluarga besar.

* **Mengunggah Foto**:
  - Admin dapat mengklik tombol **`Tambah Foto Baru +`**, menuliskan judul foto, memilih kategori (Silaturahmi, Reuni, Ulang Tahun, Kas, dll.), mengisi tanggal, dan memilih berkas gambar.
* **Proteksi Ukuran Berkas Maksimal 1 MB**:
  - Untuk menghemat ruang penyimpanan cloud database dan memastikan website dimuat dengan super cepat di semua HP anggota keluarga, sistem memiliki validasi ukuran gambar.
  - Jika file gambar yang dipilih melebihi ukuran **1 MB**, sistem akan memunculkan peringatan kustom: *"Ukuran berkas melebihi 1 MB. Silakan kompres foto Anda terlebih dahulu sebelum mengunggah!"* dan membatalkan unggahan.
* **Lightbox Premium**:
  - Klik pada foto mana saja di galeri untuk membukanya dalam tampilan penuh (*Lightbox*) yang elegan dengan latar belakang blur transparan.

---

## 🌐 4. Cara Memperbarui Website Secara Online (Netlify)

Jika Anda telah melakukan perubahan pada kode berkas (misal: mengubah file `.html`, `.css`, atau `.js`) di komputer lokal Anda dan ingin agar perubahan tersebut langsung aktif di internet pada domain resmi Anda:

### 🔗 Link Domain Resmi Anda:
👉 **`https://keluarga-aman-sumadiwirja.netlify.app/`**

### 📝 Langkah-langkah Unggah Pembaruan (Drag & Drop):
1. Buka browser dan kunjungi **[Netlify Dashboard (app.netlify.com)](https://app.netlify.com/)**.
2. Masuk menggunakan akun Netlify Anda.
3. Pilih proyek situs Anda yang bernama **`keluarga-aman-sumadiwirja`**.
4. Klik tab/menu **Deploys** di bagian atas halaman pengelolaan situs.
5. Gulir ke bagian paling bawah halaman **Deploys** tersebut.
6. Anda akan melihat sebuah kotak besar (*dropzone area*) bergaris putus-putus dengan teks:
   > *"Need to update your site? Drag and drop your site folder here"*
7. Buka File Explorer di komputer Anda, seret (*drag*) folder **`D:\Keluarga Ibu`** secara utuh, lalu lepaskan (*drop*) tepat di dalam kotak tersebut di browser.
8. Tunggu proses unggahan selama beberapa detik hingga status berubah menjadi **"Published"** (Selesai).
9. Selesai! Buka tautan website Anda di HP atau komputer lain untuk melihat hasilnya yang sudah terupdate secara instan di seluruh dunia!

---

## ☁️ 5. Langkah Aktivasi Sinkronisasi Cloud (Firebase)

Secara default, website ini dilengkapi dengan fitur penyimpanan cadangan lokal browser (*localStorage*). Artinya, perubahan data Anda akan tetap tersimpan aman di komputer/HP tempat Anda mengeditnya walaupun browser ditutup.

Namun, untuk mengaktifkan **sinkronisasi multi-perangkat secara real-time** (agar perubahan data silsilah, kontak, atau galeri yang diisi oleh Admin di satu HP langsung muncul di HP seluruh anggota keluarga lain secara instan), Anda perlu menghubungkannya ke cloud database **Firebase** gratis Anda sendiri.

### 📝 Tahap 1: Membuat Proyek Firebase Gratis
1. Buka dan masuk ke **[Firebase Console (console.firebase.google.com)](https://console.firebase.google.com/)** menggunakan akun Google Anda.
2. Klik **Add Project** (Tambah Proyek).
3. Beri nama proyek Anda, misalnya: `Keluarga-Sumadiwirja-Portal`.
4. Klik **Continue** dan matikan opsi *Google Analytics* (opsional, agar setup lebih cepat), lalu klik **Create Project**.
5. Setelah proyek siap, klik **Continue**.

### 📝 Tahap 2: Mengaktifkan Layanan Firestore Database & Auth
1. **Firestore Database**:
   - Di menu sebelah kiri Firebase Console, klik **Build ➔ Firestore Database**.
   - Klik **Create Database**.
   - Pilih lokasi server terdekat (disarankan `asia-southeast2` untuk Jakarta/Singapura).
   - Pilih **Start in test mode** (Mulai dalam mode uji coba), lalu klik **Create**.
   - Masuk ke tab **Rules** di bagian atas Firestore, lalu ganti kode aturannya dengan aturan keamanan berikut agar database aman dari pihak luar:
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
   - Klik **Publish**.
2. **Firebase Authentication (Aktivasi Akun Admin)**:
   - Di menu sebelah kiri, klik **Build ➔ Authentication**.
   - Klik **Get Started**.
   - Pilih metode masuk **Email/Password** di daftar Sign-in Providers, lalu klik **Enable** (Aktifkan) dan klik **Save**.
   - Masuk ke tab **Users** di bagian atas halaman Authentication, klik **Add User**.
   - Masukkan Email: `admin@keluarga.com` dan Kata Sandi: `MbahAman@2026` (atau kredensial pilihan Anda), lalu klik **Add User**.

### 📝 Tahap 3: Menghubungkan Firebase ke Kode Website Anda
1. Kembali ke halaman utama dashboard proyek Firebase Anda (*Project Overview*).
2. Klik ikon **Web ( `</>` )** di tengah halaman untuk menambahkan aplikasi web baru.
3. Beri nama aplikasi Anda, misalnya `Web Portal Keluarga`, lalu klik **Register App**.
4. Firebase akan menampilkan kode konfigurasi JavaScript. Salin nilai dalam objek `firebaseConfig` saja, seperti:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
5. Buka berkas **`D:\Keluarga Ibu\firebase-config.js`** menggunakan aplikasi Notepad atau Text Editor di komputer Anda.
6. Ganti nilai di dalam objek `firebaseConfig` bawaan dengan nilai kunci asli yang baru saja Anda salin dari Firebase Console Anda.
7. Simpan berkas tersebut.
8. **Unggah kembali folder website ke Netlify** seperti panduan pada [Bagian 4](#-4-cara-memperbarui-website-secara-online-netlify).

> [!TIP]
> **Arsitektur Hemat Kuota (Seumur Hidup Gratis)**: Website ini dirancang sangat cerdas dengan menyimpan seluruh data silsilah ke dalam satu dokumen terpadu (`data/silsilah`). Hal ini meminimalkan biaya kueri baca/tulis Firebase menjadi sangat kecil. Kuota gratis Firebase Spark Tier (50.000 baca per hari) akan bertahan seumur hidup tanpa biaya sepeser pun!

---

## 🛠️ 6. Panduan Skalabilitas & Pemeliharaan Kode

Website ini dirancang secara modular dan teratur agar dapat dikembangkan dan diperbarui dengan mudah oleh pengembang manusia maupun asisten AI coding (seperti Antigravity) di masa depan.

### 📂 Panduan Struktur File untuk AI (Masa Depan)
Jika di masa depan Anda ingin meminta bantuan AI di sesi chat baru untuk menambah fitur (misalnya menambah halaman "Buku Kas Keluarga" atau "Papan Pengumuman Baru"), cukup tunjukkan berkas [DEVELOPER_GUIDE.md](file:///d:/Keluarga%20Ibu/DEVELOPER_GUIDE.md) kepadanya.

AI tersebut akan membaca panduan developer dan dapat langsung mengintegrasikan halaman baru tersebut dengan cara:
1. Menyelaraskannya secara visual menggunakan variabel warna global di [style.css](file:///d:/Keluarga%20Ibu/style.css).
2. Menghubungkan penyimpanan data barunya ke Firebase Firestore secara aman menggunakan basis koneksi dari [firebase-config.js](file:///d:/Keluarga%20Ibu/firebase-config.js).
3. Menggunakan fungsi dialog modern bawaan `window.customAlert` dan `window.customConfirm` di [app.js](file:///d:/Keluarga%20Ibu/app.js) untuk menghindari pop-up bawaan browser yang kaku.

### 💬 Contoh Perintah Chat untuk AI Pembuat Fitur Baru:
> *"Tolong buatkan halaman Kas Keluarga. Sesuaikan desainnya agar serasi dengan style.css, hubungkan ke database Firestore secara real-time menggunakan firebase-config.js, gunakan burger menu responsif di HP, dan pakai customConfirm jika ada data transaksi kas yang ingin dihapus oleh Admin."*

Dengan dokumentasi ini, portal keluarga besar **Sumadiwirja** akan selalu terjaga kerapian kodenya, aman digunakan, dan mudah dikembangkan untuk jangka panjang hingga generasi-generasi mendatang! 🌟
