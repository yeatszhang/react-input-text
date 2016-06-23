var path = require('path');
var webpack = require('webpack');

var webpackConfig = {
  context: path.join(__dirname, './'),
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, './examples/main.js')
  ],
  output: {
    path: path.join(__dirname, './dist/'),
    publicPath: '/dist/',
    filename: "bundle.js"
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, './examples'),
        path.resolve(__dirname, './src')
      ]
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.css$/,
      loader: 'style!css',
      exclude: /\.module.css$/,
    }]
  }
};

module.exports = webpackConfig;
