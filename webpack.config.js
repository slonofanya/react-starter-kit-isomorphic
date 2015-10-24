var
  path = require('path'),
  fs = require('fs'),
  _ = require('lodash'),
  webpack = require('webpack'),

  commonConfig = {
    context: __dirname + "/app",

    output: {
      path: __dirname + "/dist"
    },

    module: {
      loaders: [
        {
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },

        {
          test: /\.html$/,
          loader: "file?name=[name].[ext]"
        }
      ]
    },

    //resolve: {
    //  modulesDirectories: ['node_modules'],
    //  alias: {},
    //  extensions: ['', '.jsx', '.js']
    //},
    externals: (function () {
      var nodeModules = {};
      fs.readdirSync('node_modules')
        .filter(function (x) {
          return ['.bin'].indexOf(x) === -1;
        })
        .forEach(function (mod) {
          nodeModules[mod] = 'commonjs ' + mod;
        });

      return nodeModules;
    })()
  },

  //browserConfig = _.merge({}, commonConfig, {
  //  entry: {
  //    javascript: './browser.js',
  //    html: './index.html'
  //  },
  //  output: {
  //    filename: './public/js/bundle.js'
  //  }
  //}),

  serverConfig = _.merge({}, commonConfig, {
    entry: {
      javascript: './serve.js',
      html: './index.html'
    },
    output: {
      filename: './serve.js'
    },
    target: 'node'
  })
  ;

//module.exports = [browserConfig, serverConfig];
module.exports = [serverConfig];