<!-- src/routes/game.svelte - Halaman utama permainan misi pelajar -->
<script>
    import { userStore, completeMission } from "../../stores/user.js";
    import { missions } from "../../lib/missions.js";
    import Quiz from "../../lib/Quiz.svelte";

    import { onDestroy } from "svelte";
    import { get } from "svelte/store";

    let user = get(userStore);

    let unsubscribe = userStore.subscribe((value) => (user = value));
    onDestroy(() => unsubscribe());

    // Dapatkan data misi semasa berdasarkan progress pengguna
    let currentMissionData = missions.find((m) => m.id === user.currentMission);

    function handleAnswer(selectedOption) {
        if (!currentMissionData) return;
        const isCorrect = selectedOption === currentMissionData.answer;
        console.log(isCorrect);
        // Kemas kini kemajuan (markah & misi) menggunakan store function
        completeMission(isCorrect);
        if (isCorrect) {
            alert("Betul! Anda mendapat 10 mata 🏆");
        } else {
            alert("Jawapan kurang tepat. Sila cuba lagi.");
            // Pelajar boleh mencuba semula sehingga jawapan betul
        }
    }
</script>

{#if currentMissionData}
    <!-- Papar soalan misi semasa -->
    <h2>{currentMissionData.title}</h2>
    <p><em>{currentMissionData.description}</em></p>
    <!-- Komponen kuiz untuk soalan dan jawapan pelbagai pilihan -->
    <Quiz
        question={currentMissionData.question}
        options={currentMissionData.options}
        on:answer={handleAnswer}
    />

    <!-- Papar markah semasa dan lencana yang diperoleh -->
    <p>Skor: <b>{user.score}</b></p>
    <p>
        Lencana: {#each user.badges as badge, i}
            <span class="badge">{badge}</span>{i < user.badges.length - 1
                ? ", "
                : ""}
        {/each}
    </p>
{:else}
    <!-- Jika tiada misi semasa, bermakna semua misi telah diselesaikan -->
    <h2>Tahniah! 🎉 Anda telah menamatkan semua misi.</h2>
    <p>Skor akhir: <b>{user.score}</b></p>
    <p>Lencana terkumpul:</p>
    <ul>
        {#each user.badges as badge}
            <li>{badge}</li>
        {/each}
    </ul>
{/if}

<style>
    h2 {
        color: #2e6da4;
    }
    .badge {
        background: gold;
        padding: 0.2em 0.5em;
        border-radius: 4px;
        margin-right: 0.3em;
    }
</style>
