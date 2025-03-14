<!-- src/routes/__layout.svelte (layout global untuk seluruh app) -->
<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { userStore } from '../stores/user.js';
    let user;
    userStore.subscribe(value => { user = value; });

    onMount(() => {
      // Mendapatkan data kemajuan dari localStorage (jika ada) supaya kemajuan tersimpan di antara sesi
      if (browser) {
        const saved = localStorage.getItem('userData');
        if (saved) {
          userStore.set(JSON.parse(saved));
        }
        // Simpan setiap perubahan data user ke localStorage
        userStore.subscribe(val => {
          localStorage.setItem('userData', JSON.stringify(val));
        });
      }
    });
  </script>

  <header>
    <h1>🎮 AlgeMaster: Algebra Made Easy</h1>
    {#if user.loggedIn}
      <nav>
        <a href="/game">Permainan</a>
        <a href="/learn">Nota & Tutorial</a>
        {#if user.role === 'teacher'}
          <a href="/teacher">Dashboard Guru</a>
        {:else}
          <a href="/profile">Profil Pelajar</a>
        {/if}
        <span class="user-info">👤 {user.name} ({user.role})</span>
      </nav>
    {/if}
  </header>

  <slot />  <!-- Ruangan untuk memuatkan kandungan halaman semasa -->

  <style>
    header {
      background: #f8b400; /* warna jingga cerah */
      padding: 1em;
      text-align: center;
    }
    header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 1.5em;
    }
    nav {
      margin-top: 0.5em;
    }
    nav a {
      margin: 0 1em;
      text-decoration: none;
      color: #fff;
      font-weight: bold;
    }
    .user-info {
      margin-left: 2em;
      color: #fff;
      font-style: italic;
    }
  </style>
    