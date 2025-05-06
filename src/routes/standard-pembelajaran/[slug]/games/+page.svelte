<script>
    import {
        userStore,
        completeMission,
        hasAccessToMission,
    } from "../../../../stores/user.js";
    import { missions } from "../../../../lib/missions.js";
    import { page } from "$app/stores";
    import { onDestroy, onMount } from "svelte";
    import { get } from "svelte/store";
    import { base } from "$app/paths";
    import { playSound, toggleBackgroundMusic } from "../../../../lib/audio.js";
    import { audioPermission } from "../../../../lib/components/AudioPermission.svelte";
    import { browser } from "$app/environment";
    import FallingLeaves from "../../../../lib/components/FallingLeaves.svelte";

    let user = $state();
    let currentMission = $state();
    let currentSubMission = $state();
    let selected = $state();
    let showCongratulations = $state(false);
    let musicEnabled = $state(true);
    let permissionGranted = $state(false);
    // New state for mode tracking
    let isRecapMode = $state(false);
    let gameData = $state({
        missionId: 0,
        subMissionId: 0,
    });

    let unsubscribe = userStore.subscribe((value) => (user = value));
    let unsubscribeAudio = audioPermission.subscribe((value) => {
        permissionGranted = value;
        musicEnabled = value;
    });

    onMount(() => {
        if (browser) {
            let current = document.body.style["background-image"];
            document.body.style["background-image"] =
                `url('${base}/pohon-ilmu.png')`;

            // Parse the slug to get mission information
            const slug = $page.params.slug;
            const parts = slug.split("-");
            if (parts && parts.length > 0) {
                try {
                    // Extract mission ID from slug (e.g., "sp-5-1-1" -> missionId: 1)
                    const missionId = parseInt(parts[parts.length - 1]);
                    gameData.missionId = missionId;

                    // Check if this is a recap or current progress
                    if (
                        missionId < user.currentMission ||
                        (missionId === user.currentMission &&
                            parts.length > 1 &&
                            parseInt(parts[parts.length - 2]) <
                                user.currentSubMission)
                    ) {
                        isRecapMode = true;
                        gameData.subMissionId = 1; // Start with first question in recap mode
                    } else {
                        isRecapMode = false;
                    }
                } catch (e) {
                    console.error("Error parsing slug:", e);
                }
            }

            setMission();
            setSubmission();

            return () => {
                document.body.style["background-image"] = current;
            };
        }
    });

    onDestroy(() => {
        unsubscribe();
        unsubscribeAudio();
    });

    function setMission() {
        // In recap mode, use the mission from slug
        // In progress mode, use current user progress
        const missionId = isRecapMode
            ? gameData.missionId
            : user.currentMission;
        currentMission = missions.find((m) => m.id === missionId);
    }

    function setSubmission() {
        // In recap mode, use the submission from local state
        // In progress mode, use current user progress
        const subMissionId = isRecapMode
            ? gameData.subMissionId
            : user.currentSubMission;
        currentSubMission = currentMission?.subMissions.find(
            (s) => s.id === subMissionId,
        );
    }

    function handleAnswer(selectedOption) {
        if (!browser || !currentSubMission) return;

        const isCorrect = selectedOption === currentSubMission.answer;

        if (isRecapMode) {
            // In recap mode, just go to next question without affecting progress
            if (isCorrect) {
                if (permissionGranted) {
                    playSound("correct");
                }

                // Move to next question in recap mode
                if (gameData.subMissionId < currentMission.subMissions.length) {
                    gameData.subMissionId++;
                    setSubmission();
                } else {
                    // End of recap questions
                    showCongratulations = true;
                    if (permissionGranted) {
                        playSound("congratulations");
                    }
                    setTimeout(() => {
                        window.location.href = base + "/dashboard";
                    }, 5000);
                }
            } else {
                if (permissionGranted) {
                    playSound("wrong");
                }
                alert("Cuba lagi!");
            }
        } else {
            // In progress mode, update user progress
            completeMission(isCorrect);

            // Only use localStorage in browser environment
            if (browser) {
                localStorage.setItem("userData", JSON.stringify(user));
            }

            if (isCorrect) {
                if (permissionGranted) {
                    playSound("correct");
                }

                // Check if this was the last question in the subtopic
                const isLastQuestion =
                    user.currentSubMission === 1 &&
                    user.currentMission > currentMission.id;
                const isLastInCurrentMission =
                    user.currentSubMission > currentMission.subMissions.length;

                if (isLastQuestion || isLastInCurrentMission) {
                    showCongratulations = true;
                    if (permissionGranted) {
                        playSound("congratulations");
                    }
                    setTimeout(() => {
                        window.location.href = base + "/dashboard";
                    }, 5000);
                } else {
                    setMission();
                    setSubmission();
                }
            } else {
                if (permissionGranted) {
                    playSound("wrong");
                }
                alert("Cuba lagi!");
            }
        }
    }

    function toggleMusic() {
        if (!browser) return;

        musicEnabled = !musicEnabled;
        toggleBackgroundMusic(musicEnabled);

        // Also update the permission setting
        if (browser) {
            localStorage.setItem(
                "audioPermission",
                musicEnabled ? "granted" : "denied",
            );
            audioPermission.set(musicEnabled);
        }
    }

    function handleButtonClick() {
        if (permissionGranted) {
            playSound("click");
        }
        handleAnswer(selected);
    }

    function handleOptionClick(option) {
        if (permissionGranted) {
            playSound("click");
        }
        selected = option;
    }
