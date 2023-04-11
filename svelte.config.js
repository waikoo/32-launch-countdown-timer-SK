import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

const config = {
	kit: {
		target: '#svelte',
		adapter: adapter(),
		alias: {
			$utils: 'src/utils',
			$lib: 'src/lib'
		}
	},
	preprocess: [
		preprocess({
			scss: {
				prependData: '@use "src/variables.scss" as *;'
			}
		})
	],

	vitePlugin: {
		experimental: {
			inspector: true,
			toggleKeyCombo: 'shift + meta',
			showToggleButton: 'active'
		}
	}
};

export default config;
