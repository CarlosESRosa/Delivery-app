const ERRORS = require('../consts/Errors');
const { Sale, Product, SaleProduct } = require('../../database/models');

const create = async (data) => {
  const { products, ...saleData } = data;

  saleData.saleDate = new Date();

  const sale = await Sale.create(saleData);

  products.forEach(async (product) => {
    SaleProduct.create({
      saleId: sale.id,
      productId: product.id,
      quantity: product.quantity,
    });
  });

  return sale;
};

const findAll = async (id, role) => {
  const field = role === 'customer' ? 'userId' : 'sellerId';

  return Sale.findAll({
    where: { [field]: id },
    include: [{
      model: Product,
      as: 'sales',
      attributes: ['id', 'name', 'price', 'url_image'],
    }],
  });
};

const findById = async (userId, role, saleId) => {
  const sale = await Sale.findByPk(saleId, {
    include: [{
      model: Product,
      as: 'sales',
      attributes: ['id', 'name', 'price', 'url_image'],
    }],
  });

  if (!sale) return { error: ERRORS.NotFound };

  const field = role === 'customer' ? 'userId' : 'sellerId';

  if (sale[field] !== userId) return { error: ERRORS.Conflict };

  return sale;
};

const update = async (saleId, data) => Sale.update(saleId, data);

module.exports = { create, findAll, findById, update };
