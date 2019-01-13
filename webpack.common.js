const path = require('path');
const glob = require('glob');

const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

/**
 * 获取入口
 */

let entry = {}
let htmlWebpackPlugins = []

glob.sync('src/pages/*/*.js').forEach((page)=> {

    let entryName = page.split('/')[page.split('/').length-1].split('.')[0];
    let entryTemplateHtml = page.slice(0,-3) + '.html';

    entry[entryName] = path.resolve(__dirname, page);

    htmlWebpackPlugins.push(
        new htmlWebpackPlugin({
            template: entryTemplateHtml,
            chunks: [entryName],
            filename: `${entryName}.html`
        })
    )
})

console.log(process.env.NODE_ENV)

module.exports = {

    entry,
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
            },
            {
                test: /\.(htm|html)$/,
                use: [
                    'raw-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jquery': 'jquery',
            Popper: ['popper.js','default']
        }),
        ...htmlWebpackPlugins
    ]
}