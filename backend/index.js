/*eslint no-console: "off"*/
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const util = require('util');
const webpackDevServer = require('./webpackDevServer');
const db = require('./db');
const {
  GET_DATASET,
  REMOVE_DICTIONARY
} = require('./routes');

const {
  NO_DICT_ID_SPECIFIED,
  DICT_NOT_EXISTS
} = require('./errors');

const app = express();
const port = process.env.PORT || 3100;

app.use(express.json());
app.use(morgan('tiny'));

app.get(GET_DATASET, (req, res) => {
  res.send(db);
});

app.delete(REMOVE_DICTIONARY, (req, res) => {
  const id = req.params.id;
  const idNum = +id;
  if (idNum == null) {
    return res.status(400).json({
      message: NO_DICT_ID_SPECIFIED
    });
  }
  const items = db.filter(item => item.id !== idNum);
  if (items) {
    res.send({
      success: true
    });
  } else {
    res.status(400).json({
      message: util.format(DICT_NOT_EXISTS, id)
    });
  }
});

// app.post('/add', (req, res) => {
//   const id = dict.length;
//   const newItem = {
//     id,
//     label: `label ${id}`
//   };
//   dict = [...dict, newItem];
//   res.send({
//     ...dict
//   });
// });

// app.get('/edit/:id', (req, res) => {
//   const editItem = dict.find(item => item.id === req.params.id);
//   if (!editItem) {
//     return res.status(404).send('no item');
//   }
//   res.send(editItem);
// });

// app.get('/delete/:id', (req, res) => {
//   res.send('delete:', req.params);
// });

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
