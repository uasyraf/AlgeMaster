import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

const repoName = 'AlgeMaster';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	base: `/${repoName}/`

});
