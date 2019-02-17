const express = require('express');

const router = express.Router();

const db = require('../db');

let products = db.products;
let colours = db.colours;
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

router.get('/all', (req, res) => res.json(getColours()));

router.post('/all', (req, res) => {
  const newColours = req.body;
  colours = [...newColours];
  res.json({
    success: true
  });
});

router.post('/', (req, res) => {
  const newColour = { id: req.body.id, name: req.body.name };
  colours = [...getColours(), newColour];
  res.json({
    success: true
  });
});
module.exports = router;
