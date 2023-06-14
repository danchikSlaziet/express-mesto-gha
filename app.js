const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const cookieParser = require('cookie-parser');

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
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
