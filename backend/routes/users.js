const router = require('express').Router();
const user_controller = require('../controllers/userController');

router.get('/', user_controller.index);
router.get('/:user_id', user_controller.show);

module.exports = router;
