const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi)
const {
  getAllCards, addNewCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getAllCards);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
}), deleteCard);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), addNewCard);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
}), dislikeCard);

module.exports = router;
