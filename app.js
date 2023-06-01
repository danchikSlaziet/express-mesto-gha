const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

const ERR404 = 404;
const ERR400 = 400;
const ERR500 = 500;
module.exports = {
  ERR404,
  ERR400,
  ERR500,
};
// eslint-disable-next-line max-len
// почему-то монгоДБ по 127.0.0.1 подключается, если надо, попробую в конфиге или package.json(короче хз где) поправить это
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('MongoDB подключён'))
  .catch(() => console.log('MongoDB не подключён'));

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64784f1ed9080c0d23d34c10',
  };

  next();
});
app.use('/users', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res) => {
  res.status(ERR404).send({ message: 'Кривой маршрут, прочитайте документацию к API' });
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
