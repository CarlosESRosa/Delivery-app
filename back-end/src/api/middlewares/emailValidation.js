const Joi = require('joi');

const emailValidation = (req, res, next) => {
  const { email } = req.body;

  const { error } = Joi.object({
    email: Joi.string().email().required(),
  }).validate({ email });

  if (error) return next(error);

  return next();
};

module.exports = emailValidation;
