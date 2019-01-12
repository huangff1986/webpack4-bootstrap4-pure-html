const path = require('path');
const golb = require('glob');

const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

/**
 * 获取入口
 */

function getEntry() 
{
    let entry = [];

    var files = glob.sync(path.resolve(__dirname, 'src/pages/*/*.js'))

    console.log(files);
}

module.exports = {
    mode: 'development',
    entry: './src/pages/index.js',
    output: {
        filename: 'static/js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: 'static/js/vendor/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new cleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages/index.html')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jquery': 'jquery',
            Popper: ['popper.js','default']
        })
    ]
}