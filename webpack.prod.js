const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { cache } = require('sharp');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  }
});
