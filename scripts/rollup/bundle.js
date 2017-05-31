const fs = require('fs');
const { join } = require('path');

const ROOT = join(__dirname, '../../packages');

const moduleGlobals = fs.readdirSync(ROOT)
	.filter(path => fs.lstatSync(join(ROOT, path)).isDirectory())
	.reduce((acc, pkgName) => {
		const pkgJSON = require(join(ROOT, pkgName, 'package.json'));

		if (pkgJSON.rollup && pkgJSON.rollup.moduleName) {
			acc[pkgJSON.name] = pkgJSON.rollup.moduleName;
		}

		return acc;
	}, {});

function createOptions(filename, format, rollupConfig) {
	return {
		dest: `dist/${filename}`,
		// exports: 'named',
		format: format,
		globals: Object.assign({}, moduleGlobals, rollupConfig.moduleGlobals || {}),
		moduleName: rollupConfig.moduleName,
		sourceMap: false
	};
}

module.exports = function(NODE_ENV, pkgJSON, ES6 = false) {
	const {
		name,
		rollup: rollupConfig
	} = pkgJSON;

	let fileName = name;
	if (ES6) {
		fileName = 'index';
	}

	const filename = `${fileName}${ES6 ? '.es' : ''}${NODE_ENV === 'production' ? '.min' : ''}.js`;
	const format = ES6 ? 'es' : 'umd';

	const options = createOptions(filename, format, rollupConfig);

	return function(bundle) {
		bundle.write(options);

		return `${name} at ${format} is complete`;
	};
};
