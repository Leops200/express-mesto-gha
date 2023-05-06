/* Сдана пр13 */

const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
/*
app.get('/user', (req, res) => {
  console.log("test get");

  res.send({isTest: "1233544"});
})
*/
app.use((req, res, next) => {
  req.user = {
    _id: '644a52787e7f73995231f3d3',
  };

  next();
});

app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
