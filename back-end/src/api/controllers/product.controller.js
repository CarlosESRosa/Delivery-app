const Product = require('../services/product.service');

const findAll = async (req, res) => {
  const product = await Product.findAll();

  return res.status(200).json(product);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (product.error) return next(product.error);

  return res.status(200).json(product);
};

module.exports = { findAll, findById };
