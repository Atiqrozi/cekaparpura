# Requirements Frontend --- APAR Check

## 1. Ringkasan Proyek

**APAR Check** adalah aplikasi web untuk mendukung pemeriksaan rutin
Alat Pemadam Api Ringan (APAR). Aplikasi memiliki dua pengalaman utama:

1.  **Petugas pemeriksa** mengisi data pemeriksaan, menilai kondisi APAR
    melalui checklist, menambahkan catatan/foto, meninjau jawaban, lalu
    mengirim hasil pemeriksaan.
2.  **Administrator** memantau inventaris APAR, hasil pemeriksaan,
    jadwal, tindak lanjut, pengguna, dan laporan.

Dokumen ini mendefinisikan kebutuhan sisi frontend. Integrasi backend,
autentikasi, penyimpanan file, dan ekspor data harus mengikuti kontrak
API yang disepakati dengan tim backend.

## 2. Tech Stack

-   **Framework:** Vue 3 dengan Composition API.
-   **Build tool:** Vite.
-   **Bahasa:** TypeScript dengan mode strict.
-   **Styling:** Tailwind CSS.
-   **Komponen UI:** shadcn-vue, yaitu implementasi shadcn/ui untuk Vue.
-   **Routing:** Vue Router.
-   **Form:** vee-validate dan Zod untuk validasi skema.
-   **Ikon:** lucide-vue-next.
-   **HTTP client:** Axios atau Fetch API terbungkus dalam service
    layer.
-   **Visualisasi data:** Apache ECharts atau Chart.js melalui wrapper
    Vue yang sesuai.
-   **Tanggal:** date-fns.
-   **Tabel:** TanStack Table untuk Vue jika tabel memerlukan sorting,
    filtering, dan pagination yang kompleks.
-   **Notifikasi:** komponen Toast/Sonner yang kompatibel dengan
    shadcn-vue.
-   **Testing:** Vitest, Vue Test Utils, dan Playwright untuk pengujian
    end-to-end.
-   **Linting dan formatting:** ESLint dan Prettier.

> Catatan: shadcn/ui asli berorientasi React. Untuk Vue, gunakan
> **shadcn-vue** dan dokumentasinya agar komponen, instalasi, dan contoh
> kode sesuai dengan ekosistem Vue.

## 3. Persyaratan Lingkungan

-   Node.js versi LTS yang kompatibel dengan versi Vue dan Vite yang
    dipilih.
-   npm sebagai package manager default (pnpm dapat digunakan jika
    disepakati tim).
-   Browser modern: Chrome, Edge, Firefox, dan Safari versi yang masih
    didukung.
-   Akses ke base URL API backend melalui environment variable.
-   Proyek harus dapat dijalankan secara lokal tanpa kredensial
    produksi.

## 4. Instalasi Awal

Contoh pembuatan proyek:

``` bash
npm create vite@latest apar-check-frontend -- --template vue-ts
cd apar-check-frontend
npm install
```

Pasang dependensi aplikasi:

``` bash
npm install vue-router axios vee-validate zod @vee-validate/zod date-fns lucide-vue-next
npm install echarts vue-echarts
npm install @tanstack/vue-table
```

Pasang dependensi pengembangan:

``` bash
npm install -D tailwindcss @tailwindcss/vite
npm install -D eslint prettier vitest @vue/test-utils jsdom
npm install -D @playwright/test
```

Ikuti panduan instalasi **shadcn-vue** untuk menginisialisasi komponen
sesuai versi Tailwind CSS yang dipilih. Jangan mengasumsikan perintah
CLI shadcn/ui untuk React akan bekerja langsung pada Vue.

Contoh command setelah proyek dan konfigurasi Tailwind siap:

``` bash
npx shadcn-vue@latest init
```

Perintah dan opsi CLI dapat berubah sesuai versi; validasi dengan
dokumentasi resmi shadcn-vue sebelum menjalankan inisialisasi.

## 5. Konfigurasi Environment

Buat file `.env.example`:

``` dotenv
VITE_APP_NAME=APAR Check
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_ENV=development
```

