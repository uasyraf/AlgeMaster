// audio.js - Audio utilities for sounds and music
import { base } from "$app/paths";
import { browser } from "$app/environment";

export const sounds = {
    background: null,
    correct: null,
    wrong: null,
    click: null,
    congratulations: null
};

// Initialize all audio files
export function initAudio() {
    // Only run in browser environment
    if (!browser || typeof Audio === 'undefined') return;

    // Create Audio objects only if in browser and Audio API is available
    sounds.background = new Audio(`${base}/audio/background-music.mp3`);
    sounds.background.loop = true;
    sounds.background.volume = 0.1; // Reduced from 0.2 to 0.1 for lower volume

    sounds.correct = new Audio(`${base}/audio/correct-answer.wav`);
    sounds.correct.volume = 0.5;

    sounds.wrong = new Audio(`${base}/audio/wrong-answer.wav`);
    sounds.wrong.volume = 0.5;

    sounds.click = new Audio(`${base}/audio/button-click.wav`);
    sounds.click.volume = 0.3;

    sounds.congratulations = new Audio(`${base}/audio/congratulations.wav`);
    sounds.congratulations.volume = 0.6;
}

// Play a sound by name
export function playSound(soundName) {
    // Only play if in browser environment
    if (!browser || typeof Audio === 'undefined' || !sounds[soundName]) return;

    // If it's already playing, reset it
    sounds[soundName].currentTime = 0;
    sounds[soundName].play().catch(err => {
        console.log('Audio play error:', err);
    });
}

// Stop a sound by name
export function stopSound(soundName) {
    // Only stop if in browser environment
    if (!browser || typeof Audio === 'undefined' || !sounds[soundName]) return;

    sounds[soundName].pause();
    sounds[soundName].currentTime = 0;
}

// Toggle background music
export function toggleBackgroundMusic(shouldPlay) {
    // Only toggle if in browser environment
    if (!browser || typeof Audio === 'undefined' || !sounds.background) return;

    if (shouldPlay) {
        sounds.background.play().catch(err => {
            console.log('Background music play error:', err);
        });
    } else {
        sounds.background.pause();
    }
}