const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        app: './src/index.js',
    },
    devServer: {
        contentBase: './',
        overlay: true,
        writeToDisk: true,

    },

    output: {
        filename: 'eventToCalendar.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
};
