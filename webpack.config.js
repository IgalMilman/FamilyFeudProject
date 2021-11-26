const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    frontend: './frontend/src/index.js',
  },
  output: {
    path: path.resolve('./assets/frontend/'),
    filename: '[name]-[fullhash].js',
    publicPath: 'static/frontend/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleTracker({
      path: __dirname,
      filename: './webpack-stats.json',
    }),
  ],
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
    },
  },
}