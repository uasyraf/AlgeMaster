<script>
    import { userStore, hasAccessToMission } from "../../stores/user.js";
    import { missions } from "../../lib/missions.js";
    import { onDestroy, onMount } from "svelte";
    import { base } from "$app/paths";

    let user = $state();

    let unsubscribe = userStore.subscribe((value) => (user = value));

    onDestroy(() => {
        unsubscribe();
    });
</script>

{#snippet card(title, url, iconSrc, hasAcess, classes = "")}
    <a
        class={`relative overflow-clip h-[200px] w-[150px] p-4 rounded-3xl ${hasAcess ? "hover:scale-105 active:scale-100" : ""} ${classes}`}
        href={hasAcess ? url : undefined}
        aria-disabled={!hasAcess}
    >
        {#if !hasAcess}
            <div
                class="absolute inset-0 bg-silver-800 bg-opacity-50 z-50 flex items-center justify-center"
            >
                <img src="{base}/lock.png" alt="Mission Locked" />
            </div>
        {/if}
        <div class="relative h-full z-0">
            <img class="absolute top-2" src={iconSrc} alt="img" />
            <h4 class="absolute bottom-0 !font-normal text-white">
                {title}
            </h4>
        </div>
    </a>
{/snippet}

<div
    class="w-full grid grid-cols-1 place-items-center place-content-evenly h-full px-32 gap-8"
>
    <div
        class="cloud w-[30vw] p-6 rounded-[8rem] bg-secondary-100 border-3 border-black"
    >
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

    {#each missions as mission}
        <div
            class="bg-secondary-100 p-8 rounded-3xl w-full flex flex-col gap-4"
        >
            <div class="flex w-full justify-between">
                <h2 class="self-start !font-normal">{mission.title}</h2>
                <h2 class="self-end">🎮</h2>
            </div>
            <div class="flex w-full gap-4">
                {@render card(
                    "Tonton dan pelajari",
                    `/standard-pembelajaran/${mission.id}/notes`,
                    "/Learning Bear.png",
                    true,
                    "bg-calm-green",
                )}
                {@render card(
                    "Permainan",
                    `/standard-pembelajaran/${mission.id}/games`,
                    "/Learning Elephant.png",
                    hasAccessToMission(mission.id),
                    "bg-calm-purple",
                )}
            </div>
        </div>
    {/each}
</div>
