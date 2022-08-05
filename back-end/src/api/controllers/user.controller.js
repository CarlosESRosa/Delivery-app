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

module.exports = { create, login };