Ketentuan: - Jangan menyimpan secret, private API key, atau kredensial
database di variabel `VITE_*`, karena nilainya dapat terekspos di
browser. - Gunakan `.env.local` untuk konfigurasi lokal dan jangan
commit file tersebut. - Jika backend belum tersedia, sediakan mock
service/data yang terpisah dari service API produksi. - Tampilkan pesan
yang jelas ketika API tidak dapat diakses.

## 6. Struktur Direktori yang Disarankan

``` text
apar-check-frontend/
├── public/
│   ├── images/
│   │   ├── apar/
│   │   └── illustrations/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   │   ├── ui/                 # Komponen shadcn-vue
│   │   ├── common/
│   │   ├── forms/
│   │   ├── data-table/
│   │   ├── charts/
│   │   └── feedback/
│   ├── layouts/
│   │   ├── PublicLayout.vue
│   │   ├── InspectionLayout.vue
│   │   └── AdminLayout.vue
│   ├── pages/
│   │   ├── public/
│   │   ├── inspection/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── inspections/
│   │   ├── apar/
│   │   ├── schedules/
│   │   ├── corrective-actions/
│   │   ├── users/
│   │   ├── reports/
│   │   ├── notifications/
│   │   └── settings/
│   ├── router/
│   │   └── index.ts
│   ├── services/
│   │   ├── api-client.ts
│   │   ├── auth.service.ts
│   │   ├── inspection.service.ts
│   │   ├── apar.service.ts
│   │   ├── schedule.service.ts
│   │   ├── corrective-action.service.ts
│   │   ├── user.service.ts
│   │   └── report.service.ts
│   ├── composables/
│   ├── stores/
│   ├── types/
│   ├── schemas/
│   ├── utils/
│   ├── constants/
│   ├── App.vue
│   └── main.ts
├── .env.example
├── components.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── requirements.md
```

Sesuaikan nama folder dan file ketika implementasi berjalan, tetapi
pertahankan pemisahan antara halaman, komponen UI, service API, tipe,
skema validasi, dan utilitas.

## 7. Prinsip UI/UX

-   Semua teks antarmuka menggunakan **Bahasa Indonesia**.
-   Tampilan profesional dengan konteks keselamatan kerja.
-   Warna utama: merah keselamatan; gunakan navy untuk navigasi admin,
    putih/abu-abu untuk permukaan, hijau untuk kondisi baik, amber untuk
    perhatian, dan merah untuk kondisi rusak/kritis.
-   Status harus memiliki teks atau ikon selain warna agar tetap dapat
    dipahami oleh pengguna dengan gangguan persepsi warna.
-   Form pemeriksaan harus mengutamakan pengalaman mobile.
-   Dashboard admin dioptimalkan untuk desktop tetapi tetap responsif
    pada tablet dan ponsel.
-   Gunakan komponen shadcn-vue secara konsisten untuk button, input,
    select, dialog, dropdown, tabs, badge, table, calendar, tooltip,
    toast, dan form.
-   Tampilkan loading, empty, success, validation, offline/API error,
    dan permission-denied states.
-   Gunakan konfirmasi sebelum tindakan destruktif atau perubahan status
    penting.
-   Hindari mengklaim APAR bersertifikat atau pasti aman hanya
    berdasarkan hasil checklist digital.

## 8. Daftar Halaman dan Route

### 8.1 Halaman publik dan pemeriksaan petugas

  ------------------------------------------------------------------------------
  Route                          Halaman                 Kebutuhan utama
  ------------------------------ ----------------------- -----------------------
  `/`                            Landing page            Penjelasan sistem,
                                                         manfaat, panduan
                                                         singkat, CTA mulai
                                                         pemeriksaan, login
                                                         admin

  `/pemeriksaan/mulai`           Data pemeriksa          Identitas,
                                                         tanggal/waktu, lokasi,
                                                         pemilihan APAR

  `/pemeriksaan/:id/checklist`   Checklist APAR          Pertanyaan pemeriksaan
                                                         berdasarkan kategori

  `/pemeriksaan/:id/review`      Review pemeriksaan      Ringkasan identitas,
                                                         APAR, jawaban, foto,
                                                         temuan

  `/pemeriksaan/:id/berhasil`    Konfirmasi berhasil     Nomor referensi dan
                                                         ringkasan pengiriman

  `/pemeriksaan/:id/hasil`       Detail hasil            Ringkasan hasil yang
                                                         dapat dicetak

  `/panduan`                     Panduan pemeriksaan     Petunjuk penggunaan
                                                         sistem dan penjelasan
                                                         umum
  ------------------------------------------------------------------------------

