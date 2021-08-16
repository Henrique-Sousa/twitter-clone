const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.index);
router.get('/:user_id', userController.show);

module.exports = router;
