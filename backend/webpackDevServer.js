/*eslint no-console: "off"*/

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');

const compiler = Webpack(webpackConfig);
const port = webpackConfig.devServer.port;
const host = `http://localhost:${port}`;

const server = new WebpackDevServer(compiler, webpackConfig.devServer);

server.middleware.waitUntilValid(() => {
  console.info('----------------------------------------------------');
  console.info(`\x1b[33mWebpack-dev-server strated on ${host}\x1b[0m`);
});

server.listen(port, 'localhost');

module.exports = {
  compiler,
  config: webpackConfig
};
