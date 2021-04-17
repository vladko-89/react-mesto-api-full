const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../midlewares/validatons');
const userRouter = require('./users');
const PathNotFoundError = require('../errors/path-non-found-error');
const cardsRouter = require('./cards');
const auth = require('../midlewares/auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validateCreateUser, createUser);

router.post('/signin', validateLogin, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use((req, res) => {
  next(new PathNotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
