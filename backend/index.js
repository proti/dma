/*eslint no-console: "off"*/
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const util = require('util');
const webpackDevServer = require('./webpackDevServer');
const {
  GET_DICTS_NAMES,
  GET_DICT_BY_ID,
  REMOVE_DICTIONARY,
  ADD_DICTIONARY,
  SAVE_DICT_BY_ID,
  GET_COLOURS,
  EDIT_COLOURS,
  ADD_COLOUR,
  GET_DOMAINS_NAMES,
  GET_DOMAIN_BY_ID,
  REMOVE_DOMAIN,
  SAVE_DOMAINS,
  SAVE_DOMAIN
} = require('./routes');
const {
  NO_DICT_ID_SPECIFIED,
  DICT_NOT_EXISTS,

  NO_COLOURS_DOMAIN_ID_SPECIFIED,
  COLOURS_DOMAIN_NOT_EXISTS
} = require('./errors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3100;

let products = db.products;
let colours = db.colours;
let coloursDomains = db.coloursDomains;

app.use(express.json());
app.use(morgan('tiny'));

app.get(GET_DICTS_NAMES, (req, res) => {
  const items = products.map(dict => {
    const { id, name } = dict;
    return {
      id,
      name
    };
  });
  res.json(items);
});

app.get(GET_DICT_BY_ID, (req, res) => {
  const id = req.params.id;
  const idNum = +id;
  if (idNum == null) {
    return res.status(400).json({
      message: NO_DICT_ID_SPECIFIED
    });
  }
  const item = products.find(dict => dict.id === idNum);
  if (item) {
    res.json(item);
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
  const items = products.filter(item => item.id !== idNum);
  if (items) {
    products = [...items];
    res.json({
      success: true
    });
  } else {
    res.status(400).json({
      message: util.format(DICT_NOT_EXISTS, id)
    });
  }
});

app.post(ADD_DICTIONARY, (req, res) => {
  let newDict = req.body;
  const newDictId = products.length;
  newDict = {
    ...newDict,
    id: newDictId
  };
  products = [...products, newDict].sort((a, b) => a.id - b.id);
  res.json({
    success: true
  });
});

app.post(SAVE_DICT_BY_ID, (req, res) => {
  const editDictId = req.params.id;
  const idNum = +editDictId;
  const newDict = { ...req.body };
  const restDicts = products.filter(dict => dict.id !== idNum);
  products = [...restDicts, newDict].sort((a, b) => a.id - b.id);
  res.json({
    success: true
  });
});

//COLOURS
const getColours = () => {
  if (!colours.length) {
    const coloursFrom = products.map(dict => dict.items.map(item => item.colour));
    const noDuplicates = coloursFrom.reduce((acc, curr) => [...new Set(acc.concat(curr))]);
    const objColour = noDuplicates.map((colour, index) => ({
      id: index,
      name: colour
    }));
    return objColour;
  }
  return colours;
};

app.get(GET_COLOURS, (req, res) => res.json(getColours()));

app.post(EDIT_COLOURS, (req, res) => {
  const newColours = req.body;
  colours = [...newColours];
  res.json({
    success: true
  });
});

app.post(ADD_COLOUR, (req, res) => {
  const newColour = { id: req.body.id, name: req.body.name };
  colours = [...getColours(), newColour];
  res.json({
    success: true
  });
});

//COLOURS DOMAINS
app.get(GET_DOMAINS_NAMES, (req, res) => {
  const items = coloursDomains.map(domain => {
    const { id, name } = domain;
    return {
      id,
      name
    };
  });
  res.json(items);
});

app.get(GET_DOMAIN_BY_ID, (req, res) => {
  const id = req.params.id;
  const idNum = +id;
  if (idNum == null) {
    return res.status(400).json({
      message: NO_COLOURS_DOMAIN_ID_SPECIFIED
    });
  }
  const domain = coloursDomains.find(domain => domain.id === idNum);
  if (domain) {
    res.json(domain);
  } else {
    res.status(400).json({
      message: util.format(COLOURS_DOMAIN_NOT_EXISTS, id)
    });
  }
});

app.delete(REMOVE_DOMAIN, (req, res) => {
  const id = req.params.id;
  const idNum = +id;
  if (idNum == null) {
    return res.status(400).json({
      message: NO_COLOURS_DOMAIN_ID_SPECIFIED
    });
  }
  const items = coloursDomains.filter(item => item.id !== idNum);
  if (items) {
    coloursDomains = [...items];
    res.json({
      success: true
    });
  } else {
    res.status(400).json({
      message: util.format(COLOURS_DOMAIN_NOT_EXISTS, id)
    });
  }
});

app.post(SAVE_DOMAINS, (req, res) => {
  let newDomain = req.body;
  const newDomainId = coloursDomains.length;
  newDomain = {
    ...newDomain,
    id: newDomainId
  };
  coloursDomains = [...coloursDomains, newDomain].sort((a, b) => a.id - b.id);
  res.json({
    success: true
  });
});

app.post(SAVE_DOMAIN, (req, res) => {
  const id = req.params.id;
  const idNum = +id;
  const newDomain = { ...req.body };
  const restDomains = coloursDomains.filter(dict => dict.id !== idNum);
  coloursDomains = [...restDomains, newDomain].sort((a, b) => a.id - b.id);
  res.json({
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
