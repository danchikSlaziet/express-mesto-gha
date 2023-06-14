const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { ERR404, ERR400, ERR500 } = require('../utils/error-codes');

const getYourself = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(() => res.send({ message: 'ошибка в контроллере getyourself' }));
};
const login = (req, res) => {
  const { password, email } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ user });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
const getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(ERR500).send({ message: 'На сервере произошла ошибка' }));
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
        message: 'На сервере произошла ошибка',
      });
    });
};
const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((user) => res.status(201).send({
      user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR400).send({
          message: 'Переданы некорректные данные',
        });
        return;
      }
      res.status(ERR500).send({
        message: 'На сервере произошла ошибка',
      });
    });
};
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(ERR404).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR400).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
        return;
      }
      res.status(ERR500).send({
        message: 'Ошибка по умлочанию',
      });
    });
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      res.status(ERR500).send({ message: 'Ошибка по умлочанию' });
    });
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getYourself,
};
