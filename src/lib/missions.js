// src/lib/missions.js
export const missions = [
  {
    id: 1,
    title: "SP 5.1.1: Pengenalan Pemboleh Ubah",
    description: "Memahami konsep pemboleh ubah serta menentukan nilai tetap atau berubah.",
    subMissions: [
      {
        id: 1,
        question: "Gunakan huruf untuk mewakilkan umur anda sekarang. Apakah sifat nilai pemboleh ubah tersebut?",
        options: ["Nilai tetap", "Nilai berubah"],
        answer: "Nilai tetap",
      },
      {
        id: 2,
        question: "Huruf m mewakili bilangan adik-beradik anda. Bilangan ini ialah...",
        options: ["Pemboleh ubah dengan nilai tetap", "Pemboleh ubah dengan nilai berubah"],
        answer: "Pemboleh ubah dengan nilai tetap",
      },
      {
        id: 3,
        question: "Wakilkan bilangan pensel dalam bekas pensel anda hari ini dengan huruf p.",
        options: ["Nilai tetap", "Nilai berubah"],
        answer: "Nilai berubah",
      },
      {
        id: 4,
        question: "Huruf t mewakili masa perjalanan dari rumah ke sekolah setiap hari. Apakah sifat pemboleh ubah t?",
        options: ["Nilai tetap", "Nilai berubah"],
        answer: "Nilai berubah",
      },
      {
        id: 5,
        question: "Wakilkan suhu dalam makmal sains sepanjang minggu dengan huruf s. Apakah jenis nilai pemboleh ubah ini?",
        options: ["Tetap", "Berubah"],
        answer: "Berubah",
      },
      {
        id: 6,
        question: "Huruf d mewakili jarak rumah Amran ke sekolah. Jarak ini ialah pemboleh ubah...",
        options: ["Nilai tetap", "Nilai berubah"],
        answer: "Nilai tetap",
      },
      {
        id: 7,
        question: "Jika k ialah kadar faedah simpanan tetap setahun di bank, maka k ialah...",
        options: ["Nilai tetap", "Nilai berubah"],
        answer: "Nilai tetap",
      },
      {
        id: 8,
        question: "Wakilkan harga sayur di pasar setiap hari dengan huruf h. Mengapakah h dianggap pemboleh ubah berubah?",
        options: ["Harga bergantung kepada musim dan bekalan", "Harga sentiasa kekal sepanjang tahun"],
        answer: "Harga bergantung kepada musim dan bekalan",
      },
      {
        id: 9,
        question: "Huruf x mewakili bilangan langkah yang diambil oleh pelajar sepanjang hari. Adakah x mempunyai nilai tetap atau berubah, dan kenapa?",
        options: ["Tetap – kerana pelajar mengikut rutin yang sama", "Berubah – kerana bilangan langkah berbeza setiap hari"],
        answer: "Berubah – kerana bilangan langkah berbeza setiap hari",
      },
      {
        id: 10,
        question: "Dalam satu kelas, huruf m mewakili markah setiap pelajar dalam ujian Matematik. Apa sifat pemboleh ubah m, dan mengapa?",
        options: ["Tetap – semua pelajar akan dapat markah yang sama", "Berubah – kerana prestasi pelajar adalah berbeza"],
        answer: "Berubah – kerana prestasi pelajar adalah berbeza",
      },
    ],
    // Standard Pembelajaran 5.1.1: menggunakan huruf untuk mewakili kuantiti tidak diketahui & menentukan sifatnya
  },
  {
    id: 2,
    title: "SP 5.1.2: Terbitkan Ungkapan Algebra",
    description: "Menterjemah situasi kepada ungkapan algebra yang betul.",
    subMissions: [
      {
        id: 1,
        question: "Tolak 8 daripada suatu nombor, n. Apakah ungkapan algebra yang mewakili situasi ini?",
        options: ["8 − n", "n − 8"],
        answer: "n − 8"
      },
      {
        id: 2,
        question: "Jumlah dua nombor, a dan b. Apakah ungkapan algebra yang betul?",
        options: ["a + b", "a × b"],
        answer: "a + b"
      },
      {
        id: 3,
        question: "Darab suatu nombor x dengan 5.",
        options: ["x + 5", "5x"],
        answer: "5x"
      },
      {
        id: 4,
        question: "Hasil tambah p dan q, kemudian dibahagi dengan 4.",
        options: ["p + q ÷ 4", "(p + q)/4"],
        answer: "(p + q)/4"
      },
      {
        id: 5,
        question: "Ali membeli k buku pada harga RMh setiap satu. Apakah jumlah bayaran Ali?",
        options: ["h + k", "hk"],
        answer: "hk"
      },
      {
        id: 6,
        question: "Jika 1 khemah boleh memuatkan 6 orang, berapakah jumlah orang untuk m khemah?",
        options: ["6m", "m + 6"],
        answer: "6m"
      },
      {
        id: 7,
        question: "Jumlah markah bagi dua ujian ialah x dan y. Cari purata markah.",
        options: ["x + y ÷ 2", "(x + y)/2"],
        answer: "(x + y)/2"
      },
      {
        id: 8,
        question: "Siti membeli m kg epal pada harga RMp sekilogram dan n kg oren pada harga RMq sekilogram. Cari jumlah bayaran.",
        options: ["mp + nq", "mp + nq + mn"],
        answer: "mp + nq"
      },
      {
        id: 9,
        question: "Umur Hafiz ialah h tahun. Umur adiknya ialah separuh umur Hafiz. Berapakah beza umur mereka?",
        options: ["h − 2", "h − ½h"],
        answer: "h − ½h"
      },
      {
        id: 10,
        question: "Farah membaca 5 muka surat sehari. Selepas d hari, berapa muka surat telah dibaca?",
        options: ["5 + d", "5d"],
        answer: "5d"
      },
    ],
    // Standard Pembelajaran 5.1.2: menerbitkan ungkapan algebra berdasarkan situasi
  },
  {
    id: 3,
    title: "SP 5.1.3: Menentukan Nilai Ungkapan Algebra",
    description: "Menentukan nilai ungkapan algebra apabila nilai pemboleh ubah diberi.",
    subMissions: [
      {
        id: 1,
        question: "Diberi x = 4, cari nilai bagi ungkapan 2x + 3.",
        options: ["11", "10"],
        answer: "11"
      },
      {
        id: 2,
        question: "Diberi a = 3, b = 2, cari nilai bagi ab + b.",
        options: ["8", "9"],
        answer: "8"
      },
      {
        id: 3,
        question: "Diberi p = 6, hitung nilai bagi 5p − 4.",
        options: ["26", "30"],
        answer: "26"
      },
      {
        id: 4,
        question: "Diberi m = 7, n = 2, cari nilai bagi 2m + 3n.",
        options: ["20", "23"],
        answer: "23"
      },
      {
        id: 5,
        question: "Zara membeli m = 3 buku pada harga RMp = 12 setiap satu. Hitung jumlah bayaran.",
        options: ["RM36", "RM15"],
        answer: "RM36"
      },
      {
        id: 6,
        question: "Jika x = 5 dan y = 4, hitung nilai bagi (x + y)/3.",
        options: ["3", "4"],
        answer: "3"
      },
      {
        id: 7,
        question: "Encik Faiz membeli r = 4 kg ikan dengan harga RMp = 7.50/kg. Hitung jumlah bayaran.",
        options: ["RM30.00", "RM29.50"],
        answer: "RM30.00"
      },
      {
        id: 8,
        question: "Aina membaca 6 muka surat sehari selama d = 5 hari. Hitung jumlah muka surat dibaca.",
        options: ["30", "25"],
        answer: "30"
      },
      {
        id: 9,
        question: "Diberi umur Hazim h = 14, dan umur adiknya ialah ½h. Berapakah beza umur mereka?",
        options: ["7 tahun", "10 tahun"],
        answer: "7 tahun"
      },
      {
        id: 10,
        question: "Dua orang pelajar membeli kad raya. Ali: m = 8 kad, p = RM1.50 sekeping. Abu: n = 6 kad, p = RM1.50 sekeping. Cari beza bayaran mereka.",
        options: ["RM3.00", "RM2.50"],
        answer: "RM3.00"
      },
    ],
    // Standard Pembelajaran 5.1.3: menentukan nilai ungkapan algebra apabila nilai pemboleh ubah diberi
  },
  {
    id: 4,
    title: "SP 5.1.4: Mengenal Pasti Sebutan Algebra",
    description: "Mengenal pasti sebutan dalam suatu ungkapan algebra dan menyatakan pekali yang mungkin.",
    subMissions: [
      {
        id: 1,
        question: "Kenal pasti bilangan sebutan bagi ungkapan algebra: 3x + 5",
        options: ["1", "2"],
        answer: "2"
      },
      {
        id: 2,
        question: "Dalam ungkapan 7a - 2b, apakah dua sebutannya?",
        options: ["7 dan -2", "7a dan 2b"],
        answer: "7a dan 2b"
      },
      {
        id: 3,
        question: "Dalam ungkapan x² + 6x + 9, berapakah jumlah sebutan algebra?",
        options: ["2", "3"],
        answer: "3"
      },
      {
        id: 4,
        question: "Dalam ungkapan 4m - 3n + 2, apakah pekali bagi m?",
        options: ["4", "-3"],
        answer: "4"
      },
      {
        id: 5,
        question: "Dalam ungkapan -6xy + 2x - y, nyatakan pekali bagi xy:",
        options: ["-6", "2"],
        answer: "-6"
      },
      {
        id: 6,
        question: "Dalam ungkapan (5pq)/2 - r, apakah pekali bagi pq?",
        options: ["5/2", "-r"],
        answer: "5/2"
      },
      {
        id: 7,
        question: "Dalam sebutan -9ab², apakah pekali bagi sebutan itu?",
        options: ["-9", "-b²"],
        answer: "-9"
      },
      {
        id: 8,
        question: "Dalam ungkapan 3x - (y/2) + 4z, nyatakan semua sebutan.",
        options: ["3x, y/2, 4z", "3x, y, z"],
        answer: "3x, y/2, 4z"
      },
      {
        id: 9,
        question: "Nyatakan pekali bagi y² dalam ungkapan -8xy².",
        options: ["-8x", "y²"],
        answer: "-8x"
      },
      {
        id: 10,
        question: "Dalam ungkapan 2a + 3b - 5c + 7, berapakah jumlah sebutan yang mempunyai pemboleh ubah?",
        options: ["3", "4"],
        answer: "3"
      },
    ],
    // Standard Pembelajaran 5.1.4: mengenal pasti sebutan dalam suatu ungkapan algebra & menyatakan pekali
  },
  {
    id: 5,
    title: "SP 5.1.5: Mengenal Pasti Sebutan Serupa dan Tidak Serupa",
    description: "Mengenal pasti sebutan serupa dan sebutan tidak serupa dalam ungkapan algebra.",
    subMissions: [
      {
        id: 1,
        question: "Adakah 3x dan -2x sebutan serupa?",
        options: ["Ya", "Tidak"],
        answer: "Ya"
      },
      {
        id: 2,
        question: "Adakah 4y dan y² sebutan serupa?",
        options: ["Ya", "Tidak"],
        answer: "Tidak"
      },
      {
        id: 3,
        question: "Adakah -k dan 0.5k sebutan serupa?",
        options: ["Ya", "Tidak"],
        answer: "Ya"
      },
      {
        id: 4,
        question: "Adakah ab dan ba sebutan serupa?",
        options: ["Ya", "Tidak"],
        answer: "Ya"
      },
      {
        id: 5,
        question: "Adakah 2mn dan 2nm² sebutan serupa?",
        options: ["Ya", "Tidak"],
        answer: "Tidak"
      },
      {
        id: 6,
        question: "Adakah 4pqr dan -10qrp sebutan serupa?",
        options: ["Ya", "Tidak"],
        answer: "Ya"
      },
      {
        id: 7,
        question: "Adakah 3ab/2 dan -8bc sebutan serupa?",
        options: ["Ya", "Tidak"],
        answer: "Tidak"
      },
      {
        id: 8,
        question: "Adakah 5x²y dan -3xy² sebutan serupa?",
        options: ["Ya", "Tidak"],
        answer: "Tidak"
      },
      {
        id: 9,
        question: "Adakah 7rst dan 11trs sebutan serupa?",
        options: ["Ya", "Tidak"],
        answer: "Ya"
      },
      {
        id: 10,
        question: "Adakah -xy²z dan 4zy²x sebutan serupa?",
        options: ["Ya", "Tidak"],
        answer: "Ya"
      },
    ],
    // Standard Pembelajaran 5.1.5: mengenal pasti sebutan serupa dan sebutan tidak serupa
  }
];
