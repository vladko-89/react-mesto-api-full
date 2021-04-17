const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardByID,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validateDeleteCard,
  validateLikeCard,
  validateCreateCard,
} = require('../midlewares/validatons');

router.get('/', getCards);

router.post('/', validateCreateCard, createCard);

router.delete('/:id', validateDeleteCard, deleteCardByID);

router.put('/:id/likes', validateLikeCard, likeCard);

router.delete('/:id/likes', validateLikeCard, dislikeCard);

module.exports = router;
