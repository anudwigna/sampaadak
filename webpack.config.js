const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, './test/dist'),
    filename: 'bundle.js',
    library: 'SampaadakEditor',
    libraryTarget: 'umd', 
    globalObject: 'this', 
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
};
