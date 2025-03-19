import { preprocessMeltUI, sequence } from "@melt-ui/pp";
import adapter from '@sveltejs/adapter-auto';
/** @type {import('@sveltejs/kit').Config}*/

const dev = process.argv.includes('dev');
const repoName = 'AlgeMaster'; // Change this to your GitHub repo name

const config = {
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      pages: 'build',  // Ensures SvelteKit outputs to the correct folder
      assets: 'build',
      fallback: 'index.html' // Ensures correct routing on GitHub Pages
    }),
    paths: {
      base: dev ? '' : `/${repoName}`
    },
    appDir: 'internal'
  },
  preprocess: sequence([preprocessMeltUI()])
};
export default config;
