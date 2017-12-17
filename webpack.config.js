var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
  //the name of the file to exstract scss (and css?)
  filename: 'main.css'
});

module.exports = {
  entry: './client/index.js',
  output: {
    //__dirname is a buildt in variabel for the current directory
    //we use the resolve method, because we need to specify an absolute path to create a directory
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',

    //This is for the webpack-dev-server that only reads the filename of the above, so the path must be specified.
    //This might have been fixed, as it worked without specifying public path
    publicPath: '/dist'
  },
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
    extractPlugin
    // new webpack.optimize.UglifyJsPlugin(
    //   {
    //     //may pass arguments
    //   }
    // )
  ]
};
