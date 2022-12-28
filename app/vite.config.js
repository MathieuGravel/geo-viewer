import { sveltekit } from '@sveltejs/kit/vite';
import * as fs from "fs-extra";

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()]
};

export default config;
