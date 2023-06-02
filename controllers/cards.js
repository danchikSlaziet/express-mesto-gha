const Card = require('../models/card');

const { ERR404, ERR400, ERR500 } = require('../utils/error-codes');

const getAllCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(ERR500).send({ message: 'На сервере произошла ошибка' }));
};
const addNewCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERR500).send({ message: 'На сервере произошла ошибка' });
    });
};
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        // Почему-то при несуществующем ID может возвращаться
        // ответ null, поэтому пришлось сделать этот блок if/else
        res.status(ERR404).send({ message: 'Карточка с данным ID не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR400).send({ message: 'Карточка с данным ID не найдена' });
      } else {
        res.status(ERR500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
const likeCard = (req, res) => {
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
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR400).send({ message: 'ID карточки не подходит под стандарт ObjectID' });
        return;
      }
      res.status(ERR500).send({ message: 'На сервере произошла ошибка' });
    });
};
const dislikeCard = (req, res) => {
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
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR400).send({ message: 'ID карточки не подходит под стандарт ObjectID' });
        return;
      }
      res.status(ERR500).send({
        message: 'На сервере произошла ошибка',
      });
    });
};
module.exports = {
  getAllCards,
  addNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
