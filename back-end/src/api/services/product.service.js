const ERRORS = require('../consts/Errors');
const { Product } = require('../../database/models');

const create = async (productData) => {
  await Product.create(productData);

  return Product.findByPk(productData.id, {
    attributes: ['id', 'name', 'price', 'url_image'],
    raw: true,
  });
};

const findById = async (productId) => {
  const product = await Product.findByPk(productId, {
    attributes: ['id', 'name', 'price', 'url_image'],
    raw: true,
  });

  if (!product) return { error: ERRORS.NotFound };

  return product;
};

const findByField = async (field, value) => Product.findAll({
  where: {
    [field]: value,
  },
  attributes: ['id', 'name', 'price', 'url_image'],
  raw: true,
});

const findAll = async () => Product.findAll({
  attributes: ['id', 'name', 'price', 'url_image'],
});

const update = async (productId, data) => Product.update(productId, data);

module.exports = { create, findAll, findById, findByField, update };
