import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: "../build/www",
			assets: "../build/www",
			fallback: null,
			precompress: false,
			strict: true
		}),
	},

	preprocess: [
		preprocess({
			typescript: true,
			sass: true
		}),
	],
};

export default config;