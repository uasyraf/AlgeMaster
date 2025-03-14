// src/stores/user.js
import { writable } from 'svelte/store';

// Keadaan awal pengguna (belum log masuk atau mula bermain)
const defaultUser = {
  name: '',
  role: 'student',
  loggedIn: false,
  currentMission: 1,    // Misi semasa yang sedang dimainkan
  score: 0,             // Jumlah markah yang dikumpul
  badges: []            // Senarai lencana yang diperoleh
};

export const userStore = writable(defaultUser);

// Fungsi untuk dipanggil apabila pengguna menamatkan satu misi
export function completeMission(isCorrect) {
  userStore.update(user => {
    if (isCorrect) {
      // Jika jawapan misi adalah betul, tingkatkan markah dan misi
      user.score += 10;                   // +10 mata bagi setiap misi berjaya
      user.currentMission += 1;           // pergi ke misi seterusnya
      // Beri lencana jika memenuhi syarat (contoh: skor mencapai 50)
      if (user.score >= 50 && !user.badges.includes('Pencapaian Algebra Tahap 1')) {
        user.badges.push('Pencapaian Algebra Tahap 1');
      }
    }
    return user;
  });
}
