const { join } = require('path');

const baseConfig = require('../../jest.config');

module.exports = Object.assign({}, baseConfig, {
	moduleNameMapper: {
		'^inferno$': '<rootDir>/fixtures/react-suite/packages/inferno',
		'^inferno-component': '<rootDir>/fixtures/react-suite/packages/inferno-component',
		'^inferno-create-class': '<rootDir>/fixtures/react-suite/packages/inferno-create-class',
		'^inferno-create-element': '<rootDir>/fixtures/react-suite/packages/inferno-create-element',
		'^inferno-server': '<rootDir>/fixtures/react-suite/packages/inferno-server',
		'^inferno-shared': '<rootDir>/packages/inferno-shared/src',
		'^inferno-test-utils': '<rootDir>/fixtures/react-suite/packages/inferno-test-utils',
		'^inferno-utils': '<rootDir>/packages/inferno-utils/src',
		'^inferno-vnode-flags': '<rootDir>/fixtures/react-suite/packages/inferno-vnode-flags',
		'^inferno/core/VNodes': '<rootDir>/fixtures/react-suite/packages/inferno/core-vnodes'
	},
	rootDir: join(__dirname, '../../'),
	testMatch: ['<rootDir>/packages/*/tests/**/*spec.js?(x)', '<rootDir>/packages/*/tests/**/*spec.ts?(x)'],
	testPathIgnorePatterns: ['/node_modules/', '/inferno-server/']
});
