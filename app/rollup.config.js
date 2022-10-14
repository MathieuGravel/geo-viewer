import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';


export default {
    input: 'src/main.ts',
    output: {
        sourcemap: true,
        file: '../build/bundle.js',
        format: 'iife',
        name: 'app',
    },
    plugins: [
        svelte({
            preprocess: sveltePreprocess(),
            include: "src/**/*.svelte",
            emitCss: false
        }),
        resolve({ browser: true }),
        commonjs(),
        typescript(),
        copy({
            targets: [
                { src: "public/*", dest: "../build"},
                { src: "../node_modules/leaflet/dist/leaflet.css", dest: "../build/leaflet"}
            ]
        })
    ],
};