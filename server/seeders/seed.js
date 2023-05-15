const db = require('../config/connection');
const { User, Store, Product } = require('../models');
const userSeeds = require('./userSeeds.json');
const storeSeeds = require('./storeSeeds.json');
const productSeeds = require('./productSeeds.json');

db.once('open', async () => {
  try {
    // Delete all existing data
    await Product.deleteMany({});
    await Store.deleteMany({});
    await User.deleteMany({});

    // Create new users
    const users = await User.create(userSeeds);

   
    for (let i = 0; i < storeSeeds.length; i++) {
      const store = await Store.create({ ...storeSeeds[i], products: [] });

      for (let j = 0; j < productSeeds.length; j++) {
        const product = await Product.create({ ...productSeeds[j], store: store._id });
        store.products.push(product._id);
      }

      await store.save();
    }

    console.log('Data seeded successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
});
