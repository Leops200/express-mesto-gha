require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const validationErrors = require('celebrate').errors;
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

const ERROR_SERVER_CODE = 500;

// Слушаем 3000 порт
// const { PORT = 3000 } = process.env;
const PORT = process.env.PORT || 3000;
const DATA_BASE = process.env.DATA_BASE || 'mongodb://localhost:27017/mestodb';

const app = express();

mongoose.connect(DATA_BASE);
/*
app.get('/user', (req, res) => {
  console.log("test get");

  res.send({isTest: "1233544"});
})

app.use((req, res, next) => {
  req.user = {
    _id: '644a52787e7f73995231f3d3',
  };

  next();
});
*/

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use('/', router);
app.use(validationErrors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_SERVER_CODE, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_SERVER_CODE ? 'На сервере произошла ошибка' : message,
    });

  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
