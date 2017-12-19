var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
  //the name of the file to exstract scss (and css?)
  filename: 'main.css'
});

module.exports = {
  entry: './src/client/index.js',
  output: {
    //__dirname is a buildt in variabel for the current directory
    //we use the resolve method, because we need to specify an absolute path to create a directory
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'

    //publicPath: '/dist' //dont need this when the index.html and bundles are in the same dir (dist)
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          //we create an object for the babel loader to be able to define the presets we want to use (which is one for the moment)
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', //keeps the filename instead of giving it an hash as a filename
              outputPath: 'img/', //to load images in another folder than dist
              publicPath: 'img/' //to tell the html that uses this img to look in the img dir
            }
          }
        ]
      }
      //we swapped the old css loader with one that handles scss
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'] //loaders are executed in reverse order
      // },
    ]
  },
  //Applied to the bundled file.
  //Apllying a plugin to compress the output bundle.
  plugins: [
    extractPlugin,
    //html files and bundles are injected into this new html file, located in dist
    new HtmlWebpackPlugin({
      template: 'src/client/index.html'
    }),
    //removes folders before building
    new CleanWebpackPlugin([
      //what folders to remove
      'dist'
    ])
    // new webpack.optimize.UglifyJsPlugin(
    //   {
    //     //may pass arguments
    //   }
    // )
  ]
};
