var path = require('path');
var webpack = require('webpack');
var axis = require('axis');
var jeet = require('jeet');
var rupture = require('rupture');
var autoprefixer = require('autoprefixer-stylus');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/client'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader'
    }]
  },
  stylus: {
    use: [axis(), jeet(), rupture(), autoprefixer()]
  }
};
