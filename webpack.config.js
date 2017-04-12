const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO: Abstract into configuration file
const HTML_PATH = path.join(__dirname, 'src/public/index.html');

module.exports = {
    entry: './config/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: HTML_PATH
        })
    ]
};
