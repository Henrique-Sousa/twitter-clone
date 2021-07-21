const router = require('express').Router();
const user_controller = require('../controllers/userController');

router.get('/', user_controller.index);

module.exports = router;
