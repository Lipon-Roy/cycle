const express = require('express');
const { getUser, signup } = require('../controllers/userController');
const { addUserValidators, addUserValidationHandler } = require('../middlewares/user/userValidators');

const router = express.Router();

router.get('/', getUser);

// signup user
router.post('/signup', addUserValidators, addUserValidationHandler, signup);

module.exports = router;