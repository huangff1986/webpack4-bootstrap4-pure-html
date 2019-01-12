const path = require('path');
const glob = require('glob');

const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

/**
 * 获取入口
 */

function getEntry() 
{
    let entry = [];
    entry = glob.sync(path.resolve(__dirname, 'src/pages/*/*.js'))

    return entry;
}

/**
 * 入口文件与html文件匹配
 */
function getHtmlWebpackPlugins()
{
    let htmlWebpackPlugins = [];
    let entry = getEntry();
    
    entry.foreach((page)=> {
        let entryChunkName = page.split('/')[page.split('/').length-1].split('.')[0];
        let entryTemplateHtml = page.slice(0,-3) + '.html';

        htmlWebpackPlugin.push(
            new htmlWebpackPlugin({
                template: entryTemplateHtml,
                chunks: [entryChunkName],
                filename: 'static/js/[name].js'
            })
        )
    })
}

module.exports = {
    mode: 'development',
    entry: getEntry(),
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
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jquery': 'jquery',
            Popper: ['popper.js','default']
        }),
        ...getHtmlWebpackPlugins()
    ]
}