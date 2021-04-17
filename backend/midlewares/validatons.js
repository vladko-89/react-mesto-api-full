const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const redExLink = /^https?:\/\/(www\.)?([a-z0-9-]*\.)?([a-z0-9-]*)\.([a-z0-9-]*)(\/([\w\-.~:/?#[]@!\$&'\(\)\*\+,;=])*)?/;

const validateCurrentUser = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().min(2).max(200).required(),
  }).unknown(),
});

const validateUserById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().min(2).max(200).required(),
  }).unknown(),
});

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().min(2).max(200).required(),
  }).unknown(),
});

const validateUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (redExLink.test(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    }),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().min(2).max(200).required(),
  }).unknown(),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      if (redExLink.test(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    }),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().min(2).max(200).required(),
  }).unknown(),
});

const validateLikeCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().min(2).max(200).required(),
  }).unknown(),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().min(18).required(),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
});

module.exports = {
  validateCurrentUser,
  validateUserById,
  validateUpdateUserInfo,
  validateUpdateUserAvatar,
  validateCreateUser,
  validateLogin,
  validateDeleteCard,
  validateLikeCard,
  validateCreateCard,
};
