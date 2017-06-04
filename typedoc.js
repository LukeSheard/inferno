const { join } = require('path');
const cwd = process.cwd();

module.exports = {
	disableOutputCheck: true,
	mode: 'modules',
	name: 'Inferno',
	out: join(cwd, './docs'),
	target: 'es6',
	tsconfig: join(__dirname, './tsconfig.json'),
	excludeNotExported: true
};
