const path = require('path');
module.exports = {
    entry: './entry.js',
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
    }
};
