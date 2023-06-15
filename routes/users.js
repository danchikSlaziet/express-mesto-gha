const router = require('express').Router();
const {
  getAllUsers, getUserById, updateProfile, updateAvatar, getYourself,
} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

router.get('/', getAllUsers);
router.get('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), getYourself);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatar);
module.exports = router;