### 8.2 Autentikasi dan admin

  ----------------------------------------------------------------------------
  Route                        Halaman                 Kebutuhan utama
  ---------------------------- ----------------------- -----------------------
  `/admin/login`               Login admin             Username/email,
                                                       password, validasi,
                                                       error

  `/admin/lupa-password`       Lupa password           Permintaan reset sesuai
                                                       dukungan backend

  `/admin`                     Dashboard               KPI, grafik, inspeksi
                                                       terbaru, alert

  `/admin/pemeriksaan`         Data pemeriksaan        Tabel, pencarian,
                                                       filter, pagination,
                                                       ekspor

  `/admin/pemeriksaan/:id`     Detail pemeriksaan      Checklist, bukti foto,
                                                       temuan, audit informasi

  `/admin/apar`                Inventaris APAR         Daftar aset dan filter

  `/admin/apar/tambah`         Tambah APAR             Form aset

  `/admin/apar/:id`            Detail APAR             Kondisi, lokasi,
                                                       riwayat, jadwal

  `/admin/apar/:id/edit`       Edit APAR               Pembaruan data aset

  `/admin/jadwal`              Jadwal pemeriksaan      Tampilan kalender dan
                                                       daftar

  `/admin/tindak-lanjut`       Tindak lanjut           Daftar temuan dan
                                                       status penanganan

  `/admin/tindak-lanjut/:id`   Detail tindak lanjut    Temuan, PIC, tenggat,
                                                       bukti penyelesaian

  `/admin/pengguna`            Data pengguna           Daftar, filter, peran,
                                                       status

  `/admin/pengguna/tambah`     Tambah pengguna         Form pengguna sesuai
                                                       role yang diizinkan

  `/admin/pengguna/:id/edit`   Edit pengguna           Pembaruan data dan
                                                       status akun

  `/admin/laporan`             Laporan                 Filter, ringkasan,
                                                       grafik, ekspor

  `/admin/notifikasi`          Notifikasi              Pemberitahuan dan
                                                       tautan ke data terkait

  `/admin/pengaturan`          Pengaturan              Lokasi, jenis APAR,
                                                       interval, checklist,
                                                       profil institusi

  `/admin/profil`              Profil admin            Profil dan perubahan
                                                       password
  ----------------------------------------------------------------------------

Route detail yang memerlukan `:id` harus memvalidasi parameter dan
menampilkan halaman not-found bila data tidak tersedia.

## 9. Kebutuhan Fitur per Modul

### 9.1 Landing page

-   Header dan navigasi responsif.
-   Hero section dengan ilustrasi APAR.
-   CTA "Mulai Pemeriksaan" dan "Login Admin".
-   Bagian manfaat, langkah pemeriksaan, pentingnya inspeksi, dan
    footer.
-   Ilustrasi harus berasal dari aset lokal yang disetujui atau aset
    berlisensi sesuai.

### 9.2 Form identitas pemeriksa

Field awal yang disarankan: - Nama lengkap (wajib). - Tanggal
pemeriksaan (wajib). - Waktu pemeriksaan (wajib atau otomatis sesuai
keputusan produk). - Lokasi/gedung/lantai/departemen (wajib sesuai
kebutuhan). - Kode APAR (wajib; pilih dari inventaris bila tersedia). -
NIP/ID karyawan (opsional jika belum dipastikan). - Jabatan/departemen
(opsional). - Catatan awal (opsional).

