const router = require('express').Router();
const {
  getUsers, getUserByID, getCurrentUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');
const {
  validateCurrentUser, validateUserById, validateUpdateUserInfo, validateUpdateUserAvatar,
} = require('../midlewares/validatons');

router.get('/', getUsers);

router.get('/me', validateCurrentUser, getCurrentUser);

router.get('/:id', validateUserById, getUserByID);

router.patch('/me', validateUpdateUserInfo, updateUserInfo);

router.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);

module.exports = router;
