import { G as escape_html, D as pop, A as push } from "../../../../../chunks/index.js";
import "clsx";
import { u as userStore } from "../../../../../chunks/user.js";
import { o as onDestroy } from "../../../../../chunks/index-server.js";
import "../../../../../chunks/client.js";
function _page($$payload, $$props) {
  push();
  let user = void 0;
  let unsubscribe = userStore.subscribe((value) => user = value);
  onDestroy(() => {
    unsubscribe();
  });
  $$payload.out += `<div class="flex flex-col place-items-center gap-8 h-full"><div class="cloud w-[30vw] p-6 rounded-[8rem] bg-white mb-16 svelte-nuuy6r"><div class="flex gap-4 place-content-center min-w-[80%]"><div class="flex place-items-center gap-2"><img class="size-6" src="/Score.png" alt="Skor"> <p>${escape_html(user.score)}</p></div> <div class="flex place-items-center gap-2"><img class="size-6" src="/trophy.png" alt="Trophies"> <p>${escape_html(user.badges.length)}</p></div></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
