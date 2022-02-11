/* eslint-disable no-undef */
const path = require("path");
const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode: mode,
  entry: "./src",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/lib"), 
    libraryTarget: "var",
    library: "EntryPoint"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./public",
    port:9590
  },
};
