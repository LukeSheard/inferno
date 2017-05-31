const fs = require('fs');
const { join } = require('path');

const createBundle = require('./bundle');
const createRollup = require('./rollup');

const cwd      = process.cwd();
const pkgJSON  = require(join(cwd, 'package.json'));
const NODE_ENV = process.env.NODE_ENV || 'development';

if (pkgJSON.private || !pkgJSON.rollup) {
	return;
}

try {
	fs.mkdirSync(join(cwd, 'dist'));
} catch (e) {
	if (e.code !== 'EEXIST') {
		throw Error(e);
	}
}

console.log(`========================
	${pkgJSON.name}
`)

const rollupUMDDev = createRollup(cwd, pkgJSON, NODE_ENV);
const bundleUMDDev = createBundle(NODE_ENV, pkgJSON);
rollupUMDDev.then(bundleUMDDev).catch(console.error);


const rollupES  = createRollup(cwd, pkgJSON, NODE_ENV, true);
const bundleES  = createBundle(NODE_ENV, pkgJSON, true);
rollupES.then(bundleES).catch(console.error);

