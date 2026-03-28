// src/data/roadmap.ts
// Single source of truth untuk seluruh konten roadmap Kota Cloud
// Edit file ini untuk update konten tanpa menyentuh komponen UI

export type Status = "done" | "active" | "locked"
export type NodeType = "required" | "explore"

export interface LearnFlow {
  steps: string[]
}

export interface RoadmapNode {
  id: string
  type: NodeType
  title: string
  description: string
  concepts: string[]
  learnFlow: string[]
  estimatedDays?: number
}

export interface Checkpoint {
  id: string
  title: string
  subtitle: string
  passingScore: number
  sampleQuestions: string[]
}

export interface Section {
  id: string
  label: string
  sublabel?: string
  color: string // tailwind color token
  nodes: RoadmapNode[]
  checkpoint?: Checkpoint
}

export interface Track {
  id: string
  title: string
  description: string
  totalWeeks: string
  totalTopics: number
  certificates: number
  sections: Section[]
}

export const hardwareTrack: Track = {
  id: "hardware",
  title: "Hardware Security",
  description:
    "Dari nol hingga mampu memahami, mengonfigurasi, dan mendeploy perangkat keamanan jaringan berbasis Raspberry Pi — fondasi produk DaaS Kota Cloud.",
  totalWeeks: "±6 bulan",
  totalTopics: 18,
  certificates: 2,

  sections: [
    // ─── FONDASI GLOBAL WAJIB ────────────────────────────────────────────────
    {
      id: "fondasi-global",
      label: "Fondasi wajib global",
      sublabel: "Harus dikuasai sebelum masuk jalur manapun",
      color: "blue",
      nodes: [
        {
          id: "fg-1",
          type: "required",
          title: "Cara kerja komputer & sistem operasi",
          description:
            "Memahami CPU, memori, storage, proses, dan bagaimana OS mengelola semua itu. Ini landasan agar perintah Linux tidak terasa seperti mantra.",
          concepts: ["CPU & memory model", "proses & thread", "syscall", "virtual memory", "file descriptor"],
          learnFlow: ["Baca konsep", "Amati sistem nyata", "Kuis", "Lanjut"],
          estimatedDays: 5,
        },
        {
          id: "fg-2",
          type: "required",
          title: "Linux & navigasi terminal",
          description:
            "Filosofi Linux, hierarki filesystem, perintah dasar, permission model, dan cara berpikir 'everything is a file'. Bukan sekadar hafal perintah — paham alasannya.",
          concepts: ["filesystem hierarchy", "permission & ownership", "stdin/stdout/stderr", "pipe & redirect", "bash scripting"],
          learnFlow: ["Baca konsep", "Praktik di terminal", "Kuis", "Lanjut"],
          estimatedDays: 10,
        },
        {
          id: "fg-3",
          type: "required",
          title: "Bagaimana jaringan komputer bekerja",
          description:
            "Model TCP/IP dari bawah ke atas — bukan hafal layer, tapi paham bagaimana paket bergerak dari perangkat A ke B, dan apa yang bisa salah di setiap langkah.",
          concepts: ["TCP/IP stack", "IP & subnetting", "DNS & DHCP", "routing", "packet flow"],
          learnFlow: ["Baca konsep", "Simulasi packet flow", "Kuis", "Lanjut"],
          estimatedDays: 7,
        },
        {
          id: "fg-4",
          type: "required",
          title: "Konsep dasar keamanan siber",
          description:
            "CIA triad, attack surface, threat model, defense in depth. Memahami cara berpikir attacker sebelum bisa berpikir sebagai defender.",
          concepts: ["CIA triad", "attack surface", "threat modeling", "defense in depth", "zero trust"],
          learnFlow: ["Baca konsep", "Analisis kasus nyata", "Kuis", "Lanjut"],
          estimatedDays: 5,
        },
      ],
      checkpoint: {
        id: "cp-fondasi",
        title: "Checkpoint — Kuis Fondasi",
        subtitle: "Lulus minimum 80% untuk membuka jalur eksplorasi",
        passingScore: 80,
        sampleQuestions: [
          "Apa perbedaan proses dan thread dalam konteks sistem operasi?",
          "Jelaskan apa yang terjadi ketika kamu mengetik 'ls -la' di terminal.",
          "Bagaimana sebuah paket data menemukan jalannya dari laptop kamu ke server google.com?",
          "Apa yang dimaksud dengan attack surface dan mengapa perlu diperkecil?",
        ],
      },
    },

    // ─── JALUR A: OS & HARDENING ─────────────────────────────────────────────
    {
      id: "jalur-a",
      label: "Jalur A — OS & hardening",
      sublabel: "Eksplorasi bebas pilih",
      color: "purple",
      nodes: [
        {
          id: "a1",
          type: "explore",
          title: "Anatomy sistem operasi Linux",
          description:
            "Kernel space vs user space, syscall, proses, dan bagaimana OS membatasi akses antar komponen.",
          concepts: ["kernel vs userspace", "syscall interface", "namespaces", "cgroups", "strace"],
          learnFlow: ["Baca", "Praktik strace", "Kuis", "Lanjut"],
          estimatedDays: 7,
        },
        {
          id: "a2",
          type: "explore",
          title: "Prinsip hardening & attack surface reduction",
          description:
            "Mengapa dan bagaimana memperkecil celah serangan — bukan sekadar menjalankan checklist, tapi memahami logika di balik setiap langkah hardening.",
          concepts: ["least privilege", "service minimization", "SSH hardening", "sysctl tuning", "CIS Benchmark"],
          learnFlow: ["Baca", "Audit sistem", "Kuis", "Lanjut"],
          estimatedDays: 10,
        },
        {
          id: "a3",
          type: "explore",
          title: "Mandatory access control",
          description:
            "AppArmor dan SELinux — cara OS membatasi hak proses bahkan setelah sistem disusupi.",
          concepts: ["AppArmor profiles", "SELinux contexts", "mandatory vs discretionary", "confinement", "aa-status"],
          learnFlow: ["Baca", "Tulis profil AppArmor", "Kuis", "Lanjut"],
          estimatedDays: 7,
        },
      ],
    },

    // ─── JALUR B: JARINGAN & ENKRIPSI ────────────────────────────────────────
    {
      id: "jalur-b",
      label: "Jalur B — Jaringan & enkripsi",
      sublabel: "Eksplorasi bebas pilih",
      color: "teal",
      nodes: [
        {
          id: "b1",
          type: "explore",
          title: "Cara kerja firewall & packet filtering",
          description:
            "Bagaimana keputusan allow/deny dibuat di level paket — stateful vs stateless, connection tracking, dan netfilter.",
          concepts: ["stateful firewall", "iptables / nftables", "connection tracking", "netfilter hooks", "DMZ"],
          learnFlow: ["Baca", "Tulis iptables rules", "Kuis", "Lanjut"],
          estimatedDays: 7,
        },
        {
          id: "b2",
          type: "explore",
          title: "Cara kerja VPN & enkripsi tunnel",
          description:
            "Kriptografi asimetris, key exchange, dan bagaimana tunnel VPN melindungi data — lalu implementasinya dengan WireGuard.",
          concepts: ["asymmetric crypto", "Diffie-Hellman", "WireGuard", "tunnel interface", "DNS leak"],
          learnFlow: ["Baca", "Setup WireGuard", "Kuis", "Lanjut"],
          estimatedDays: 10,
        },
      ],
    },

    // ─── JALUR C: DETEKSI ANCAMAN ─────────────────────────────────────────────
    {
      id: "jalur-c",
      label: "Jalur C — Deteksi ancaman",
      sublabel: "Eksplorasi bebas pilih",
      color: "coral",
      nodes: [
        {
          id: "c1",
          type: "explore",
          title: "Cara kerja intrusion detection",
          description:
            "Signature-based vs anomaly-based detection — perbedaan mendasar dan implikasinya. Fondasi untuk memahami mengapa SATSET menggunakan pendekatan SNN.",
          concepts: ["signature-based IDS", "anomaly-based IDS", "Suricata rules", "false positive/negative", "SATSET context"],
          learnFlow: ["Baca", "Analisis Suricata alert", "Kuis", "Lanjut"],
          estimatedDays: 10,
        },
        {
          id: "c2",
          type: "explore",
          title: "Log analysis & membaca tanda serangan",
          description:
            "Bagaimana membaca log sistem dan jaringan untuk menemukan pola mencurigakan — skill inti seorang defender.",
          concepts: ["syslog", "auditd", "log correlation", "IOC (Indicator of Compromise)", "fail2ban"],
          learnFlow: ["Baca", "Analisis log nyata", "Kuis", "Lanjut"],
          estimatedDays: 7,
        },
      ],
    },

    // ─── JALUR D: EDGE DEVICE ─────────────────────────────────────────────────
    {
      id: "jalur-d",
      label: "Jalur D — Edge device & Raspberry Pi",
      sublabel: "Sebagian wajib, sebagian eksplorasi",
      color: "amber",
      nodes: [
        // Wajib
        {
          id: "d-w1",
          type: "required",
          title: "Anatomi hardware Raspberry Pi",
          description:
            "Memahami apa yang ada di dalam papan RPi — SoC, GPIO header, port USB, slot microSD, dan bagaimana semua komponen ini terhubung.",
          concepts: ["SoC ARM Cortex", "GPIO header", "microSD storage", "power rail 3.3V/5V", "thermal throttling"],
          learnFlow: ["Baca skematik RPi", "Identifikasi komponen fisik", "Kuis", "Lanjut"],
          estimatedDays: 3,
        },
        {
          id: "d-w2",
          type: "required",
          title: "Boot process — dari power ON ke OS siap",
          description:
            "Apa yang terjadi dalam hitungan detik setelah RPi dinyalakan — GPU bootloader, kernel loading, init system, sampai OS siap.",
          concepts: ["GPU bootloader stage 1–3", "config.txt & cmdline.txt", "kernel & device tree", "systemd init", "firstboot service"],
          learnFlow: ["Baca urutan boot", "Amati boot log nyata", "Kuis", "Lanjut"],
          estimatedDays: 4,
        },
        {
          id: "d-w3",
          type: "required",
          title: "Keterbatasan resource & implikasinya",
          description:
            "Edge device bukan server — RAM terbatas, storage lambat, dan bisa mati listrik kapan saja. Keterbatasan ini menentukan seluruh desain sistem.",
          concepts: ["RAM & swap tradeoff", "CPU throttling", "SD card write endurance", "power failure & fs corruption", "offline-first"],
          learnFlow: ["Baca konsep", "Benchmark RPi nyata", "Kuis", "Lanjut"],
          estimatedDays: 3,
        },
        // Eksplorasi
        {
          id: "d-ea1",
          type: "explore",
          title: "GPIO — cara RPi berbicara ke dunia fisik",
          description:
            "Bagaimana pin GPIO bekerja sebagai input/output digital — relevan untuk indikator fisik perangkat Kota Cloud.",
          concepts: ["digital in/out", "pull-up/pull-down", "BCM vs BOARD numbering", "PWM dasar"],
          learnFlow: ["Baca konsep", "Praktik LED & tombol", "Kuis", "Lanjut"],
          estimatedDays: 3,
        },
        {
          id: "d-ea2",
          type: "explore",
          title: "I2C & SPI — komunikasi ke sensor & modul",
          description:
            "Protokol bus serial untuk menghubungkan RPi ke sensor. I2C untuk banyak perangkat di 2 kabel, SPI untuk kecepatan lebih tinggi.",
          concepts: ["I2C address & bus", "SPI clock & chip select", "i2cdetect", "master-slave topology"],
          learnFlow: ["Baca konsep", "Hubungkan sensor nyata", "Kuis", "Lanjut"],
          estimatedDays: 4,
        },
        {
          id: "d-ea3",
          type: "explore",
          title: "UART — serial console & debugging hardware",
          description:
            "UART adalah jendela paling primitif ke dalam sistem — dipakai saat boot hang atau SSH tidak bisa diakses. Skill debugging kritis untuk produksi.",
          concepts: ["baud rate", "TX/RX lines", "serial console RPi", "USB-to-TTL adapter"],
          learnFlow: ["Baca konsep", "Akses console via UART", "Kuis", "Lanjut"],
          estimatedDays: 3,
        },
        {
          id: "d-eb1",
          type: "explore",
          title: "Optimasi performa sistem di edge",
          description:
            "Cara memaksimalkan performa RPi dalam keterbatasan — tuning swap, zram, cgroups untuk membatasi resource per service.",
          concepts: ["zram & swap", "cgroups v2", "htop & vmstat", "CPU governor", "memory overcommit"],
          learnFlow: ["Baca konsep", "Benchmark & tuning", "Kuis", "Lanjut"],
          estimatedDays: 5,
        },
        {
          id: "d-eb2",
          type: "explore",
          title: "Storage reliability & proteksi filesystem",
          description:
            "SD card adalah titik lemah RPi — rentan corrupt kalau mati listrik tiba-tiba. Read-only filesystem dan overlayfs adalah jawabannya.",
          concepts: ["read-only rootfs", "overlayfs", "ext4 journaling", "f2fs untuk SD card", "watchdog timer"],
          learnFlow: ["Baca konsep", "Simulasi power failure", "Kuis", "Lanjut"],
          estimatedDays: 5,
        },
      ],
      checkpoint: {
        id: "cp-edge",
        title: "Checkpoint — Kuis Edge Device",
        subtitle: "Topik wajib D + minimal 1 sub-jalur eksplorasi selesai",
        passingScore: 75,
        sampleQuestions: [
          "Apa yang terjadi dalam 3 detik pertama setelah Raspberry Pi dinyalakan?",
          "Mengapa SD card lebih rentan rusak dibanding SSD pada edge device?",
          "Apa perbedaan fundamental I2C dan SPI dalam hal topologi dan kecepatan?",
          "Bagaimana overlayfs melindungi filesystem dari power failure tiba-tiba?",
        ],
      },
    },
  ],
}
