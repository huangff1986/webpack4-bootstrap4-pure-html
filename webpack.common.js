const path = require('path');
const glob = require('glob');

const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = (process.env.NODE_ENV === 'prod');

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
            chunks: isProd ? [entryName, 'vendors'] : [entryName] ,
            filename: `${entryName}.html`,
            inject: true
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
                test: /\.(css)$/,
                use: [
                    isProd ? ({
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }}) 
                    : 
                    'style-loader', 
                    'css-loader'
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    isProd ? ({
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                    }) : 'style-loader', 
                    
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }, 
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpe?g|gif)$/,
                use: ['url-loader?limit=4096&name=[name]' + (isProd ? '.[hash:8]' : '') + '.[ext]&outputPath=static/img/', 'image-webpack-loader']
            },
            {
                test: /\.(webp)$/,
                use: ['file-loader?&name=[name]' + (isProd ? '.[hash:8]' : '') + '.[ext]&outputPath=static/img/']
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)(\?.*$|$)/,
                loader: 'file-loader?name=static/font/[name].[hash:8].[ext]'
            },
            {
                test: /\.(htm|html)$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015-nostrict'],
                        plugins: ['transform-runtime']
                    }
                }
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
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].chunk.[contenthash:8].css',
        }),
        ...htmlWebpackPlugins
    ]
}