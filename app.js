const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('MongoDB подключён'))
  .catch(() => console.log('MongoDB не подключён'));

app.use(express.json());
app.use('/', router);
app.use((req, res, next) => {
  req.user = {
    _id: '64784f1ed9080c0d23d34c10',
  };

  next();
});
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
