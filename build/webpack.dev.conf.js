// webpack configuration for development
const webpack =  require('webpack');// just SourceMapDevTool
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', //for faster map bundle 
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist, // show where to open dev server
    port: 8081,// use another port for this server, otherwise it may cause errors when listen to another servers (which commonly use 8080 port)
    overlay: true // to show error logs in the browser
  },
  plugins:[
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
});

module.exports = new Promise((resolve,reject)=>{
  resolve(devWebpackConfig);
});