Ketentuan: - Tanggal awal menggunakan tanggal lokal saat ini, tetapi
pengguna harus dapat mengubahnya jika kebijakan mengizinkan. - Field
wajib harus ditandai dengan jelas. - Simpan data sementara selama
pengguna berpindah antar-step. - Validasi harus memberikan pesan per
field. - Jika inventaris kosong, tampilkan instruksi yang jelas; jangan
membuat kode APAR palsu secara diam-diam.

### 9.3 Checklist kondisi APAR

Kelompok pertanyaan yang perlu didukung: 1. Kondisi fisik tabung. 2. Pin
pengaman dan segel. 3. Selang, nozzle, pegangan, dan tuas. 4. Label dan
petunjuk penggunaan. 5. Indikator tekanan jika tersedia. 6. Kesesuaian
isi/berat sesuai jenis APAR dan petunjuk produsen. 7. Aksesibilitas dan
penempatan. 8. Dudukan/bracket dan tanda lokasi. 9. Catatan, temuan,
foto, dan rekomendasi.

Pilihan jawaban dasar: - Baik. - Perlu Perbaikan. - Rusak. - Tidak
Berlaku, hanya jika diizinkan oleh konfigurasi checklist.

Ketentuan: - Pertanyaan dan opsi jawaban dirender dari konfigurasi
checklist yang disediakan backend atau file konfigurasi terpusat. -
Jawaban yang belum diisi harus terlihat. - Bila memilih Perlu Perbaikan
atau Rusak, tampilkan field catatan/temuan sesuai aturan checklist. -
Dukung upload foto dengan preview, remove, dan validasi tipe serta
ukuran file. - Tampilkan progres jumlah pertanyaan yang selesai. -
Jangan menetapkan status akhir hanya dari persentase jawaban baik.
Aturan untuk temuan kritis harus diputuskan oleh pihak yang berwenang
dan dikirim dari backend bila tersedia.

### 9.4 Review dan pengiriman

-   Tampilkan seluruh identitas, data APAR, jawaban, foto, dan temuan.
-   Pengguna dapat kembali mengubah bagian tertentu.
-   Sediakan checkbox konfirmasi sebelum pengiriman.
-   Tampilkan dialog konfirmasi sebelum submit.
-   Cegah double submit ketika request sedang diproses.
-   Setelah berhasil, tampilkan nomor referensi dari backend.
-   Jika request gagal, pertahankan data yang sudah diisi dan sediakan
    aksi coba lagi.

### 9.5 Dashboard admin

Kartu ringkasan: - Total APAR terdaftar. - Jumlah pemeriksaan dalam
periode. - APAR kondisi baik. - APAR perlu perbaikan. - APAR
rusak/kritis. - APAR belum diperiksa. - Pemeriksaan terlambat.

Visualisasi: - Tren aktivitas pemeriksaan. - Distribusi kondisi APAR. -
Pemeriksaan per lokasi. - Status penyelesaian tindak lanjut.

Tabel pemeriksaan terbaru: - Nomor pemeriksaan. - Tanggal. -
Pemeriksa. - Kode APAR. - Lokasi. - Hasil kondisi. - Tindak lanjut. -
Aksi detail.

Alert: - APAR rusak/kritis. - APAR perlu perbaikan. - Jadwal
terlambat. - APAR tanpa riwayat pemeriksaan. - Tindak lanjut melewati
tenggat.

Semua KPI dan grafik harus memakai data API yang konsisten dengan filter
periode. Klik KPI atau item grafik dapat membuka daftar yang sesuai jika
endpoint mendukungnya.

### 9.6 Data pemeriksaan

-   Pencarian berdasarkan nomor pemeriksaan, nama pemeriksa, atau kode
    APAR.
-   Filter tanggal, lokasi, jenis APAR, kondisi, pemeriksa, dan status
    tindak lanjut.
-   Sorting dan pagination.
-   Detail pemeriksaan dan hasil cetak.
-   Ekspor data jika didukung backend.
-   Perubahan terhadap catatan pemeriksaan yang telah dikirim harus
    mengikuti izin dan kebijakan audit.

### 9.7 Inventaris APAR

