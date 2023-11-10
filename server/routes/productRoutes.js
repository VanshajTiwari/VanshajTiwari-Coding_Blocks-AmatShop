const { Router } = require('express');
const { requireAdmin } = require('../middleware/authMiddleware')
const { upload } = require('../middleware/picUploadMiddleware')
const productController = require('../controllers/productController')
const router = Router();

router.get('/', productController.getProduct);
router.post('/addProduct', requireAdmin, upload.any(), productController.addProduct);
router.post('/updateProduct:productId', requireAdmin, productController.updateProduct);
router.post('/deleteProduct:productId', requireAdmin, productController.deleteProduct);
router.post('/reviewProduct:productId',  productController.reviewProduct);

module.exports = router;