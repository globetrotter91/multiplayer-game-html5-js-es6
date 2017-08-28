var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './gamejs/start.js'
    }, 
    output:{
        filename: './client/public/js/game-ui.js', 
        sourceMapFilename: './client/public/js/bundle.map'
    }, 
    devtool: '#source-map', 
    module:{
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/, 
                loader: 'babel-loader', 
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}