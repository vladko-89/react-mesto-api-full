const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../midlewares/validatons');
const userRouter = require('./users');
const cardsRouter = require('./cards');
const PathNotFoundError = require('../errors/path-non-found-error');
const auth = require('../midlewares/auth');

router.post('/signup', validateCreateUser, createUser);

router.post('/signin', validateLogin, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use((next) => {
  next(new PathNotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
