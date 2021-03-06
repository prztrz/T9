'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

require('es6-promise').polyfill();

module.exports = {
    // entry: ['./src/js/main.jsx'],
    entry : {
        'js/app.js': ['whatwg-fetch','./src/js/main.jsx']
    },

    output:{
        filename: '[name]',
        path: __dirname + '/src'
    },

    plugins: [
        new ExtractTextPlugin('./css/app.css')
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,  exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'stage-2' , 'react'] }
            },
            {
                test: /\.(scss|css)$/,
                loader: "style-loader!css-loader?url=false!sass-loader"
            },
            { test: /\.svg$/, loader: 'svg-loader?pngScale=2' },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }  
            },
        ],

    },

    stats: {
        // Colored output
        colors: true
    },

    // Create Sourcemaps for the bundle
     devtool: 'source-map'
};