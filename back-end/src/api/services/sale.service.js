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

const validateStatus = (userRole) => {
  const status = {
    seller: ['Preparando', 'Em Trânsito', 'Entregue'],
    customer: ['Entregue'],
  };
  
  return !(
    (userRole === 'seller' && !status.seller.includes(status))
    || (userRole === 'customer' && !status.customer.includes(status))
  );
};

const update = async (saleId, userId, userRole, status) => {
  const sale = await Sale.findByPk(saleId);

  if (!sale) return { error: ERRORS.NotFound };

  if (sale.userId || sale.sellerId !== userId) return { error: ERRORS.Conflict };

  if (!validateStatus(userRole)) return { error: ERRORS.Conflict };
  
  await Sale.update({ status }, { where: { id: saleId } });

  return Sale.findByPk(saleId);
};

module.exports = { create, findAll, findById, update };
