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


const UMD_DEV_Bundle  = createBundle('inferno.js', 'umd', pkgJSON.rollup);
const UMD_PROD_Bundle = createBundle('inferno.js', 'umd', pkgJSON.rollup);
const NODE_PROD_Bundle = createBundle('index.js', 'umd', pkgJSON.rollup);
const ES_DEV_Bundle = createBundle('index.es.js', 'es', pkgJSON.rollup);

console.log(`=================================
	STARTING ${pkgJSON.name}
`);

const DEV_UMD = createRollup(cwd, pkgJSON, 'development');
Promise.all([
	DEV_UMD(UMD_DEV_Bundle),
	DEV_UMD(NODE_PROD_Bundle),
]).then(() => {
	const PROD_UMD = createRollup(cwd, pkgJSON, 'production');

	return PROD_UMD(NODE_PROD_Bundle);
}).then(() => {
	const DEV_ES = createRollup(cwd, pkgJSON, 'development', true);

	return DEV_ES(ES_DEV_Bundle);
}).then(() => {
	console.log(`BUILT`);
}).catch((err) => {
	console.error(err);
});




