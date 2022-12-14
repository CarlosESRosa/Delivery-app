const { Router } = require('express');
const rescue = require('express-rescue');
const nameValidation = require('../middlewares/nameValidation');
const emailValidation = require('../middlewares/emailValidation');
const passwordValidation = require('../middlewares/passwordValidation');
const User = require('../controllers/user.controller');
const { validateToken } = require('../auth/token');

const router = Router();

router.get('/me', validateToken, rescue(User.findById));
router.post('/', nameValidation, emailValidation, passwordValidation, rescue(User.create));
router.post('/admin', validateToken, nameValidation, emailValidation, passwordValidation,
  rescue(User.createWithRole));
router.get('/seller', rescue(User.findSellers));

module.exports = router;
