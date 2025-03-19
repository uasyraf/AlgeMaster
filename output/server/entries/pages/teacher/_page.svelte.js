import { K as ensure_array_like, G as escape_html, D as pop, A as push } from "../../../chunks/index.js";
import { u as userStore } from "../../../chunks/user.js";
function _page($$payload, $$props) {
  push();
  let user;
  userStore.subscribe((val) => user = val);
  let studentsData = [
    {
      name: "Ali",
      currentMission: 3,
      score: 30,
      badges: ["Pencapaian Algebra Tahap 1"]
    },
    {
      name: "Bala",
      currentMission: 2,
      score: 20,
      badges: []
    },
    {
      name: "Chong",
      currentMission: 2,
      score: 20,
      badges: []
    },
    {
      name: "Dewi",
      currentMission: 1,
      score: 10,
      badges: []
    }
  ];
  if (user.role !== "teacher") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p><i>Akses terhad. Sila log masuk sebagai guru untuk melihat data.</i></p>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(studentsData);
    $$payload.out += `<h2>Dashboard Guru</h2> <table class="svelte-n2xyu1"><thead><tr><th class="svelte-n2xyu1">Nama Pelajar</th><th class="svelte-n2xyu1">Misi Semasa</th><th class="svelte-n2xyu1">Skor</th><th class="svelte-n2xyu1">Lencana</th></tr></thead><tbody><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let stud = each_array[$$index_1];
      $$payload.out += `<tr><td class="svelte-n2xyu1">${escape_html(stud.name)}</td><td class="svelte-n2xyu1">Misi ${escape_html(stud.currentMission)}</td><td class="svelte-n2xyu1">${escape_html(stud.score)}</td><td class="svelte-n2xyu1">`;
      if (stud.badges.length === 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `–`;
      } else {
        $$payload.out += "<!--[!-->";
        const each_array_1 = ensure_array_like(stud.badges);
        $$payload.out += `<!--[-->`;
        for (let i = 0, $$length2 = each_array_1.length; i < $$length2; i++) {
          let b = each_array_1[i];
          $$payload.out += `<!---->${escape_html(b)}${escape_html(i < stud.badges.length - 1 ? ", " : "")}`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></td></tr>`;
    }
    $$payload.out += `<!--]--></tbody></table> <p style="margin-top:1em;"><small>* Guru boleh menambah latihan tambahan atau soalan baru untuk
            pelajar melalui modul ini (ciri lanjutan).</small></p>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
