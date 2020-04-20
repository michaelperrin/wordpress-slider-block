const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const IgnoreEmitWebPackPlugin = require('ignore-emit-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	...defaultConfig,
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.s[ac]ss$/i,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' },
				],
			},
		],
	},
	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			cacheGroups: {
				default: false,
				editor: {
					chunks: 'all',
					name: 'editor',
					test: /editor\.s[ac]ss$/i,
				},
				style: {
					chunks: 'all',
					name: 'style',
					test: /style\.s[ac]ss$/i,
				},
			},
		},
	},
	plugins: [
		...defaultConfig.plugins,
		new IgnoreEmitWebPackPlugin(['editor.js', 'style.js']),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
};
