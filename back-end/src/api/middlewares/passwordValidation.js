const Joi = require('joi');

const passwordValidation = (req, res, next) => {
  const { password } = req.body;

  const { error } = Joi.object({
    password: Joi.string().min(6).required(),
  }).validate({ password });

  if (error) return next(error);

  return next();
};

module.exports = passwordValidation;
