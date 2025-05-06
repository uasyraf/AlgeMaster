<script context="module">
    import { writable } from "svelte/store";
    // Export the store from the module context so it can be imported elsewhere
    export const audioPermission = writable(false);
</script>

<script>
    import { onMount } from "svelte";
    import { initAudio, toggleBackgroundMusic } from "../audio.js";
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { base } from "$app/paths";

    // Default to hidden, will check in onMount
    let showModal = $state(false);
    let isLoginPage = $state(false);

    function grantPermission() {
        if (!browser) return;

        // Initialize audio
        initAudio();
        toggleBackgroundMusic(true);

        // Save preference
        localStorage.setItem("audioPermission", "granted");
        audioPermission.set(true);
        showModal = false;
    }

    function denyPermission() {
        if (!browser) return;

        // Save preference
        localStorage.setItem("audioPermission", "denied");
        audioPermission.set(false);
        showModal = false;
    }

    onMount(() => {
        // Only run in browser environment
        if (browser) {
            // Check if we're on the login page by looking at the current URL path
            const currentPath = window.location.pathname;
            // If the path is just the base path or base path with a trailing slash, it's the login page
            isLoginPage = currentPath === base + "/" || currentPath === base;

            // Don't show the modal on login page
            if (isLoginPage) {
                showModal = false;
                return;
            }

            // Update permission state based on localStorage
            const storedPermission = localStorage.getItem("audioPermission");
            showModal = storedPermission === null;

            if (storedPermission === "granted") {
                audioPermission.set(true);
                initAudio();
                toggleBackgroundMusic(true);
            } else if (storedPermission === "denied") {
                audioPermission.set(false);
            }
        }
    });
</script>

{#if browser && showModal && !isLoginPage}
    <div class="permission-overlay">
        <div class="permission-modal">
            <h3>Muzik Latar Belakang</h3>
            <p>
                Adakah anda mahu memainkan muzik latar belakang dan efek bunyi
                dalam permainan?
            </p>
            <div class="button-group">
                <button class="btn-yes" onclick={grantPermission}>Ya</button>
                <button class="btn-no" onclick={denyPermission}>Tidak</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .permission-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .permission-modal {
        background-color: #fff;
        border-radius: 1rem;
        padding: 2rem;
        max-width: 90%;
        width: 400px;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: fade-in 0.3s ease-out;
    }

    .button-group {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .btn-yes,
    .btn-no {
        padding: 0.75rem 2rem;
        border-radius: 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .btn-yes {
        background-color: #e16b1f;
        color: white;
    }

    .btn-no {
        background-color: #eee;
        color: #333;
    }

    .btn-yes:hover,
    .btn-no:hover {
        transform: scale(1.05);
    }

    .btn-yes:active,
    .btn-no:active {
        transform: scale(0.98);
    }

    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
