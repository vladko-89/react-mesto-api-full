const Card = require('../models/card');
const PathNotFoundError = require('../errors/path-non-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки!'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardByID = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new PathNotFoundError('Карточка с указанным _id не найдена!');
      } else if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Доступ ограничен! Нельзя удалять чужие карточки!');
      } else {
        Card.findByIdAndRemove(req.params.id)
          // eslint-disable-next-line no-shadow
          .then((card) => {
            res.send(card);
          });
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Переданы некорректные данные при удалении карточки!'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      next(new PathNotFoundError('Карточка с указанным _id не найдена!'));
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Переданы некорректные данные при постановке лайка!'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      next(new PathNotFoundError('Карточка с указанным _id не найдена!'));
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Переданы некорректные данные при снятии лайка!'));
      } else {
        next(err);
      }
    });
};
