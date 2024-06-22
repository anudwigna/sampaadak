const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Adjust entry point as per your setup
  output: {
    path: path.resolve(__dirname, './test/dist'),
    filename: 'bundle.js',
    library: 'SampaadakEditor',
    libraryTarget: 'umd', // This makes the module available as a global variable
    globalObject: 'this', // This ensures compatibility with both Node.js and browser environments
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
