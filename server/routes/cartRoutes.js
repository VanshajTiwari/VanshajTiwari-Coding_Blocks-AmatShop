const { Router } = require('express');
const cartController = require('../controllers/cartController')
const { checkAddress } = require('../middleware/addressMiddleware')
const router = Router();

router.get('/', cartController.viewCart);
router.post('/addToCart', cartController.addToCart);
router.post('/updateCartItem', cartController.updateCartItem);
router.post('/removeFromCart', cartController.removeFromCart);
router.post('/checkout', checkAddress, cartController.checkout);
router.post('/create-checkout-session', cartController.checkout2);

module.exports = router;