const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
  console.log('Порт запустился (listen)');
});
