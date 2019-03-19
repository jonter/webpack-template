const path = require('path')

// a plugin which separates js and css code. github reference: https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: './src/js/index.js'
  },
  output: {
    filename: '[name].js', //gets name from entry key 
    path: path.resolve(__dirname, './dist'), 
    publicPath: '/dist' //for our devServer
  },
  module: {
    rules: [{         //babel setup (also watch .babelIrc file)
      test: /\.js$/,  //regex to include all js files
      loader: 'babel-loader',
      exclude: '/node_modules/'
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
            config: { path: 'src/js/postcss.config.js' } // see postcss.config.js for more information
          }
        }
      ]
    }]
  },
  devServer: {
    overlay: true // to show error logs in the browser
  },
  plugins: [
    new MiniCssExtractPlugin({ //register plugin
      filename: "[name].css"
    })
  ],
}