Field aset: - Kode APAR unik. - Jenis APAR. - Merek. - Kapasitas. -
Nomor seri jika ada. - Tanggal instalasi. - Lokasi
gedung/lantai/departemen. - Lokasi spesifik. - Tanggal
servis/kedaluwarsa jika relevan. - Interval pemeriksaan. - Jadwal
pemeriksaan berikutnya. - Status operasional. - Foto dan catatan
opsional.

Detail aset: - Kondisi dari inspeksi terakhir. - Tanggal pemeriksaan
terakhir. - Jumlah hari sejak pemeriksaan terakhir. - Jadwal
berikutnya. - Riwayat pemeriksaan. - Riwayat tindak lanjut.

### 9.8 Jadwal pemeriksaan

-   Tampilan kalender dan daftar.
-   Filter tanggal, lokasi, petugas, dan status.
-   Status: Terjadwal, Akan Jatuh Tempo, Terlambat, Selesai.
-   Buat dan ubah jadwal jika memiliki izin.
-   Jadwal tidak boleh otomatis menjadi selesai tanpa pemeriksaan
    terkait yang benar-benar tercatat.

### 9.9 Tindak lanjut

-   Daftar temuan dengan prioritas, APAR, lokasi, tanggal, PIC, tenggat,
    dan status.
-   Status: Belum Ditangani, Sedang Diproses, Menunggu Verifikasi,
    Selesai.
-   Detail temuan dan catatan penyelesaian.
-   Upload bukti perbaikan jika backend mendukung.
-   Riwayat perubahan status.
-   Konfirmasi untuk perubahan status penting.

### 9.10 Pengguna dan peran

Peran yang disarankan: - Administrator. - Petugas Pemeriksa. - Viewer
(opsional, hanya baca).

Frontend harus menyembunyikan atau menonaktifkan aksi yang tidak
diizinkan berdasarkan data role dari backend. Pengamanan otorisasi yang
sebenarnya tetap wajib dilakukan di backend.

### 9.11 Laporan

-   Filter periode, lokasi, jenis APAR, kondisi, pemeriksa, dan tindak
    lanjut.
-   Ringkasan statistik dan grafik.
-   Tabel rincian pemeriksaan.
-   Preview laporan.
-   Tombol cetak.
-   Unduh PDF/Excel hanya jika endpoint atau mekanisme ekspor tersedia.
-   Format cetak A4, jelas, dan tetap terbaca dalam grayscale.

### 9.12 Pengaturan dan notifikasi

-   Profil institusi dan logo.
-   Data master lokasi.
-   Jenis APAR.
-   Interval pemeriksaan default.
-   Konfigurasi checklist sesuai izin.
-   Preferensi notifikasi.
-   Notifikasi jadwal mendekati jatuh tempo, keterlambatan, temuan
    kritis, dan tindak lanjut.
-   Perubahan kriteria checklist harus memiliki versi agar hasil
    pemeriksaan lama tetap dapat ditafsirkan sesuai kriteria saat itu.

## 10. Model Data Frontend (TypeScript)

Buat tipe TypeScript terpusat di `src/types/`. Sesuaikan nama dan field
akhir dengan kontrak API backend.

``` ts
export type AparCondition =
  | "good"
  | "needs_repair"
  | "damaged"
  | "not_inspected";

export type ScheduleStatus =
  | "scheduled"
  | "due_soon"
  | "overdue"
  | "completed";

export type CorrectiveActionStatus =
  | "open"
  | "in_progress"
  | "pending_verification"
  | "completed";

export type AssetOperationalStatus =
  | "active"
  | "inactive"
  | "under_repair";

export type ChecklistAnswer =
  | "good"
  | "needs_repair"
  | "damaged"
  | "not_applicable";

export interface Inspector {
  id?: string;
  fullName: string;
  employeeId?: string;
  position?: string;
  department?: string;
  phone?: string;
}

export interface AparAsset {
  id: string;
  code: string;
  type: string;
  brand?: string;
  capacity?: string;
  serialNumber?: string;
  locationId?: string;
  locationName: string;
  installedAt?: string;
  lastInspectionAt?: string | null;
  nextInspectionAt?: string | null;
  condition: AparCondition;
  operationalStatus: AssetOperationalStatus;
}

export interface ChecklistItemResult {
  questionId: string;
  question: string;
  category: string;
  answer: ChecklistAnswer | null;
  notes?: string;
  photoUrls?: string[];
}

export interface InspectionRecord {
  id: string;
  referenceNumber: string;
  inspector: Inspector;
  aparId: string;
  aparCode: string;
  inspectionDate: string;
  locationName: string;
  results: ChecklistItemResult[];
  overallCondition: AparCondition;
  findings?: string;
  recommendations?: string;
  createdAt: string;
}

export interface CorrectiveAction {
  id: string;
  inspectionId: string;
  aparId: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: CorrectiveActionStatus;
  assigneeId?: string;
  dueDate?: string;
  completedAt?: string | null;
}
```