</script>

{#if browser}
    <FallingLeaves leafCount={20} />

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
                    <img
                        class="size-6"
                        src="{base}/trophy.png"
                        alt="Trophies"
                    />
                    <p>
                        {user.badges.length}
                    </p>
                </div>
                <div class="flex place-items-center gap-2 ml-4">
                    <button class="music-toggle" onclick={toggleMusic}>
                        {#if musicEnabled}
                            🔊
                        {:else}
                            🔇
                        {/if}
                    </button>
                </div>
                {#if isRecapMode}
                    <div class="recap-badge">Recap</div>
                {/if}
            </div>
        </div>

        {#if showCongratulations}
            <div class="congratulations-container">
                <div class="congratulations-modal">
                    <h2>🎉 Tahniah! 🎉</h2>
                    <p>
                        Anda telah menamatkan semua soalan untuk subtopik ini!
                    </p>
                    <div class="trophy-animation">
                        <img src="{base}/trophy.png" alt="Trophy" />
                    </div>
                    <p class="score-text">
                        {isRecapMode ? "Ulangkaji Selesai" : "+10 Mata"}
                    </p>
                    <p class="redirect-text">
                        Kembali ke Laman Utama dalam 5 saat...
                    </p>
                </div>
            </div>
        {:else if currentSubMission}
            <div
                class="grid place-items-center cloud w-[30vw] p-6 rounded-[8rem]"
            >
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
                        onclick={() => handleOptionClick(option)}
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
                onclick={handleButtonClick}
                type="button"
                class="pr-16 pl-16 text-size-2xl h-16 font-bold text-white mt-4 rounded-[8rem] bg-secondary-400 hover:scale-105 active:scale-100"
                >Hantar !</button
            >
        {/if}
    </div>
{/if}

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
    .music-toggle {
        font-size: 1.5rem;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        height: 24px;
        width: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .recap-badge {
        background-color: #ff9800;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 1rem;
        font-size: 0.7rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .congratulations-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 100;
    }

    .congratulations-modal {
        background-color: white;
        padding: 2rem;
        border-radius: 1rem;
        text-align: center;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        animation: pop-in 0.5s ease-out;
        max-width: 80%;
    }

    .trophy-animation {
        margin: 2rem 0;
        animation: bounce 2s infinite;
    }

    .trophy-animation img {
        width: 100px;
        height: 100px;
        margin: 0 auto;
    }

    .score-text {
        font-size: 1.5rem;
        font-weight: bold;
        color: #eb9f4a;
        margin: 1rem 0;
    }

    .redirect-text {
        font-size: 0.9rem;
        color: #666;
        margin-top: 1rem;
    }

    @keyframes pop-in {
        0% {
            transform: scale(0.5);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes bounce {
        0%,
        20%,
        50%,
        80%,
        100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-20px);
        }
        60% {
            transform: translateY(-10px);
        }
    }
</style>
