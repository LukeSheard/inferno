const { join } = require('path');
const { rollup } = require('rollup');

const createPlugins = require('./plugins');

module.exports = function(cwd, pkgJSON, NODE_ENV = 'development', ES6 = false) {
	const {
		version,
		rollup: rollupConfig = {},
		dependencies = {},
	} = pkgJSON;

	if (pkgJSON.private || !pkgJSON.rollup) {
		return;
	}

	const external = Object.keys(dependencies || {}).filter(n => !(rollupConfig.bundledDependencies || []).includes(n));
	const plugins  = createPlugins(version, NODE_ENV, ES6);

	return rollup({
		entry: join(cwd, 'src/index.ts'),
		external,
		plugins,
	});
};
