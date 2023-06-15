const Error404 = require('../errors/Error404');
const Card = require('../models/card');

const { ERR404 } = require('../utils/error-codes');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};
const addNewCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new Error404('Карточка с данным ID не найдена');
      } else if (card.owner.toString() === req.user._id.toString()) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((cardItem) => res.send({ data: cardItem }))
          .catch(next);
      } else {
        // Почему-то при несуществующем ID может возвращаться
        // ответ null, поэтому пришлось сделать этот блок if/else
        res.status(403).send({ message: 'у вас нет прав на удаление чужой карточки' });
      }
    })
    .catch(next);
};
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(ERR404).send({ message: 'Карточка с данным ID не найдена' });
      }
    })
    .catch(next);
};
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(ERR404).send({ message: 'Карточка с данным ID не найдена' });
      }
    })
    .catch(next);
};
module.exports = {
  getAllCards,
  addNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
