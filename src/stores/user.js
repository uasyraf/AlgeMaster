// src/stores/user.js
import { missions } from "$lib/missions";
import { writable, get } from "svelte/store";

const defaultUser = {
  name: "",
  role: "student",
  loggedIn: false,
  currentMission: 1,
  currentSubMission: 1,
  score: 0,
  badges: []
};

export const userStore = writable(defaultUser);

export function completeMission(isCorrect) {
  userStore.update(user => {
    if (isCorrect) {
      user.score += 10;


      let currentMission = missions.find((m) => m.id === user.currentMission);

      if (user.currentSubMission + 1 < currentMission.subMissions.length + 1) {
        user.currentSubMission++;
      } else {
        if (user.currentMission + 1 < missions.length + 1) {
          user.currentMission++;
          user.currentSubMission = 1;
        }
      }

      if (user.score >= 50 && !user.badges.includes("Pencapaian Algebra Tahap 1")) {
        user.badges.push("Pencapaian Algebra Tahap 1");
      }
    }
    return user;
  });
}

export function hasAccessToMission(missionId) {
  const user = get(userStore);
  return missionId <= user.currentMission;
}
