const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

const { ERR404 } = require('./utils/error-codes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('MongoDB подключён'))
  .catch(() => console.log('MongoDB не подключён'));

app.use(express.json());
app.use(cookieParser());
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);

app.use('/users', userRouter);
app.use('/', cardRouter);
app.use('/*', (req, res) => {
  res.status(ERR404).send({ message: 'Кривой маршрут, прочитайте документацию к API' });
});
app.use((err, req, res, next) => {
  if (err.code === 11000) {
    res.status(409).send({ message: 'Аккаунт с этой почтой уже зарегистрирован' });
  }
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Пользователь по указанному ID не найден, либо ID пользователя не подходит под стандарт ObjectID' });
  }
  res.status(err.statusCode).send({ message: err.message });
  next();
});
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
