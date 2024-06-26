const path = require('path');
const packageJson = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `bundle.${packageJson.version}.js`,
    library: 'SampaadakEditor',
    libraryTarget: 'umd', 
    globalObject: 'this', 
    // minify: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'test/index.html', 
      filename: 'index.html', 
      inject: 'body', 
    })
  ],
};
