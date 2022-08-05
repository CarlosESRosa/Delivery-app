const { Router } = require('express');
const rescue = require('express-rescue');
const Product = require('../controllers/product.controller');

const router = Router();

router.get('/:id', rescue(Product.findById));
router.get('/', rescue(Product.findAll));

module.exports = router;
