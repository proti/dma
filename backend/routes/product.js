const express = require('express');

const router = express.Router();
const util = require('util');

const { NO_DICT_ID_SPECIFIED, DICT_NOT_EXISTS } = require('../errors');

const db = require('../db');

let products = db.products;

router.get('/all', (req, res) => {
  const items = products.map(dict => {
    const { id, name } = dict;
    return {
      id,
      name
    };
  });
  res.json(items);
});

router.get('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.post('/:id', (req, res) => {
  const editDictId = req.params.id;
  const idNum = +editDictId;
  const newDict = { ...req.body };
  const restDicts = products.filter(dict => dict.id !== idNum);
  products = [...restDicts, newDict].sort((a, b) => a.id - b.id);
  res.json({
    success: true
  });
});

module.exports = router;
