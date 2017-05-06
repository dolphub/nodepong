const webpack = require('webpack');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Turn off loader deprication errors, out of webpack configuration scope
process.noDeprecation = true

// TODO: Abstract into configuration file
const HTML_PATH = path.join(__dirname, 'src/public/index.html');

var config = {
    devtool: "inline-source-map",
    entry: './src/public/index.js',
    watch: false,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        open: true, // to open the local server in browser
        contentBase: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [ // loaders -> rules in webpack 2 migration
            {
                test: /\.jsx?$/, //Check for all js files
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015', 'react'], compact: false }
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
            {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
            {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
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
