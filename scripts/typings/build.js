const dts = require('dts-bundle');
const { join } = require('path');

const cwd = process.cwd();
const pkgJSON = require(join(cwd, 'package.json'));

if (pkgJSON.private) {
	return;
}

dts.bundle({
	main: join(__dirname, '../../build', pkgJSON.name, 'src/index.d.ts'),
	name: pkgJSON.name,
	out: join(cwd, `dist/${pkgJSON.name}.d.ts`),
});
