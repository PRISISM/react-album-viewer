module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
    // loader for JS
    {
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'handlebars' : 'handlebars/dist/handlebars.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
