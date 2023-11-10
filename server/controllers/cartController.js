const UserCart = require('../models/Cart'); // Import your UserCart model
const Order = require('../models/Orders');
const Product = require('../models/Product');

module.exports.viewCart =  async (req, res) => {
    try {
      const userId = req.session.userId;
  
      // Find the user's cart
      const cart = await UserCart.findOne({ user: userId }).populate('items.product');
  
      if (!cart) {
        return res.status(404).json({});
      }
  
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }

// Add a product to the cart
module.exports.addToCart = async (req, res) => {
  try {
    const user = req.session.userId;
    const { product, quantity } = req.body;

    // Find the user's cart
    let cart = await UserCart.findOne({ user });

    if (!cart) {
      cart = new UserCart({ user, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.product.equals(product));

    if (existingItem) {
      // Update the quantity if the product is already in the cart
      existingItem.quantity += quantity;
    } else {
      // Add the product to the cart
        
      const productM = await Product.findById(product);
      console.log(productM)
      if (product) {
        cart.items.push({ product: productM._id, quantity, price: productM.price });
      }else {
        res.status(500).json({ error: 'Invalid Item' });
      }
      
    }

    // Save the updated cart
    await cart.save();

    res.json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Update the quantity of a product in the cart
module.exports.updateCartItem = async (req, res) => {
  try {
    const user = req.session.userId;
    const { product, quantity } = req.body;

    const cart = await UserCart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartItem = cart.items.find(item => item.product.equals(product));

    if (!cartItem) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    cartItem.quantity = quantity;
    await cart.save();

    res.json({ message: 'Cart item updated successfully', cart });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Delete a product from the cart
module.exports.removeFromCart = async (req, res) => {
  try {
    const user = req.session.userId;
    const { product } = req.body;

    const cart = await UserCart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartItemIndex = cart.items.findIndex(item => item.product.equals(product));

    if (cartItemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    cart.items.splice(cartItemIndex, 1);
    await cart.save();

    res.json({ message: 'Product removed from cart successfully', cart });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};


module.exports.checkout = async (req, res) => {
    try {
      const userId = req.session.userId;
  
      // Find the user's cart
      const cart = await UserCart.findOne({ user: userId }).populate('items.product');
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Create an order from the cart items
      const orderItems = cart.items.map(cartItem => ({
        product: cartItem.product,
        quantity: cartItem.quantity,
        price: cartItem.price,
      }));
  
      const order = new Order({
        user: userId,
        products: orderItems,
        totalAmount: orderItems.reduce((total, item) => total + item.price * item.quantity, 0),
      });
  
      // Save the order and remove the cart
      await order.save();
      await UserCart.deleteOne({ _id: cart._id });
  
      res.json({ message: 'Checkout successful. Your order has been created.', order });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'An error occurred during checkout' });
    }
  };