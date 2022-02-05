const {resolve, join} = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: resolve(__dirname, '../src/scripts/index.ts')
  },
  output: {
    path: join(__dirname, '../build'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [resolve(__dirname, '../build')]
      }),
    new CopyWebpackPlugin({
      patterns: [
        { from: resolve(__dirname, '../public'), to: 'public' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/index.html')
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, '../src')
    },
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          },
          {
            loader: 'tslint-loader',
          },
        ]
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        include: resolve(__dirname, '../src'),
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            }
          },
        ]
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          },
          {
            loader: 'tslint-loader',
          },
        ]
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
    ]
  }
};