Catatan: - Jangan mengasumsikan API selalu mengembalikan field
opsional. - Gunakan tanggal ISO 8601 untuk pertukaran data bila
disepakati dengan backend. - Pisahkan label tampilan Bahasa Indonesia
dari enum internal. - Jangan menggunakan teks label UI sebagai
satu-satunya nilai yang disimpan ke API. - Tipe di atas adalah titik
awal dan harus diselaraskan dengan schema backend.

## 11. API Service Layer

Semua permintaan jaringan harus melalui `src/services/`. Jangan
menempatkan pemanggilan Axios/Fetch secara tersebar di setiap komponen.

Service minimum: - `auth.service.ts`: login, logout, profil, dan alur
reset password. - `apar.service.ts`: daftar, detail, tambah, edit, dan
status APAR. - `inspection.service.ts`: membuat pemeriksaan, menyimpan
draft bila didukung, mengambil detail, mengirim hasil, dan riwayat. -
`schedule.service.ts`: daftar dan pengelolaan jadwal. -
`corrective-action.service.ts`: daftar, detail, dan pembaruan tindak
lanjut. - `user.service.ts`: pengelolaan pengguna. -
`report.service.ts`: ringkasan, laporan, dan ekspor.

Ketentuan: - Base URL dibaca dari `VITE_API_BASE_URL`. - Tangani
response error secara terpusat. - Tampilkan pesan yang ramah pengguna
tanpa mengekspos stack trace. - Tambahkan timeout dan pembatalan request
untuk kebutuhan yang sesuai. - Gunakan tipe request/response. - Jangan
menganggap operasi berhasil sebelum server mengonfirmasi. - Untuk mock
mode, buat implementasi mock terpisah agar mudah diganti ke API
sesungguhnya.

Kontrak endpoint harus ditentukan bersama backend. Contoh resource yang
mungkin diperlukan: - `/auth/login` - `/auth/logout` - `/auth/me` -
`/apar` - `/apar/:id` - `/inspections` - `/inspections/:id` -
`/schedules` - `/corrective-actions` - `/users` - `/reports/summary` -
`/reports/export`

Endpoint di atas adalah usulan, bukan kontrak final.

## 12. Routing dan Akses

-   Gunakan Vue Router dengan route metadata untuk layout dan kebutuhan
    autentikasi.
-   Halaman publik menggunakan `PublicLayout`.
-   Alur inspeksi menggunakan `InspectionLayout`.
-   Halaman admin menggunakan `AdminLayout`.
-   Route admin harus memeriksa status autentikasi sebelum menampilkan
    konten.
-   Periksa role untuk aksi dan halaman yang dibatasi.
-   Jika sesi berakhir, arahkan pengguna ke login dan tampilkan
    informasi yang sesuai.
-   Tampilkan halaman 403 untuk akses yang tidak diizinkan dan 404 untuk
    route/data yang tidak ditemukan.
-   Guard frontend hanya untuk pengalaman pengguna; backend tetap harus
    memvalidasi otorisasi.

## 13. State Management

Gunakan composable lokal untuk state sederhana. Jika state lintas
halaman semakin kompleks, gunakan Pinia.

State yang perlu dikelola dengan hati-hati: - Sesi dan profil admin. -
Filter dashboard dan tabel. - Draft pemeriksaan aktif. - Jawaban
checklist. - File foto sementara. - Status submit dan pesan error. -
Preferensi tampilan yang tidak sensitif.

