const Sale = require('../services/sale.service');

const create = async (req, res, next) => {
  const { user, body } = req;

  body.userId = user.id;

  const sale = await Sale.create(body);

  if (sale.error) return next(sale.error);
  
  return res.status(201).json(sale);
};

const findAll = async (req, res) => {
  const { user } = req;

  const data = await Sale.findAll(user.id, user.role);

  return res.status(200).json(data);
};

const findById = async (req, res, next) => {
  const { user, params: { id } } = req;

  const data = await Sale.findById(user.id, user.role, id);

  if (data.error) return next(data.error);

  return res.status(200).json(data);
};

const update = async (req, res, next) => {
  const { user: { role }, params: { id }, body: { status } } = req;

  const sale = await Sale.update(id, role, status);

  if (sale.error) return next(sale.error);

  return res.status(200).json(sale);
};

module.exports = { create, findAll, findById, update };
