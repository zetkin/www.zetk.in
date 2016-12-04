var path = require('path');
var webpack = require('webpack');

var appId = process.env.ZETKIN_APP_ID || 'a4';

module.exports = {
    devtool: 'eval',
    entry: [
        path.join(__dirname, 'dist/app/client/main.js')
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.ZETKIN_DOMAIN': JSON.stringify('dev.zetkin.org'),
            'process.env.ZETKIN_APP_ID': JSON.stringify(appId),
        }),
    ],
    output: {
        path: path.join(__dirname, 'dist/static'),
        publicPath: 'http://www.dev.zetkin.org',
        filename: '[name].js'
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(new webpack.optimize.DedupePlugin());
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
