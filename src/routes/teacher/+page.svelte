<!-- src/routes/teacher.svelte - Dashboard untuk Guru -->
<script>
    import { userStore } from "../stores/user.js";
    let user;
    userStore.subscribe((val) => (user = val));

    // Data pelajar contoh (dalam aplikasi sebenar, data ini mungkin ditarik dari pangkalan data)
    let studentsData = [
        {
            name: "Ali",
            currentMission: 3,
            score: 30,
            badges: ["Pencapaian Algebra Tahap 1"],
        },
        { name: "Bala", currentMission: 2, score: 20, badges: [] },
        { name: "Chong", currentMission: 2, score: 20, badges: [] },
        { name: "Dewi", currentMission: 1, score: 10, badges: [] },
    ];
</script>

{#if user.role !== "teacher"}
    <p><i>Akses terhad. Sila log masuk sebagai guru untuk melihat data.</i></p>
{:else}
    <h2>Dashboard Guru</h2>
    <table>
        <thead>
            <tr
                ><th>Nama Pelajar</th><th>Misi Semasa</th><th>Skor</th><th
                    >Lencana</th
                ></tr
            >
        </thead>
        <tbody>
            {#each studentsData as stud}
                <tr>
                    <td>{stud.name}</td>
                    <td>Misi {stud.currentMission}</td>
                    <td>{stud.score}</td>
                    <td>
                        {#if stud.badges.length === 0}
                            –
                        {:else}
                            {#each stud.badges as b, i}
                                {b}{i < stud.badges.length - 1 ? ", " : ""}
                            {/each}
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    <p style="margin-top:1em;">
        <small
            >* Guru boleh menambah latihan tambahan atau soalan baru untuk
            pelajar melalui modul ini (ciri lanjutan).</small
        >
    </p>
{/if}

<style>
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1em;
    }
    th,
    td {
        border: 1px solid #ccc;
        padding: 0.5em;
        text-align: center;
    }
    th {
        background: #ddd;
    }
</style>
