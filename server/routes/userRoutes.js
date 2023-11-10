const { Router } = require('express');
const userController = require('../controllers/userController')
const { requireAdmin } = require('../middleware/authMiddleware')
const router = Router();

router.get('/', requireAdmin, userController.getAllUsers);
router.get('/profile', userController.getUser);
router.post('/Updateprofile', userController.updateUserDetail);

module.exports = router;