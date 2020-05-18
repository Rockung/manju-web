const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

module.exports = {
  entry: {
    manjusri: ['./src/main.js'],
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: { loader: 'svelte-loader', options: { emitCss: true, hotReload: true } },
      },
      {
        test: /\.css$/,
        // MiniCssExtractPlugin doesn't support.
        // For developing, use style-loader instead.
        use: [prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
  ],
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          pure_funcs: ["console.log"]
        }
      }
    })],
  },
  mode,
  devtool: prod ? false : 'source-map',
}
