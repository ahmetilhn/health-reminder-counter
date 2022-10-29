const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
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
    new CopyPlugin({
      patterns: [{ from: "./static" }, { from: "./src/styles/css", to: "css" }],
    }),
  ],
};
