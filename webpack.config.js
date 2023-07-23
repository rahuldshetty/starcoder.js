// Based on https://github.com/xenova/transformers.js/blob/main/webpack.config.js

import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        // include dist in entry point so that when running dev server,
        // we can access the files with /dist/...
        'dist/starcoder': './src/index.js',
        'dist/starcoder.min': './src/index.js',
    },
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: __dirname,
        library: {
            type: 'module',
        },
    },
    plugins: [
        // Copy .wasm files to dist folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'build/*.wasm',
                    to: 'dist/[name][ext]'
                },
            ],
            patterns: [
                {
                    from: 'build/*.js',
                    to: 'dist/[name][ext]'
                },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            test: /\.min\.js$/,
            extractComments: false,
        })],
    },
    devServer: {
        static: {
            directory: __dirname
        },
        port: 8080
    },
    experiments: {
        outputModule: true,
    },
};