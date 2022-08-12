const { generateToken } = require('../auth/token');
const User = require('../services/user.service');

const create = async (req, res, next) => {
  const user = await User.create(req.body);

  if (user.error) return next(user.error);
  
  const token = generateToken(user);

  return res.status(201).json({ token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.login(email, password);

  if (user.error) return next(user.error);

  const token = generateToken(user);
  
  return res.status(200).json({ token });
};

const createWithRole = async (req, res, next) => {
  const { user: { role } } = req;

  const user = await User.createWithRole(role, req.body);

  if (user.error) return next(user.error);
  
  return res.status(201).json(user);
};

const findById = async (req, res) => {
  const { user } = req;

  const data = await User.findById(user.id);

  return res.status(200).json(data);
};

const findSellers = async (req, res) => {
  const data = await User.findAllSellers();

  return res.status(200).json(data);
};

module.exports = { create, createWithRole, findById, findSellers, login };
