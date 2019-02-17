/*eslint no-console: "off"*/
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const webpackDevServer = require('./webpackDevServer');

const domainsRouter = require('./routes/domains');
const productRouter = require('./routes/product');
const coloursRouter = require('./routes/colours');

const app = express();
const port = process.env.PORT || 3100;

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/domain', domainsRouter);
app.use('/api/product', productRouter);
app.use('/api/colour', coloursRouter);

//catch all request and reload correct route after refreshing the page
app.get('*', (request, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    const filename = path.resolve(webpackDevServer.config.output.path, 'index.html');
    webpackDevServer.compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return res(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  } else {
    res.sendFile(path.join(__dirname + '/', 'index.html'));
  }
  next();
});

//Start server
app.listen(port, 'localhost', () => {
  console.info('============================');
  console.info(`\x1b[33mBackend started at port:${port}`);
});
