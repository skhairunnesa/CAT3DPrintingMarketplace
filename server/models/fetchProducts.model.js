const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_name: { type: String, required: true },
  description: {type: String, required: true},
  prooduct_price: {type: Number, required:true},
  imageURL: {type: String, required:true},
// optional array of strings for tagging items in the cart

  
}, {
  timestamps: true,
});

const fetchProduct = mongoose.model('fetchProduct', productSchema);

module.exports = fetchProduct;
