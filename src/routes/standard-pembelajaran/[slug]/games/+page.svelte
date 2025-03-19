<!-- src/routes/game.svelte - Halaman utama permainan misi pelajar -->
<script>
    import { userStore, completeMission } from "../../../../stores/user.js";
    import { missions } from "../../../../lib/missions.js";
    import { page } from "$app/stores";
    import { onDestroy, onMount } from "svelte";
    import { get } from "svelte/store";
    import { base } from "$app/paths";

    let user = $state();
    let currentMission = $state();
    let currentSubMission = $state();
    let selected = $state();

    let unsubscribe = userStore.subscribe((value) => (user = value));

    onMount(() => {
        let current = document.body.style["background-image"];
        document.body.style["background-image"] =
            `url('${base}/pohon-ilmu.png')`;
        setMission();
        setSubmission();
        return () => (document.body.style["background-image"] = current);
    });

    onDestroy(() => {
        unsubscribe();
    });

    function setMission() {
        currentMission = missions.find((m) => m.id === user.currentMission);
    }

    function setSubmission() {
        currentSubMission = currentMission?.subMissions.find(
            (s) => s.id === user.currentSubMission,
        );
    }

    function handleAnswer(selectedOption) {
        if (!currentSubMission) return;

        const isCorrect = selectedOption === currentSubMission.answer;
        completeMission(isCorrect);

        localStorage.setItem("userData", JSON.stringify(user));
        setMission();
        setSubmission();

        if (isCorrect) {
            alert("Jawapan anda betul! ");
            if (
                user.currentSubMission >
                currentMission.subMissions.length + 1
            ) {
                alert("Tahniah! Anda telah menamatkan misi ini.");
                window.location.href = base + "/dashboard";
            }
        } else {
            alert("Cuba lagi!");
        }
    }
</script>

<div class="flex flex-col place-items-center gap-8 h-full">
    <div class="cloud w-[30vw] p-6 rounded-[8rem] bg-white mb-16">
        <div class="flex gap-4 place-content-center min-w-[80%]">
            <div class="flex place-items-center gap-2">
                <img class="size-6" src="{base}/Score.png" alt="Skor" />
                <p>
                    {user.score}
                </p>
            </div>
            <div class="flex place-items-center gap-2">
                <img class="size-6" src="{base}/trophy.png" alt="Trophies" />
                <p>
                    {user.badges.length}
                </p>
            </div>
        </div>
    </div>
    {#if currentSubMission}
        <div class="grid place-items-center cloud w-[30vw] p-6 rounded-[8rem]">
            <div class="min-w-[80%]">
                <h5 class="!text-[0.75rem] text-center">
                    {currentMission.title}
                </h5>
                <p class="!text-[0.75rem]">
                    {currentSubMission.question}
                </p>
            </div>
        </div>
        <div class="grid grid-cols-2 place-items-center gap-8">
            {#each currentSubMission.options as option}
                <button
                    onclick={() => (selected = option)}
                    class="min-w-[15vw] cloud p-6 rounded-[8rem] !text-[0.75rem] text-center hover:scale-105 active:scale-100"
                >
                    <span>
                        {option}
                    </span>
                    {#if selected === option}
                        <span>✅</span>
                    {/if}
                </button>
            {/each}
        </div>
        <button
            onclick={() => handleAnswer(selected)}
            type="button"
            class="pr-16 pl-16 text-size-2xl h-16 font-bold text-white mt-4 rounded-[8rem] bg-secondary-400 hover:scale-105 active:scale-100"
            >Hantar !</button
        >
    {/if}
</div>

<style>
    :global(body) {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .cloud {
        background: #eceff1;
        box-shadow: 0 10px rgba(0, 0, 0, 0.2);
    }
</style>
