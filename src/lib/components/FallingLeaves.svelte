<script>
    import { onMount } from "svelte";
    import { base } from "$app/paths";

    export let leafCount = 15;

    const leafTypes = ["maple", "oak", "birch"];
    const fallDurations = [10, 15, 20, 25, 30]; // seconds
    const swayDurations = [3, 4, 5, 6]; // seconds
    const leafSizes = [0.6, 0.8, 1, 1.2, 1.4];
    const startPositions = Array.from({ length: 100 }, (_, i) => i + 1); // 1-100%
    const delays = Array.from({ length: 10 }, (_, i) => i * 2); // 0-18s
    const leafColors = ["#e65d0e", "#c65102", "#f4a460", "#ff7f00", "#d2691e"];

    let leaves = [];

    onMount(() => {
        generateLeaves();
    });

    function generateLeaves() {
        leaves = [];

        for (let i = 0; i < leafCount; i++) {
            const leafType =
                leafTypes[Math.floor(Math.random() * leafTypes.length)];
            const fallDuration =
                fallDurations[Math.floor(Math.random() * fallDurations.length)];
            const swayDuration =
                swayDurations[Math.floor(Math.random() * swayDurations.length)];
            const leafSize =
                leafSizes[Math.floor(Math.random() * leafSizes.length)];
            const startPosition =
                startPositions[
                    Math.floor(Math.random() * startPositions.length)
                ];
            const delay = delays[Math.floor(Math.random() * delays.length)];
            const rotation = Math.floor(Math.random() * 360);

            leaves.push({
                id: i,
                type: leafType,
                fallDuration,
                swayDuration,
                size: leafSize,
                startPosition,
                delay,
                rotation,
            });
        }
    }
</script>

<div class="falling-leaves-container">
    {#each leaves as leaf (leaf.id)}
        <div
            class="leaf"
            style="
        left: {leaf.startPosition}%;
        animation-duration: {leaf.fallDuration}s, {leaf.swayDuration}s;
        animation-delay: {leaf.delay}s;
        transform: scale({leaf.size}) rotate({leaf.rotation}deg);
      "
        >
            <img src="{base}/images/leaves/{leaf.type}.svg" alt="Autumn leaf" />
        </div>
    {/each}
</div>

<style>
    .falling-leaves-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1; /* Changed from 1 to -1 to place leaves behind all content */
        overflow: hidden;
    }

    .leaf {
        position: absolute;
        top: -50px;
        animation-name: falling, swaying;
        animation-timing-function: linear, ease-in-out;
        animation-iteration-count: infinite;
        filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2));
    }

    @keyframes falling {
        from {
            top: -50px;
            opacity: 1;
        }
        to {
            top: 100vh;
            opacity: 0.7;
        }
    }

    @keyframes swaying {
        0% {
            transform: translateX(0) rotate(0deg);
        }
        25% {
            transform: translateX(100px) rotate(45deg);
        }
        50% {
            transform: translateX(0) rotate(90deg);
        }
        75% {
            transform: translateX(-100px) rotate(45deg);
        }
        100% {
            transform: translateX(0) rotate(0deg);
        }
    }
</style>
