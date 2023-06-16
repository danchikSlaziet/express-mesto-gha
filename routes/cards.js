const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const {
  getAllCards, addNewCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getAllCards);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
}), deleteCard);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/),
  }),
}), addNewCard);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
}), dislikeCard);

module.exports = router;
