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

module.exports = function(filename, format, rollupConfig) {
	const options = {
		dest: `dist/${filename}`,
		format: format,
		globals: Object.assign({}, moduleGlobals, rollupConfig.moduleGlobals || {}),
		moduleName: rollupConfig.moduleName,
		sourceMap: false
	};

	return function({ write }) {
		return write(options);
	};
};
