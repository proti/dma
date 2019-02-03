const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

const mode = process.env.NODE_ENV || 'development';
const isProd = mode === 'production';
const port = process.env.PORT || 3000;
const publicHost = `http://localhost:${port}`;
const proxyHost = 'http://localhost:3100';

module.exports = {
  mode,
  entry: [
    `${SRC_DIR}/index.jsx`, `webpack-dev-server/client?${publicHost}`
  ],
  output: {
    path: DIST_DIR,
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }, {
      test: /\.scss$/,
      use: [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            sourceMap: true,
            camelCase: true,
            localIdentName: '[local]___[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            sourceMap: true
          }
        },
        'sass-loader'
      ]
    }]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    public: publicHost,
    proxy: {
      '**': {
        target: proxyHost,
        secure: false,
        changeOrigin: true
      }
    },
    host: '0.0.0.0',
    port,
    stats: {
      colors: true,
      builtAt: true,
      providedExports: false,
      excludeModules: true,
      excludeAssets: true,
      hash: false,
      entrypoints: false,
      version: false,
      timings: false,
      children: false
    },
    open: true,
    openPage: 'index.html',
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      showWarnings: true,
      template: `${SRC_DIR}/index.html`
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash:5].css' : '[name].css',
      chunkFilename: isProd ? '[id].[contenthash:5].css' : '[id].css'
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.(js|jsx)$/,
        parallel: true,
        exclude: /node_modules/,
        terserOptions: {
          warnings: false
        }
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true
            }
          }]
        }
      })
    ]
  }
};
