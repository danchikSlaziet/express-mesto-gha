const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({
      message: 'Ошибка по умолчанию', name: err.name, error: err.message, stack: err.stack,
    }));
};
const addNewCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные', name: err.name, error: err.message, stack: err.stack,
        });
        return;
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию', name: err.name, error: err.message, stack: err.stack,
      });
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
        res.status(404).send({ message: 'Карточка с данным ID не найдена' });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: 'Карточка с данным ID не найдена', name: err.name, error: err.message, stack: err.stack,
      });
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
        res.status(404).send({ message: 'Карточка с данным ID не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'ID карточки не подходит под стандарт ObjectID', name: err.name, error: err.message, stack: err.stack,
        });
        return;
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию', name: err.name, error: err.message, stack: err.stack,
      });
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
        res.status(404).send({ message: 'Карточка с данным ID не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'ID карточки не подходит под стандарт ObjectID', name: err.name, error: err.message, stack: err.stack,
        });
        return;
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию', name: err.name, error: err.message, stack: err.stack,
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
