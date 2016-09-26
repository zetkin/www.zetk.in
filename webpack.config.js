var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        path.join(__dirname, 'dist/app/client/main.js')
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': process.env.NODE_ENV,
            'process.env.ZETKIN_DOMAIN': '"dev.zetkin.org"',
        }),
    ],
    output: {
        path: path.join(__dirname, 'dist/static'),
        publicPath: 'http://www.dev.zetkin.org',
        filename: '[name].js'
    }
};
