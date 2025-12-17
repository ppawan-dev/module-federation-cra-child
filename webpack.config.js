const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'), // the bundle output path
    filename: 'index.js', // the name of the bundle
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html', // to import index.html file inside index.js
    }),
    new ModuleFederationPlugin({
      name: 'craChild',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './Header': './src/Header.js',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        // Add other shared dependencies
      },
    }),
  ],
  devServer: {
    port: 3031, // you can change the port
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: 'url-loader',
        options: { limit: false },
      },
    ],
  },
};
