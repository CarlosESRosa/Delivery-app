const { Router } = require('express');
const user = require('./user');
const login = require('./login');
const product = require('./product');

const router = Router();

router.use('/user', user);
router.use('/product', product);
router.use('/login', login);

module.exports = router;
