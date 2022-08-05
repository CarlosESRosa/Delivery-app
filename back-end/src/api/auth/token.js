require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../../database/models');

const secret = process.env.SECRET_KEY || '0pL7pK19ycN76Vcm1bp7WtJdTt%aQDcj';
const config = {
  expiresIn: '8h',
  algorithm: 'HS256',
};

const validateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ error: { message: 'Token não encontrado.' } });

  try {
    const { data: { id } } = jwt.verify(token, secret);

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json(
        { error: { message: 'Ocorreu um erro ao validar o token.' } },
      );
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ error: { message: 'Internal Server Error' } });
  }
};

const generateToken = (userData) => {
  const token = jwt.sign({ data: userData }, secret, config);
  return token;
};

module.exports = { generateToken, validateToken };
