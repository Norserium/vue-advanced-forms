import Vue from 'rollup-plugin-vue';
import external from 'rollup-plugin-peer-deps-external';
import visualizer from 'rollup-plugin-visualizer';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
	input: 'src/index.js',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: process.env.NODE_ENV !== 'production'
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: process.env.NODE_ENV !== 'production'
		},
		{
			file: pkg.umd,
			format: 'umd',
			sourcemap: process.env.NODE_ENV !== 'production',
			name: 'vue-advanced-forms'
		}
	],
	plugins: [
		external(),
		Vue(),
		babel({
			exclude: '/node_modules/**',
			extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
		}),
		terser(),
		commonjs(),
		visualizer()
	]
};
