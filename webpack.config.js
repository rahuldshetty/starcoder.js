import path from 'path';
import { fileURLToPath } from 'url';

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
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /main\.js$/i,
        type: 'asset/resource',
      },
    ]
  },
  mode: "development",
  experiments: {
    outputModule: true,
  },
}