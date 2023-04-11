import preprocess from 'svelte-preprocess';

const config = {
	kit: {
		target: '#svelte',
		adapter: vercel(),
		paths: {
			output: 'public'
		},
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
