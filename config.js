const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    hot: true,
    publicPath: '/',
    historyApiFallback: true
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        }
      },
      {
        test: /\.svg$/,
        use: {
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]",
          },
        }
      },
      {
        test: /^((?!\.module).)*s?css$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      },
      {
        test: /\.module.s?css$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
        }, {
            loader: "sass-loader"
        }]
      },
      {
        test: /\.jsx?$/,
        // Exclude all of node_modules except those
        // that explicitly require transpiling:
        // https://github.com/webpack/webpack/issues/2031
        // Transpile webpack-dev-server: https://github.com/webpack/webpack-dev-server/issues/1101
        exclude: function(modulePath) {
          return /node_modules/.test(modulePath) &&
            !/node_modules\/webpack-dev-server/.test(modulePath)
        },
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
