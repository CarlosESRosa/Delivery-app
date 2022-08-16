const ERRORS = require('../consts/Errors');
const { User, Sale, Product, SaleProduct } = require('../../database/models');

const create = async (data) => {
  const { products, ...saleData } = data;

  saleData.saleDate = new Date();

  const sale = await Sale.create(saleData);

  const promises = products.map((product) => SaleProduct.create({
    saleId: sale.id,
    productId: product.id,
    quantity: product.value,
  }));

  await Promise.all(promises);
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
  const sale = await Sale.findByPk(saleId, { include: [{
      model: Product,
      as: 'sales',
      attributes: ['id', 'name', 'price', 'url_image'],
    }, {
      model: User, as: 'user', attributes: ['id', 'name', 'role'],
    }, {
      model: User, as: 'seller', attributes: ['id', 'name', 'role'],
    }],
  });
  if (!sale) return { error: ERRORS.NotFound };
  const field = role === 'customer' ? 'userId' : 'sellerId';
  if (sale[field] !== userId) return { error: ERRORS.Conflict };
  return sale;
};

const validateStatus = (userRole) => {
  const status = {
    seller: ['Preparando', 'Pendente'],
    customer: ['Em Trânsito'],
  };
  
  return (
    (userRole === 'seller' && !status.seller.includes(status))
    || (userRole === 'customer' && !status.customer.includes(status))
  );
};

const update = async (saleId, userId, userRole, status) => {
  const sale = await Sale.findByPk(saleId, {raw: true});
  if (!sale) return { error: ERRORS.NotFound };

  if (sale.userId != userId && sale.sellerId != userId) return { error: ERRORS.Conflict };
  if (!validateStatus(userRole)) return { error: ERRORS.Conflict };
  
  await Sale.update({ status }, { where: { id: saleId } });

  return Sale.findByPk(saleId);
};

module.exports = { create, findAll, findById, update };
