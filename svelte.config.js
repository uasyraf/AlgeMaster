import { preprocessMeltUI, sequence } from "@melt-ui/pp";
import adapter from '@sveltejs/adapter-auto';
/** @type {import('@sveltejs/kit').Config}*/

const dev = process.argv.includes('dev');
const repoName = 'AlgeMaster'; // Change this to your GitHub repo name

const config = {
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    })
  },
  preprocess: sequence([preprocessMeltUI()])
};
export default config;
