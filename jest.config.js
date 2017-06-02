module.exports = {
	collectCoverageFrom: [
		'packages/*/src/**/*.ts',
		'!**/*.ts.js'
	],
	coverageDirectory: 'coverage',
	coverageReporters: [
		'html',
		'lcov',
		'text'
	],
	moduleFileExtensions: [
		'ts',
		'tsx',
		'js',
		'jsx',
		'json'
	],
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
		'^inferno/core/VNodes': '<rootDir>/packages/inferno/src/core/VNodes'
	},
	projects: [
		'<rootDir>/packages/inferno',
		'<rootDir>/packages/inferno-component',
		'<rootDir>/packages/inferno-create-class',
		'<rootDir>/packages/inferno-create-element',
		'<rootDir>/packages/inferno-shared',
		'<rootDir>/packages/inferno-vnode-flags'
	],
	setupFiles: [
		'<rootDir>/scripts/jest/requestAnimationFrame.ts'
	],
	testMatch: [
		'<rootDir>/packages/*/tests/**/*spec.js?(x)',
		'<rootDir>/packages/*/tests/**/*spec.ts?(x)'
	],
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
	}
};
