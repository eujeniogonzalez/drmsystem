import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { WEBPACK_DEVSERVER_PORT } from './src/const/api-const';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: './fonts/[name][ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: WEBPACK_DEVSERVER_PORT,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      filename: 'index.html'
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackInjector(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'public', 'fonts'),
          to: path.join(__dirname, 'build', 'fonts'),
          noErrorOnMissing: true
        },
        {
          from: path.join(__dirname, 'public', 'images'),
          to: path.join(__dirname, 'build', 'images'),
          noErrorOnMissing: true
        },
        {
          from: path.join(__dirname, 'public', '.htaccess'),
          to: path.join(__dirname, 'build'),
          noErrorOnMissing: true
        }
      ],
    })
  ]
};

export default config;