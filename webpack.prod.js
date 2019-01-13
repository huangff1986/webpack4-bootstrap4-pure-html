const common = require('./webpack.common.js');
const merge = require('webpack-merge');

const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new cleanWebpackPlugin(['dist']),
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
})