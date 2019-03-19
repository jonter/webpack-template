// npm install postcss-loader autoprefixer css-mqpacker cssnano --save-dev
// all the necessary modules to process css files
module.exports = {
  plugins: [
    require('autoprefixer'), //add prefixes for css properties
    require('css-mqpacker'), //Pack same CSS media query rules into one using PostCSS
    require('cssnano')({     // compress css file
      preset: [
        'default', {
          discardComments: {
            removeAll: true,// remove all the comments from css file
          }
        }
      ]
    })
  ]
}
