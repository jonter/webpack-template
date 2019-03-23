//general setting for dev and build

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// a plugin which separates js and css code.
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const PATHS = { // helps us to manage frequently used strings
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../public'),
  assets: 'assets'
};

module.exports = {
  externals:{ // allow us to use these constants in another conf files
    paths: PATHS
  },

  entry: {
    app: PATHS.src // webpack will find index.js automatically
  },
  output: {
    filename: `${PATHS.assets}/js/[name].js`, //gets name from entry key 
    path: PATHS.dist, 
    publicPath: '/' //for our devServer
  },
  module: {
    rules: [{         //babel setup (also watch .babelIrc file)
      test: /\.js$/,  //regex to include all js files
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
    {         //images loader
      test: /\.(png|jpg|git|svg)$/,  //regex to include all images
      loader: 'file-loader',
      options:{
        name:'[name].[ext]'
      }
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader', //post css loader to process our result css file 
          options: { 
            sourceMap: true, 
            config: { path: `${PATHS.src}/js/postcss.config.js` } // see postcss.config.js for more information
          }
        }
      ]
    }]
  },
  
  plugins: [
    new MiniCssExtractPlugin({ //register plugin
      filename: `${PATHS.assets}/css/[name].css`
    }),
    new HtmlWebpackPlugin({
      hash: false, //disable hash
      template: `${PATHS.src}/index.html`,
      filename: './index.html'
    }),
    new CopyWebpackPlugin([
      {from: `${PATHS.src}/img`, to:`${PATHS.assets}/img`},
      {from: `${PATHS.src}/static`, to: ''}
    ])
  ],
}