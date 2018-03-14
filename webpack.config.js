var path = require('path');

const webpack = require('webpack');

module.exports = {

	entry: './src/client.jsx',

	output: {

	    path: path.resolve(__dirname, 'public'),

	    filename: 'bundle.js',
	    
	    publicPath: '/'
	  },

	//watch: true,

	module: {
		loaders: [
			{
				test: /\.jsx$/,

				exclude:/node_modules/,

				loader: 'babel-loader',

				query: {
					presets: ['react', 'es2015', 'stage-1' ]
				}

			},
			{ 	test: /\.css$/, 

				exclude:/node_modules/,

				loader: "style-loader!css-loader" }
		]

	},

	devtool: 'source-map'


}




/*
output: {
		filename: 'bundle.js',

		path: path.resolve(__dirname, 'public')
	},*/