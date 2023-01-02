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
const isDev = process.env.npm_lifecycle_event === 'app-watch';
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
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: true, sourceMap: isDev }
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
    port: 5001,
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
      patterns: [{ from: 'src', to: 'public' }]
    }),
    isCheckType &&
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: './tsconfig.json'
        }
      }),
    !isDev && new MiniCssExtractPlugin(),
    new Dotenv()
    // new BundleAnalyzerPlugin()
  ].filter(Boolean)
};
