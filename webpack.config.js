const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    foreground: "./src/js/foreground.js",
    "service-worker": "./src/js/service-worker.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/popup.html",
      filename: "popup.html",
      templateParameters: {
        cssRootDir:
          process.env.NODE_ENV === "production" ? "./css" : "./src/styles/css",
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: "./static/img", to: "img" },
        { from: "./src/styles/css", to: "css" },
        { from: "./manifest.json" },
      ],
    }),
  ],
};
