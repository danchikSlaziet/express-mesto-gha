const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, addNewCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getAllCards);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
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
    cardId: Joi.string().alphanum(),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
}), dislikeCard);

module.exports = router;
