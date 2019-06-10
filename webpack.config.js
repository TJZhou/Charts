const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

let outDirectory = path.resolve(__dirname, 'dist');
let outputFilename = '[name].js';

module.exports = {
    mode: 'production',
    entry:{
        index:    './src/js/index.js',
        pieChart: './src/js/pieChart.js',
        barChart: './src/js/barChart.js',
        lineChart:'./src/js/lineChart.js',
        polygonChart: './src/js/polygonChart.js',
    },
    output: {
        filename: outputFilename,
        path: outDirectory,
    },
    devServer: {
        port:8088,
        contentBase: outDirectory
    },
    externals: {
            moment: 'moment'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            chunks:['index'],
            template: './src/html/index.html',
            filename:'index.html',
            minify:{
                collapseWhitespace:true //折叠空白区域 也就是压缩代码
            },
        }),
        new HtmlWebpackPlugin({
            chunks:['index', 'pieChart'],
            template: './src/html/pieChart.html',
            filename:'pieChart.html',
            minify:{
                collapseWhitespace:true
            },
        }),
        new HtmlWebpackPlugin({
            chunks:['index', 'barChart'],
            template: './src/html/barChart.html',
            filename:'barChart.html',
            minify:{
                collapseWhitespace:true
            },
        }),
        new HtmlWebpackPlugin({
            chunks:['index', 'lineChart'],
            template: './src/html/lineChart.html',
            filename:'lineChart.html', 
            minify:{
                collapseWhitespace:true
            },
        }),
        new HtmlWebpackPlugin({
            chunks:['index', 'polygonChart'],
            template: './src/html/polygonChart.html',
            filename:'polygonChart.html', 
            minify:{
                collapseWhitespace:true
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