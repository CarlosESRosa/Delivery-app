const { Router } = require('express');
const rescue = require('express-rescue');
const emailValidation = require('../middlewares/emailValidation');
const passwordValidation = require('../middlewares/passwordValidation');
const User = require('../controllers/user.controller');

const router = Router();

router.post('/', emailValidation, passwordValidation, rescue(User.login));

module.exports = router;
