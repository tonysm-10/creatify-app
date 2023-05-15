const { Schema, model } = require('mongoose');

const storeSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  storeName: {
    type: String,
    required: true,
  },
  colorBackground: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  storeLogo: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const Store = model('Store', storeSchema);

module.exports = Store;
