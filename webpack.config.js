import path from 'path';
import { fileURLToPath } from 'url';
import CopyWebpackPlugin from 'copy-webpack-plugin';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default  {
  entry: path.resolve(__dirname, "src/starcoder.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "starcoder.js",
    library: {
      type: "module",
    },
  },
  module: {
    rules: [
      // {
      //   test: /main\.js$/,
      //   type: 'asset',
      // },
      {
        test: /\.(js)$/,
        exclude: [/node_modules/, /\\build\\main\.js/],
        use: 'babel-loader',
      }
    ]
  },
  mode: "development",
  experiments: {
    outputModule: true,
  },
}