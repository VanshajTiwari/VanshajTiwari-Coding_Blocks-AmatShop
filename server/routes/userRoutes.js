const { Router } = require('express');
const userController = require('../controllers/userController')
const { requireAdmin } = require('../middleware/authMiddleware')
const router = Router();

router.get('/', userController.getAllUsers);
router.get('/profile', userController.getUser);
router.post('/Updateprofile', userController.updateUserDetail);
router.post('/deleteUser:userId', requireAdmin, userController.deleteUser);

module.exports = router;