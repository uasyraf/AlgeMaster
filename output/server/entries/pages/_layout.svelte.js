import { E as attr, F as stringify, D as pop, A as push } from "../../chunks/index.js";
import { u as userStore } from "../../chunks/user.js";
import { p as page } from "../../chunks/index3.js";
import "../../chunks/client.js";
function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  let user = void 0;
  userStore.subscribe((value) => {
    user = value;
  });
  $$payload.out += `<div class="flex flex-col min-h-screen"><header><div class="flex flex-col place-items-center"><div><h1 class="font-fun"><span class="text-5xl">🎮</span> <span class="text-5xl text-calm-orange">A</span> <span class="text-5xl text-calm-green">l</span> <span class="text-5xl text-calm-purple">g</span> <span class="text-5xl text-calm-blue">e</span> <span class="text-5xl text-calm-yellow">M</span> <span class="text-5xl text-calm-green">a</span> <span class="text-5xl text-calm-purple">s</span> <span class="text-5xl text-calm-blue">t</span> <span class="text-5xl text-calm-yellow">e</span> <span class="text-5xl text-calm-green">r</span></h1></div> <div>`;
  if (user.loggedIn) {
    $$payload.out += "<!--[-->";
    if (page.route.id === "/dashboard") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<h1>Laman Utama</h1>`;
    } else if (page.route.id === "/standard-pembelajaran/[slug]/games") {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<h1 class="text-white">Permainan</h1>`;
    } else if (page.route.id === "/standard-pembelajaran/[slug]/notes") {
      $$payload.out += "<!--[2-->";
      $$payload.out += `<h1>Pembelajaran</h1>`;
    } else if (page.route.id === "/teacher") {
      $$payload.out += "<!--[3-->";
      $$payload.out += `<h1>Teacher</h1>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></header> <main>`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></main> <footer class="flex place-content-center mt-auto">`;
  if (user.loggedIn) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<nav class="text-black bg-secondary-100 w-[50%] rounded-3xl overflow-clip border-2 fixed bottom-10 z-80"><ul class="flex"><li class="w-full p-4"><a href="/dashboard" class="hover:text-gray-400"><p class="text-center">Rumah</p></a></li> <li class="w-full p-4"><a${attr("href", `/standard-pembelajaran/${stringify(user.currentMission)}/notes`)} class="hover:text-gray-400"><p class="text-center">Belajar</p></a></li> <li class="w-full p-4"><a${attr("href", `/standard-pembelajaran/${stringify(user.currentMission)}/games`)} class="hover:text-gray-400"><p class="text-center">Bermain</p></a></li> <li class="w-full p-4"><button type="button" class="hover:text-gray-400"><p class="text-center">Logout</p></button></li></ul></nav>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></footer></div>`;
  pop();
}
export {
  _layout as default
};
