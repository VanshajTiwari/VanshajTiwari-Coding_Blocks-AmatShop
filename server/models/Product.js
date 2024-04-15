const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: false,
  },
  saleTime: {
    type: Date || null,
    required: false,
    default: null,
  },
  reviews: [
    {
      username: String,
      rating: Number,
      comment: String,
    },
  ]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;