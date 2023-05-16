const mongoose = require('mongoose');
const db = require('../config/connection');
const Product = require('../models/Product');
const Store = require('../models/Store');
const User = require('../models/User');
const productSeeds = require('./productSeeds.json');
const storeSeeds = require('./storeSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await Product.deleteMany({});
    await Store.deleteMany({});
    await User.deleteMany({});

    await Product.create(productSeeds);
    await Store.create(storeSeeds);
    await User.create(userSeeds);

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});