Ketentuan: - Jangan menyimpan password atau secret ke localStorage. -
Jangan menyimpan foto atau data pemeriksaan sensitif ke storage browser
tanpa keputusan keamanan yang jelas. - Jika draft perlu bertahan setelah
browser ditutup, tentukan mekanisme dengan tim backend dan pemilik
data. - Bersihkan state draft setelah pengiriman berhasil sesuai
kebijakan aplikasi.

## 14. Pengolahan Status dan Tanggal

Status berikut harus dibedakan:

1.  **Kondisi APAR:** Baik, Perlu Perbaikan, Rusak, Belum Diperiksa.
2.  **Status jadwal:** Terjadwal, Akan Jatuh Tempo, Terlambat, Selesai.
3.  **Status tindak lanjut:** Belum Ditangani, Sedang Diproses, Menunggu
    Verifikasi, Selesai.
4.  **Status operasional aset:** Aktif, Tidak Aktif, Dalam Perbaikan.

Ketentuan: - Gunakan satu fungsi pemetaan enum-ke-label dan
enum-ke-style. - Jangan menentukan kondisi akhir hanya dengan menghitung
jumlah jawaban baik. - Temuan kritis harus mengikuti aturan yang
disetujui oleh pihak keselamatan dan/atau backend. - Hitung "hari sejak
pemeriksaan terakhir" dari timestamp inspeksi terakhir yang selesai,
bukan dari pembuatan draft. - Jika belum pernah diperiksa, tampilkan
"Belum pernah diperiksa". - Perhatikan zona waktu lokal dan format
tanggal Indonesia. - Jangan menetapkan interval inspeksi yang sama untuk
semua aset kecuali telah dikonfirmasi. - Tampilkan status dan alasan
secara jelas agar admin memahami mengapa aset membutuhkan perhatian.

## 15. Upload Foto

-   Terima hanya format yang ditentukan, misalnya JPEG, PNG, atau WebP.
-   Validasi ukuran maksimum sesuai konfigurasi backend.
-   Tampilkan nama file, ukuran, preview, progress, dan error.
-   Sediakan aksi hapus/ganti sebelum submit.
-   Jangan mengandalkan validasi frontend saja; backend wajib
    memvalidasi tipe dan ukuran file.
-   Gunakan URL hasil upload dari backend untuk data permanen.
-   Jangan mengirim base64 besar ke API kecuali kontrak backend memang
    mengharuskannya.
-   Jika upload gagal, pertahankan jawaban checklist dan berikan opsi
    mencoba kembali.

## 16. Responsive Design

Desktop: - Dashboard dengan sidebar dan area konten utama. - Kartu KPI
dan grafik dapat menggunakan grid. - Tabel memiliki lebar kolom yang
memadai.

Tablet: - Sidebar dapat diciutkan. - Filter dan kartu menyesuaikan
lebar. - Kontrol tabel tetap dapat digunakan.

Mobile: - Checklist dan form menggunakan satu kolom. - Target sentuh
cukup besar. - Step progress tetap mudah dipahami. - Upload foto
mendukung pemilihan kamera/file bila browser dan perangkat mendukung. -
Tabel kompleks dapat berubah menjadi kartu atau layout yang dapat
digulir secara terkontrol. - Tombol utama tidak menutupi field atau
pesan validasi. - Hindari horizontal overflow pada seluruh halaman.

## 17. Aksesibilitas

-   Label input harus terhubung dengan field.
-   Semua kontrol dapat dioperasikan dengan keyboard.
-   Fokus keyboard terlihat.
-   Pesan error dapat dibaca screen reader.
-   Status tidak hanya dibedakan dengan warna.
-   Gunakan heading secara berurutan.
-   Sediakan teks alternatif untuk gambar informatif.
-   Tombol ikon harus memiliki accessible label.
-   Kontras teks dan latar harus memadai.

## 18. Keamanan Frontend

