const express = require('express');

const router = express.Router();
const util = require('util');

const { NO_COLOURS_DOMAIN_ID_SPECIFIED, COLOURS_DOMAIN_NOT_EXISTS } = require('../errors');
const db = require('../db');

let coloursDomains = db.coloursDomains;

router.get('/all', (req, res) => {
  const items = coloursDomains.map(domain => {
    const { id, name } = domain;
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

router.delete('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.post('/:id', (req, res) => {
  const id = req.params.id;
  const idNum = +id;
  const newDomain = { ...req.body };
  const restDomains = coloursDomains.filter(dict => dict.id !== idNum);
  coloursDomains = [...restDomains, newDomain].sort((a, b) => a.id - b.id);
  res.json({
    success: true
  });
});

module.exports = router;
