const Joi = require('joi');

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  const { error } = Joi.object({
    name: Joi.string().min(12).required(),
  }).validate({ name });

  if (error) return next(error);

  return next();
};

module.exports = nameValidation;
