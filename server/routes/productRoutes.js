const { Router } = require('express');
const { requireAdmin } = require('../middleware/authMiddleware')
const productController = require('../controllers/productController')
const router = Router();

router.get('/', productController.getProduct);
router.post('/addProduct', requireAdmin, productController.addProduct);
router.post('/updateProduct', requireAdmin, productController.updateProduct);
router.post('/deleteProduct', requireAdmin, productController.deleteProduct);

module.exports = router;