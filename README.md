# Kota Cloud — Roadmap

> Jalur pembelajaran resmi untuk anggota tim Kota Cloud.

**Live:** [roadmap.kotacloud.com](https://roadmap.kotacloud.com)

## Jalur yang tersedia

| Jalur | Status | Deskripsi |
|---|---|---|
| Hardware Security | ✅ Aktif | RPi + OS keamanan → produk DaaS |
| Platform (PaaS) | 🔜 Segera | Deployment platform Vercel-like |
| SATSET | 🔜 Segera | Kontribusi riset & open source |

## Struktur repo

```
src/
├── app/
│   ├── page.tsx          # Halaman utama roadmap
│   ├── layout.tsx        # Layout & metadata
│   └── globals.css       # Global styles
├── data/
│   └── roadmap.ts        # ← Edit di sini untuk update konten
└── components/
    └── roadmap/          # Komponen UI roadmap
```

## Update konten

Semua konten roadmap ada di **`src/data/roadmap.ts`** — satu file, satu sumber kebenaran.
Tidak perlu menyentuh komponen UI untuk menambah topik, mengubah deskripsi, atau menambah jalur baru.

## Menambah topik baru

```ts
// Di src/data/roadmap.ts, tambahkan node baru ke section yang sesuai:
{
  id: "d-eb3",
  type: "explore",           // "required" atau "explore"
  title: "Judul topik",
  description: "Deskripsi singkat topik ini.",
  concepts: ["konsep 1", "konsep 2", "konsep 3"],
  learnFlow: ["Baca", "Praktik", "Kuis", "Lanjut"],
  estimatedDays: 5,
}
```

## Setup lokal

```bash
git clone https://github.com/kotacloud/roadmap.git
cd roadmap
npm install
npm run dev
# Buka http://localhost:3000
```

## Deploy

Push ke branch `main` → GitHub Actions otomatis build & deploy ke GitHub Pages.

## Custom domain

Di repo → Settings → Pages → Custom domain → isi `roadmap.kotacloud.com`

Di DNS manager `kotacloud.com`, tambahkan:
```
CNAME  roadmap  kotacloud.github.io
```

---

© Kota Cloud · Internal use
