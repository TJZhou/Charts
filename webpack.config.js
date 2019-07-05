const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let outDirectory = path.resolve(__dirname, 'dist');
let outputFilename = '[name].js';

module.exports = {
    mode: 'production',
    entry: {
        index: './src/js/index.js',
    },
    output: {
        filename: outputFilename,
        path: outDirectory,
    },
    devServer: {
        port: 8088,
        contentBase: outDirectory
    },
    externals: {
        moment: 'moment'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            template: './src/html/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true //折叠空白区域 也就是压缩代码
            },
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }],
        },
        ]
    }
};