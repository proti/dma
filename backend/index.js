/*eslint no-console: "off"*/
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const util = require('util');
const webpackDevServer = require('./webpackDevServer');
const {
  GET_DICTS,
  GET_DICT_BY_ID,
  REMOVE_DICTIONARY,
  ADD_DICTIONARY
} = require('./routes');

const {
  NO_DICT_ID_SPECIFIED,
  DICT_NOT_EXISTS
} = require('./errors');

const app = express();
const port = process.env.PORT || 3100;

let db = require('./db');

app.use(express.json());
app.use(morgan('tiny'));

app.get(GET_DICTS, (req, res) => {
  const items = db.map(dict => {
    const {
      id,
      name
    } = dict;
    return {
      id,
      name
    };
  });
  res.send(items);
});

app.get(GET_DICT_BY_ID, (req, res) => {
  const id = req.params.id;
  const idNum = +id;
  if (idNum == null) {
    return res.status(400).json({
      message: NO_DICT_ID_SPECIFIED
    });
  }
  const item = db.find(dict => dict.id === idNum);
  if (item) {
    setTimeout(() => {
      res.json(item);
    }, 500);
  } else {
    res.status(400).json({
      message: util.format(DICT_NOT_EXISTS, id)
    });
  }
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
    db = [...items];
    setTimeout(() => {
      res.send({
        success: true
      });
    }, 2000);
  } else {
    res.status(400).json({
      message: util.format(DICT_NOT_EXISTS, id)
    });
  }
});


app.post(ADD_DICTIONARY, (req, res) => {
  let newDict = req.body;
  const newDictId = db.length;
  newDict = {
    ...newDict,
    id: newDictId
  };
  db = [...db, newDict].sort((a, b) => a.id - b.id);
  res.send({
    success: true
  });
});

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
