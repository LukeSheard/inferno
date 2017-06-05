const fs = require('fs');
const path = require('path');
const read = require('fs-readdir-recursive');

const moduleNameMapper = fs.readdirSync(path.join(__dirname, 'packages')).reduce(function(map, package) {
	const packageMap = read(path.join(__dirname, 'packages', package, 'src')).reduce(function(acc, filepath) {
		const file = filepath.slice(0, -3).split('/');
		if (file.slice(-1)[0] === 'index') {
			file.splice(-1, 1);
		}
		const moduleName = file.length ? `/${file.join('/')}` : '';
		return Object.assign(acc, {
			[`^${package}${moduleName}$`]: `<rootDir>/packages/${package}/src/${filepath}`,
		});
	}, {});
	return Object.assign(map, packageMap);
}, {});

module.exports = {
	collectCoverageFrom: ['packages/*/src/**/*.ts', '!**/*.ts.js'],
	coverageDirectory: 'coverage',
	coverageReporters: ['html', 'lcov', 'text'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	moduleNameMapper: {
		'^inferno$': '<rootDir>/packages/inferno/src',
		'^inferno-component': '<rootDir>/packages/inferno-component/src',
		'^inferno-create-class': '<rootDir>/packages/inferno-create-class/src',
		'^inferno-create-element': '<rootDir>/packages/inferno-create-element/src',
		'^inferno-server': '<rootDir>/packages/inferno-server/src',
		'^inferno-shared': '<rootDir>/packages/inferno-shared/src',
		'^inferno-test-utils': '<rootDir>/packages/inferno-test-utils/src',
		'^inferno-utils': '<rootDir>/packages/inferno-utils/src',
		'^inferno-vnode-flags': '<rootDir>/packages/inferno-vnode-flags/src',
		'^inferno/core/VNodes': '<rootDir>/packages/inferno/src/core/VNodes',
	},
	projects: [
		'<rootDir>/packages/inferno',
		'<rootDir>/packages/inferno-component',
		'<rootDir>/packages/inferno-create-class',
		'<rootDir>/packages/inferno-create-element',
		'<rootDir>/packages/inferno-shared',
		'<rootDir>/packages/inferno-vnode-flags',
	],
	setupFiles: ['<rootDir>/scripts/jest/requestAnimationFrame.ts', '<rootDir>/scripts/jest/globals.ts'],
	testMatch: [
		'<rootDir>/packages/*/__tests__/**/*spec.js?(x)',
		'<rootDir>/packages/*/__tests__/**/*spec.ts?(x)',
		'<rootDir>/packages/*/__tests__/**/*spec.browser.js?(x)',
		'<rootDir>/packages/*/__tests__/**/*spec.browser.ts?(x)',
	],
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
	},
};
