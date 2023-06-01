const router = require('express').Router();
const {
  getAllCards, addNewCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getAllCards);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards', addNewCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
