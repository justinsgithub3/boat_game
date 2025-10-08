import path from "path";
import { fileURLToPath } from "url";
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: 
    {
      explore:  "./public/js/explore/index.js",
      parking:  "./public/js/parking/index.js",
      survival: "./public/js/survival/index.js",
      index:    "./public/js/index.js"
    },
  target: "web",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "bundles/[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  mode: "development",
};