const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const path = require('path')
const appSources = require('./webpack.config.apps-sources')

require('dotenv-defaults/config')

const DEFAULT_PORT = 3020
const deps = require('./package.json').dependencies

const getMFRemotes = () => {
  const localApps = process.env.LOCAL_APPS || ''
  console.log('localApps: ', localApps)
  return appSources.reduce((remotes, source) => {
    const { app, external, local } = source
    const url = localApps.split(',').includes(app) ? local : external
    return {
      ...remotes,
      [app]: `${app}@${url}/remoteEntry.js`,
    }
  }, {})
}

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: process.env.WEBPACK_PORT || DEFAULT_PORT,
    historyApiFallback: true,
  },
  output: {
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_shell',
      filename: 'remoteEntry.js',
      remotes: getMFRemotes(),
      exposes: {},
      shared: {
        react: { eager: true, singleton: true, requiredVersion: deps['react'].version },
        'react-dom': { eager: true, singleton: true, requiredVersion: deps['react-dom'].version },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
