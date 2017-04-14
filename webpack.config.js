const webpack = require('webpack');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO: Abstract into configuration file
const HTML_PATH = path.join(__dirname, 'src/public/index.html');

var config = {
    devtool: "inline-source-map",
    entry: './src/public/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        open: true, // to open the local server in browser
        contentBase: path.join(__dirname, 'dist'),
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, //Check for all js files
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015', 'react'] }
                }]
            },
            {
                test: /\.(sass|scss)$/, //Check for sass or scss file names
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
        ]
    },
    // module: {
    //     loaers: [
    //         { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
    //     ],
    //     rules: [
    //         { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
    //         {
    //             test: /\.js$/, //Check for all js files
    //             use: [{
    //                 loader: 'babel-loader',
    //                 options: { presets: ['es2015'] }
    //             }]
    //         }
    //     ]
    // },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: HTML_PATH
        }),
    ]
};

module.exports = config;
