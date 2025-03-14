<!-- src/routes/index.svelte - Halaman Log Masuk -->
<script>
    import { userStore } from '../stores/user.js';
    import { goto } from '$app/navigation';
    let username = "";
    let password = "";
    let role = "student";  // peranan default yang dipilih

    function handleLogin() {
      // (Nota: Kod ini hanya simulasi. Dalam aplikasi sebenar, semakan kata laluan/peranan dibuat di server)
      userStore.set({
        name: username,
        role: role,
        loggedIn: true,
        currentMission: 1,
        score: 0,
        badges: []
      });
      // Arahkan pengguna ke halaman sesuai selepas log masuk
      if (role === 'teacher') {
        goto('/teacher');   // guru ke dashboard guru
      } else {
        goto('/game');      // pelajar ke halaman permainan
      }
    }
  </script>

  <main>
    <h2>Log Masuk</h2>
    <form on:submit|preventDefault={handleLogin}>
      <div>
        <label>Nama Pengguna:</label>
        <input bind:value={username} type="text" required placeholder="Masukkan nama"/>
      </div>
      <div>
        <label>Kata Laluan:</label>
        <input bind:value={password} type="password" required placeholder="Masukkan kata laluan"/>
      </div>
      <div>
        <label>Log masuk sebagai:</label>
        <select bind:value={role}>
          <option value="student">Pelajar</option>
          <option value="teacher">Guru</option>
        </select>
      </div>
      <button type="submit">Masuk</button>
    </form>
  </main>

  <main>
    
  </main>

  <style>
    main { max-width: 400px; margin: 2em auto; background: #eef; padding: 1em; border-radius: 8px; }
    h2 { text-align: center; color: #333; }
    label { display: block; margin: 0.5em 0 0.2em; }
    input, select { width: 100%; padding: 0.5em; margin-bottom: 1em; }
    button { width: 100%; padding: 0.6em; background: #4CAF50; color: white; border: none; border-radius: 4px; font-size: 1em; }
  </style>
