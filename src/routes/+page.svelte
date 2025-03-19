<!-- src/routes/index.svelte - Halaman Log Masuk -->
<script>
  import { userStore } from "../stores/user.js";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { onDestroy, onMount } from "svelte";

  let user = $state();

  userStore.subscribe((value) => {
    user = value;
  });

  onMount(() => {
    if (user.loggedIn) goto("/dashboard");
  });

  let username = $state();
  let password = $state();
  let role = "student";

  async function handleLogin() {
    if (user.name.length === 0) {
      user.name = username;
    }
    user.loggedIn = true;
    localStorage.setItem("userData", JSON.stringify(user));
    window.location.href = "/dashboard";
  }
</script>

<div class="w-full grid grid-cols-1 place-items-center h-full px-64 gap-8">
  <div class="w-full flex place-content-center">
    <div
      class="flex place-content-center overflow-clip border-2 border-primary-800 w-[400px] h-[400px] rounded-[50%]"
    >
      <img class="object-cover" src="/Dinosaur.svg" alt="Playful Children" />
    </div>
  </div>
  <form onsubmit={handleLogin}>
    <div class="w-full grid grid-cols-1 gap-4 place-items-center">
      <input
        bind:value={username}
        class="input-primary-lg w-120 border-0 focus:border-2 focus:border-primary-800"
        type="text"
        placeholder="Username"
        required
        aria-required="true"
      />
      <input
        bind:value={password}
        class="input-primary-lg w-120 border-0 focus:border-2 focus:border-primary-800"
        type="password"
        placeholder="Password"
        required
        aria-required="true"
      />
      <button
        type="submit"
        class="w-full text-size-2xl h-16 font-bold text-white mt-4 rounded-3xl bg-secondary-400 hover:scale-105 active:scale-100"
        >Masuk</button
      >
    </div>
  </form>
</div>
