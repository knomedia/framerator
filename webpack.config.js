var webpack = require('webpack');

module.exports = {
  entry: "./app/routes.js",
  output: {
    path: "./www/",
    filename: "javascripts/bundle.js"
  },
  module: {
    loaders: [
    {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    {test: /\.scss$/, loader: "style!css!sass?sourceMap"},
    {test: /\.css$/, loader: "style!css"},
      {test: /\.(svg|woff|ttf|svg|eot)\?(\d)+$/, loader: 'file-loader?name=assets/[hash].[ext]'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
