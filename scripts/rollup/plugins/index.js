const bublePlugin = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const builtins = require('rollup-plugin-node-builtins');
const replace = require('rollup-plugin-replace');
const tsPlugin = require('rollup-plugin-typescript2');
const uglify = require('rollup-plugin-uglify');

const aliasPlugin = require('./alias');
const optJSPlugin = require('./optimize');

module.exports = function(version, NODE_ENV, ES6) {
	const plugins = [
		aliasPlugin,
		builtins(),
		nodeResolve({
			extensions: [ '.ts', '.js', '.json' ],
			jsnext: true,
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		tsPlugin({
			cacheRoot: `.rpt2_cache${ES6 ? '-es' : ''}`,
			clean: true,
			exclude: [
				'*.d.ts',
				'**/*.d.ts',
				'*.spec*',
				'**/*.spec*',
			],
		}),
		bublePlugin(),
		replace({
			VERSION: version,
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
		}),
	];

	if (NODE_ENV === 'production' && !ES6) {
		plugins.push(
			uglify({
				compress: {
					// compress options
					booleans: true,
					dead_code: true,
					drop_debugger: true,
					unused: true
				},
				ie8: false,
				parse: {
					// parse options
					html5_comments: false,
					shebang: false
				},
				sourceMap: false,
				toplevel: false,
				warnings: false
			})
		);
		plugins.push(optJSPlugin);
	}


	return plugins;
};
