const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    mode: process.env.NODE_ENV,
    entry: [
      path.resolve(process.cwd(), './client/src/index.js'),
    ],
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    devServer: {
      publicPath: '/dist',
      proxy: {
        '/': 'http://localhost:3000',
      },
      hot: true,
    },
    module: {
    rules: [

      {
        test: /.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
  {
    test: /.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react', '@babel/preset-env'],
      },
    },
  },
    {
      test: /test.js$/,
      use: 'mocha-loader',
      exclude: /node_modules/,
    },
        {
          test: /.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
    {
      test: /.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader',
      ],
    },
]},resolve: {
	extensions: ['.js', '.tsx', '.ts', '.jsx', ]},
plugins: [
  new HtmlWebpackPlugin({appMountId: 'app',filename: 'index.html'}), 
  new CleanWebpackPlugin(), 
  new MiniCssExtractPlugin(), 
]
}