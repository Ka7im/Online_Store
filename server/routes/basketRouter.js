const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', authMiddleware, basketController.create);
router.patch('/increase', authMiddleware, basketController.increase);
router.patch('/decrease', authMiddleware, basketController.increase);
router.get('/', basketController.getAll);

module.exports = router;
