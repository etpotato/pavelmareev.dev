const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [
  new CleanWebpackPlugin(),
  new StylelintPlugin(),
  new ESLintWebpackPlugin({
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    failOnError: isProd,
    quiet: !isProd,
  }),
  new HtmlWebpackPlugin({
    template: './src/index.twig',
  }),
];

if (isProd) plugins.push(new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }));

module.exports = {
  mode: isProd ? 'production' : 'development',
  target: isProd ? 'browserslist' : 'web',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.twig$/,
        use: [
          'html-loader',
          'twig-html-loader',
        ],
      },
      {
        test: /\.s([ac]|c)ss$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.[jt]sx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[base]',
        },
      },
    ],
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    port: 3000,
  },
  stats: isProd ? 'normal' : 'minimal',
};
