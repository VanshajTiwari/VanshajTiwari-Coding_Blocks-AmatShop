const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Set a minimum value of 0
  },
  price: {
    type: Number,
    required: true,
  },
  // You can add more properties specific to cart items if needed
});

const userCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a pre-save hook to remove items with a quantity less than 1
userCartSchema.pre('save', function(next) {
  this.items = this.items.filter(item => item.quantity >= 1);
  next();
});

const UserCart = mongoose.model('UserCart', userCartSchema);

module.exports = UserCart;
