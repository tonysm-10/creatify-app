const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const productSchema = new Schema(
  {
  productName: {
      type: String,
      required: true,
      unique: true,
      trim: true
  },
  productDescription: {
    type: String,
    required: true,
    unique: true,
    trim: true
},
productCategory: {
  type: String,
  required: true,
  unique: true,
  trim: true
},
productPrice: {
  type: String,
  required: true,
  unique: true,
  trim: true
},
productQuantity: {
  type: String,
  required: true,
  unique: true,
  trim: true
},
productImage: {
  type: String,
  required: true,
  unique: true,
  trim: true
},

}
);

const Product = model('Product', productSchema);

module.exports = Product;
