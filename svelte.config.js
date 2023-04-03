import preprocess from 'svelte-preprocess';

const config = {
	kit: {
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
