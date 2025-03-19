import { w as writable, g as get } from "./index2.js";
const defaultUser = {
  name: "",
  role: "student",
  loggedIn: false,
  currentMission: 1,
  currentSubMission: 1,
  score: 0,
  badges: []
};
const userStore = writable(defaultUser);
function hasAccessToMission(missionId) {
  const user = get(userStore);
  return missionId <= user.currentMission;
}
export {
  hasAccessToMission as h,
  userStore as u
};
