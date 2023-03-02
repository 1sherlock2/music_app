import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { GenerateSW, InjectManifest } from 'workbox-webpack-plugin';
// import { workboxConfig } from './workbox-config';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const options = {
  'app-watch': () => ({
    mode: 'development',
    devtool: 'eval-source-map'
  }),
  'app-build': () => ({
    mode: 'production'
  })
};
const isCheckType = process.env.npm_lifecycle_event === 'app-watch-types';
const isDev =
  process.env.npm_lifecycle_event === 'app-watch' ||
  process.env.npm_lifecycle_event === 'dev';
console.log({ isDev });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  ...options[process.env.npm_lifecycle_event](),
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    publicPath: '/',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          isDev ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDev
                  ? '[name]_[local]_[hash:base64:3]'
                  : '[hash:base64:5]'
              },
              sourceMap: isDev
            }
          },
          { loader: 'sass-loader', options: { sourceMap: isDev } }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'node_modules'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    alias: {
      styles: path.resolve(__dirname, './src/styles')
    }
  },
  devServer: {
    port: 5000,
    open: true,
    historyApiFallback: true,
    compress: true,
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'public'),
      publicPath: './'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      favicon: path.resolve(__dirname, './src/images/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      publicPath: './'
      // scriptLoading: 'module'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src', to: 'public' },
        { from: './manifest_icons/64.png', to: '' },
        { from: './manifest_icons/128.png', to: '' },
        { from: './manifest_icons/256.png', to: '' },
        { from: './manifest_icons/512.png', to: '' },
        { from: './manifest.json', to: '' }
      ]
    }),
    isCheckType &&
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: './tsconfig.json'
        }
      }),
    isDev && new MiniCssExtractPlugin(),
    new Dotenv(),
    !isDev &&
      new FaviconsWebpackPlugin({
        logo: './manifest_icons/128.png',
        manifest: './manifest.json',
        persistentCache: true,
        inject: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }),
    !isDev &&
      new InjectManifest({
        swSrc: './src/workers/sw.js',
        swDest: 'sw.js',
        maximumFileSizeToCacheInBytes: 12 * 1024 * 1024
      })
    // new BundleAnalyzerPlugin()
  ].filter(Boolean),
  optimization: {
    minimizer: [
      !isDev && new TerserWebpackPlugin()
      // new OptimizeCssAssetsWebpackPlugin()
    ].filter(Boolean)
  }
};
