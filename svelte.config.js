import preprocess from 'svelte-preprocess';

const config = {
	kit: {
		alias: {
			$utils: 'src/utils'
		}
	},
	preprocess: [
		preprocess({
			scss: {
				prependData: '@use "src/variables.scss" as *;'
			}
		})
	]
};

export default config;
