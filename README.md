# Gen Store

Gen Store adalah aplikasi e-commerce sederhana yang dibangun menggunakan ReactJS dan Redux Toolkit. Project ini dirancang untuk memenuhi kebutuhan pengguna yang ingin membeli produk digital dengan mudah dan cepat.

## Fitur Utama

- **Autentikasi Pengguna**: Login dan logout untuk mengamankan data pengguna.
- **Daftar Produk**: Menampilkan daftar produk dengan informasi stok yang tersedia.
- **Keranjang Belanja**: Tambah, ubah, dan hapus item dari keranjang.
- **Checkout**: Mengosongkan keranjang setelah transaksi selesai.
- **Pengurangan Stok**: Stok produk akan otomatis berkurang setelah pembelian.

## Teknologi yang Digunakan

- **Frontend**: ReactJS, React Router, Bootstrap
- **State Management**: Redux Toolkit
- **Backend**: REST API menggunakan axios (simulasi melalui environment variable)

## Struktur Folder

```
.
├── src
│   ├── components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ProductList.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── LoginPage.jsx
│   │   ├── CartPage.jsx
│   │   └── DetailPage.jsx
│   ├── redux
│   │   ├── reducers
│   │   │   ├── authReducer.js
│   │   │   ├── cartReducer.js
│   │   │   └── productReducer.js
│   │   └── Store.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
└── README.md
```

## Instalasi dan Menjalankan Proyek

1. Clone repositori ini:
   ```bash
   git clone https://github.com/fajarsikumbang/FP_genStore_MSIB7.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd gen-store
   ```
3. Instal dependensi:
   ```bash
   npm install
   ```
4. Tambahkan file `.env` untuk URL API:
   ```env
   REACT_APP_API_URL=https://api.example.com/products
   ```
5. Jalankan aplikasi:
   ```bash
   npm start
   ```
6. Buka di browser:
   ```
   http://localhost:3000
   ```

## Cara Penggunaan

1. **Login**: Masuk ke halaman login untuk autentikasi.
2. **Pilih Produk**: Telusuri daftar produk pada halaman utama.
3. **Tambah ke Keranjang**: Pilih produk yang diinginkan dan tambahkan ke keranjang.
4. **Lakukan Checkout**: Selesaikan pembelian dan periksa pengurangan stok produk.

## Kontributor

- **Fajar Maulana** - Frontend Developer

## Lisensi

Project ini menggunakan lisensi [MIT](LICENSE).
