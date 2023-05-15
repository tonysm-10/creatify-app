const mongoose = require('mongoose');
const db = require('../config/connection');
const Product = require('../models/Product');
const productSeeds = require('./productSeeds.json');

db.once('open', async () => {
  try {
    await Product.deleteMany({});
    await Product.create(productSeeds);

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});