-   Jangan menaruh secret API atau kredensial di source code.
-   Jangan merender input pengguna sebagai HTML mentah.
-   Validasi input di frontend dan backend.
-   Ikuti mekanisme autentikasi yang disepakati; jangan menyimpan token
    jangka panjang di localStorage tanpa analisis risiko.
-   Tangani sesi berakhir dan logout dengan benar.
-   Hindari menampilkan data pribadi yang tidak diperlukan.
-   Batasi akses halaman berdasarkan role, sambil tetap mengandalkan
    backend untuk otorisasi sebenarnya.
-   Jangan menampilkan detail teknis internal server kepada pengguna.

## 19. Testing dan Quality Assurance

### Unit/component tests

-   Validasi form data pemeriksa.
-   Validasi checklist dan pertanyaan yang belum dijawab.
-   Perilaku field catatan saat jawaban bermasalah dipilih.
-   Pemetaan status dan label.
-   Perhitungan hari sejak inspeksi terakhir.
-   Loading, error, dan empty states.
-   Guard route berdasarkan sesi dan role.

### End-to-end tests

1.  Petugas membuka landing page dan memulai pemeriksaan.
2.  Petugas mengisi identitas dan memilih APAR.
3.  Petugas mengisi checklist dan menambahkan temuan.
4.  Petugas meninjau dan mengirim pemeriksaan.
5.  Sistem menampilkan referensi pemeriksaan dari response backend.
6.  Admin login dan membuka dashboard.
7.  Admin memfilter serta melihat detail pemeriksaan.
8.  Admin membuka detail APAR dan riwayat inspeksi.
9.  Admin mengelola jadwal dan tindak lanjut sesuai izin.
10. Admin membuka laporan dan mencoba ekspor jika tersedia.
11. Aplikasi menangani API error, sesi berakhir, dan data kosong.

## 20. Kriteria Penerimaan

Frontend dinyatakan siap untuk integrasi ketika: - Seluruh route utama
sudah dibuat. - Layout publik, inspeksi, dan admin konsisten. - Form
menggunakan TypeScript dan validasi skema. - Checklist menampilkan
progres serta pertanyaan yang belum terjawab. - Jawaban bermasalah dapat
memunculkan catatan/temuan sesuai aturan. - Review menampilkan data
sebelum submit. - Double submit dicegah. - Dashboard membedakan kondisi
APAR, jadwal, tindak lanjut, dan status operasional. - Detail aset
menampilkan tanggal inspeksi terakhir dan hari sejak pemeriksaan
terakhir. - Tabel memiliki pencarian/filter/pagination sesuai
kebutuhan. - Halaman memiliki loading, empty, error, dan success
states. - UI responsif pada desktop, tablet, dan ponsel. - Tidak ada
secret di bundle frontend. - Test penting berjalan dan tidak ada error
TypeScript/lint yang belum ditangani. - Semua endpoint dan batasan
integrasi yang belum tersedia terdokumentasi secara eksplisit.

## 21. Catatan yang Perlu Dikonfirmasi Sebelum Implementasi Final

Beberapa kebutuhan belum ditetapkan dan harus dikonfirmasi dengan
pemilik aplikasi: - Apakah pemeriksaan boleh dilakukan tanpa login, atau
petugas harus login? - Field identitas mana yang wajib? - Apakah
inventaris APAR sudah tersedia sebelum pemeriksaan? - Siapa yang
berwenang mengubah atau mengoreksi pemeriksaan yang sudah dikirim? -
Apakah foto wajib untuk kondisi Rusak/Perlu Perbaikan? - Berapa batas
ukuran dan format foto? - Bagaimana aturan status keseluruhan dan temuan
kritis? - Siapa yang menentukan interval pemeriksaan? - Apakah ekspor
PDF/Excel dibuat frontend atau backend? - Apakah notifikasi hanya tampil
di website atau juga dikirim melalui email/WhatsApp? - Apa kebijakan
retensi, akses, dan audit data pemeriksaan?

Jangan mengarang keputusan operasional yang belum disepakati. Gunakan
konfigurasi sementara yang ditandai jelas sampai pemilik aplikasi
menyetujui aturan final.
