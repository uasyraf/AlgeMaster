<!-- src/routes/__layout.svelte (layout global untuk seluruh app) -->
<script>
  import "../app.css";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { userStore } from "../stores/user.js";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import AudioPermission from "../lib/components/AudioPermission.svelte";

  let { children } = $props();
  let user = $state();
  let hasMounted = $state(false);

  userStore.subscribe((value) => {
    user = value;
  });

  onMount(() => {
    if (browser) {
      const saved = localStorage.getItem("userData");

      if (saved) {
        userStore.set(JSON.parse(saved));
        if (user.name.length === 0) {
          localStorage.setItem("userData", JSON.stringify(user));
        }
      }

      console.log("gag", page.route.id);
      console.log(base);

      if (!user.loggedIn && base + page.route.id !== base + "/")
        window.location.href = base + "/";
    }
    hasMounted = true;
  });

  async function handleLogout() {
    user.loggedIn = false;
    localStorage.setItem("userData", JSON.stringify(user));
    window.location.href = base + "/";
  }
</script>

<AudioPermission />

<div class="flex flex-col min-h-screen">
  <header>
    <div class="flex flex-col place-items-center">
      <div>
        <h1 class="font-fun">
          <span class="text-5xl">🎮</span>
          <span class="text-5xl text-calm-orange">A</span>
          <span class="text-5xl text-calm-green">l</span>
          <span class="text-5xl text-calm-purple">g</span>
          <span class="text-5xl text-calm-blue">e</span>
          <span class="text-5xl text-calm-yellow">M</span>
          <span class="text-5xl text-calm-green">a</span>
          <span class="text-5xl text-calm-purple">s</span>
          <span class="text-5xl text-calm-blue">t</span>
          <span class="text-5xl text-calm-yellow">e</span>
          <span class="text-5xl text-calm-green">r</span>
        </h1>
      </div>
      <div>
        {#if user.loggedIn}
          {#if base + page.route.id === base + "/dashboard"}
            <h1>Laman Utama</h1>
          {:else if base + page.route.id === base + "/standard-pembelajaran/[slug]/games"}
            <h1 class="text-white">Permainan</h1>
          {:else if base + page.route.id === base + "/standard-pembelajaran/[slug]/notes"}
            <h1>Pembelajaran</h1>
          {:else if base + page.route.id === base + "/teacher"}
            <h1>Teacher</h1>
          {/if}
        {/if}
      </div>
    </div>
  </header>

  <main>
    {#if hasMounted}
      {@render children()}
    {/if}
  </main>

  <footer class="flex place-content-center mt-auto">
    {#if user.loggedIn}
      <nav
        class="text-black bg-secondary-100 w-[50%] rounded-3xl overflow-clip border-2 fixed bottom-10 z-80"
      >
        <ul class="flex">
          <li class="w-full p-4">
            <a href="{base}/dashboard" class="hover:text-gray-400">
              <p class="text-center">Rumah</p>
            </a>
          </li>
          <li class="w-full p-4">
            <a
              href="{base}/standard-pembelajaran/{user.currentMission}/notes"
              class="hover:text-gray-400"
            >
              <p class="text-center">Belajar</p>
            </a>
          </li>
          <li class="w-full p-4">
            <a
              href="{base}/standard-pembelajaran/{user.currentMission}/games"
              class="hover:text-gray-400"
            >
              <p class="text-center">Bermain</p>
            </a>
          </li>
          <li class="w-full p-4">
            <button
              type="button"
              class="hover:text-gray-400"
              onclick={handleLogout}
            >
              <p class="text-center">Logout</p>
            </button>
          </li>
        </ul>
      </nav>
    {/if}
  </footer>
</div>
