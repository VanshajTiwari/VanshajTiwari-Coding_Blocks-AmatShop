const { Router } = require('express');
const { requireAdmin } = require('../middleware/authMiddleware')
const { upload } = require('../middleware/picUploadMiddleware')
const productController = require('../controllers/productController')
const router = Router();

router.get('/', productController.getProduct);
router.post('/addProduct',requireAdmin, upload.any(), productController.addProduct);
router.post('/updateProduct:productId',requireAdmin, upload.any(), productController.updateProduct);
router.post('/deleteProduct:productId',requireAdmin, productController.deleteProduct);
router.post('/announceSale', requireAdmin, productController.sale);
router.post('/reviewProduct:productId',  productController.reviewProduct);

module.exports = router;