const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js',
  },
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
        exclude: /node_modules/,
      },
      { test: /\.ts$/, use: 'ts-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      { enforce: 'pre', test: /\.ts$/, loader: 'tslint-loader' },
    ],
  },
  resolve: {
    // https://webpack.js.org/configuration/resolve/#resolve-alias
    alias: {
      '@web': path.resolve(__dirname, './src/'),
    },
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
    }),
  ],
}
