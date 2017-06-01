const { mkdir } = require('fs');
const { join } = require('path');

const cwd = process.cwd();
const pkgJSON = require(join(cwd, 'package.json'));

if (pkgJSON.private || !pkgJSON.rollup) {
	return;
}

mkdir(join(cwd, 'dist'), (err) => {
	if (err && err.code !== 'EEXIST') {
		throw Error(e);
	}

	const options = require('minimist')(process.argv.slice(2), {
		boolean: ['replace', 'optimize', 'uglify'],
		default: {
			env: 'development',
			format: 'umd',
			name: pkgJSON.name,
			optimize: true,
			replace: true,
			uglify: true,
		}
	});

	const createRollup = require('./rollup');
	const createBundle = require('./bundle');

	const rollup = createRollup(options);
	const bundle = createBundle(options);

	console.log(options);

	rollup.catch().then(bundle).then(res => {
		console.log(`${pkgJSON.name} DONE @ ${options.format}`);
	}).catch(err => {
		console.error(`${pkgJSON.name} FAILED @ ${options.format}`);
		throw new Error(err);
	});
});
