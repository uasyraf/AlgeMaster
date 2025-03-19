import { onMount } from 'svelte';

export function setBackground(background) {
    onMount(() => {
        let current = document.body.style['background-image'];
        document.body.style['background-image'] = background;
        return () => document.body.style['background-image'] = current;
    })
}

export function setBackground(background) {
    onMount(() => {
        let current = document.body.style['background-image'];
        document.body.style['background-image'] = background;
        return () => document.body.style['background-image'] = current;
    })
}