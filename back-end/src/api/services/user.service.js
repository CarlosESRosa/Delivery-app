const md5 = require('md5');
const ERRORS = require('../consts/Errors');

const { User } = require('../../database/models');

const create = async (userData) => {
  const hasUser = await User.findOne({ where: { email: userData.email } });

  if (hasUser) return { error: ERRORS.Conflict };

  const { password, ...otherData } = userData;

  const encryptedPassword = md5(password);

  const user = await User.create({ ...otherData, password: encryptedPassword, role: 'customer' });

  return User.findByPk(user.id, {
    attributes: ['id', 'name', 'email', 'role'],
    raw: true,
  });
};

const createWithRole = async (userRole, userData) => {
  if (userRole !== 'admin') return { error: ERRORS.Conflict };
  const hasUser = await User.findOne({ where: { email: userData.email } });

  if (hasUser) return { error: ERRORS.Conflict };

  const { password, ...otherData } = userData;

  const encryptedPassword = md5(password);

  const user = await User.create({ ...otherData, password: encryptedPassword });

  return User.findByPk(user.id, {
    attributes: ['id', 'name', 'email', 'role'],
    raw: true,
  });
};

const findById = async (userId) => User.findByPk(userId, {
  attributes: ['id', 'name', 'email', 'role'],
  raw: true,
});

const findByField = async (field, value) => User.findAll({
  where: {
    [field]: value,
  },
  attributes: ['id', 'name', 'email', 'role'],
  raw: true,
});

const login = async (email, password) => {
  const user = await User.findOne({ where: { email }, raw: true });
  const encryptedPassword = md5(password);

  if (!user || user.password !== encryptedPassword) return { error: ERRORS.NotFound };

  return user;
};

const findAllSellers = () => User.findAll({ where: { role: 'seller' } });

module.exports = { create, createWithRole, findById, findByField, findAllSellers, login };
