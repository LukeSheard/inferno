var path = require('path');

module.exports = {
	entry: './input',
	output: {
		filename: 'output.js',
	},
	resolve: {
		alias: {
			'inferno': 'inferno/dist/index',
			'inferno-create-element': 'inferno-create-element/dist/index',
		},
		root: path.resolve('../../../../packages'),
	},
};
