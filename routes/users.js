const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const {
  getAllUsers, getUserById, updateProfile, updateAvatar, getYourself,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getYourself);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId().required(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/),
  }),
}), updateAvatar);
module.exports = router;
