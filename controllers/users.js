const User = require('../models/user');

const ERR400 = 400;
const ERR500 = 500;

const getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(ERR500).send({ message: 'Ошибка по умолчанию' }));
};
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(ERR404).send({ message: 'Пользователь по указанному ID не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR400).send({
          message: 'Пользователь по указанному ID не найден, либо ID пользователя не подходит под стандарт ObjectID',
        });
        return;
      }
      res.status(ERR500).send({
        message: 'Ошибка по умолчанию',
      });
    });
};
const addNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR400).send({
          message: 'Переданы некорректные данные',
        });
        return;
      }
      res.status(ERR500).send({
        message: 'Ошибка по умолчанию',
      });
    });
};
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      // eslint-disable-next-line max-len
      if ((user.name.length < 30 && user.name.length > 1) && (user.about.length < 30 && user.about.length > 1)) {
        res.send({ data: user });
      } else {
        res.status(ERR400).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      }
    })
    .catch(() => {
      res.status(ERR500).send({
        message: 'Ошибка по умлочанию',
      });
    });
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(ERR500).send({ message: 'Ошибка по умлочанию' }));
};
module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  updateProfile,
  updateAvatar,
};
