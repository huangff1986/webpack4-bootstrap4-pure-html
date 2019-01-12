const common = require('./webpack.common.js');
const merge = require('webpack-merge');

const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',

    plugins: [
        new cleanWebpackPlugin(['dist']),
    ]
})