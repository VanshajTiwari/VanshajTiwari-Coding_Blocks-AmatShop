const { Router } = require('express');
const orderController = require('../controllers/orderController')
const { requireAdmin } = require('../middleware/authMiddleware')
const router = Router();

router.get('/', requireAdmin, orderController.getAllOrders);
router.get('/userOrder', orderController.getUserOrder);
router.post('/cancelOrder', orderController.cancelOrder);

module.exports = router;