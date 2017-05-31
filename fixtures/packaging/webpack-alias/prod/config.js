var path = require('path');

module.exports = {
	entry: './input',
	output: {
		filename: 'output.js',
	},
	resolve: {
		alias: {
			'inferno': 'inferno/dist/index.min',
			'inferno-create-element': 'inferno-create-element/dist/index.min',
		},
		root: path.resolve('../../../../packages'),
	},
};
