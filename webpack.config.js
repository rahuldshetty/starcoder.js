// const path = require('path');
// const CopyPlugin = require("copy-webpack-plugin");
import CopyPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',  
  experiments: {
    outputModule: true,
  },
  context: __dirname + '/src',
  entry:  './starcoder.js',
  // target: ['web'],
  output: {
    filename: 'starcoder.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
        type: 'module',
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
            from: "build/main.*",
            to: "[name][ext]" 
        },
      ],
  }),
],
resolve: {
    extensions: [".ts", ".js"],
},
module: {
    rules: [
        {
            test: /main\.js$/,
            type: "asset/resource",
            generator: {
                filename: "[name].js"
            }
        }
    ]
  },
}