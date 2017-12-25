const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const reload = require('reload');

const app = express();

const compiler = webpack(webpackConfig);

app.use(express.static(`${__dirname}/www`));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

reload(app);

const server = app.listen(3000, () => {
  const port = server.address().port;
  console.log('Example app listening at http://localhost:%s', port);
});
