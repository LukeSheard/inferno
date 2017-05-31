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

/*
	 Make the dist directory if it doesn't already exist
*/

try {
	fs.mkdirSync(join(cwd, 'dist'));
} catch (e) {
	if (e.code !== 'EEXIST') {
		throw Error(e);
	}
}

const DEV_UMD  = createRollup(cwd, pkgJSON, 'development');
const PROD_UMD = createRollup(cwd, pkgJSON, 'production');
const DEV_ES   = createRollup(cwd, pkgJSON, 'development', true);

const UMD_DEV_Bundle   = createBundle('inferno.js', 'UMD', pkgJSON.rollup);
const UMD_PROD_Bundle  = createBundle('inferno.js', 'UMD', pkgJSON.rollup);
const NODE_PROD_Bundle = createBundle('index.js', 'UMD', pkgJSON.rollup);
const ES_DEV_Bundle    = createBundle('index.es.js', 'ES', pkgJSON.rollup);

Promise.all([
	DEV_UMD(UMD_DEV_Bundle),
	PROD_UMD(UMD_PROD_Bundle),
	DEV_UMD(NODE_PROD_Bundle),
	DEV_ES(ES_DEV_Bundle),
]).then(() => {
	
});
