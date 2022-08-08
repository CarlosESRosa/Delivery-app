const { Router } = require('express');
const rescue = require('express-rescue');
const Sale = require('../controllers/sale.controller');
const { validateToken } = require('../auth/token');

const router = Router();

router.post('/', validateToken, rescue(Sale.create));
router.get('/:id', validateToken, rescue(Sale.findById));
router.get('/', validateToken, rescue(Sale.findAll));

module.exports = router;
