require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const validationErrs = require('celebrate').errors;
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errProcess = require('./middlewares/errorsProcess');

// const bcrypt = require('bcryptjs');
// const User = require('./models/user');

// =====================================================
// Слушаем 3000 порт
// const { PORT = 3000 } = process.env;
const PORT = process.env.PORT || 3000;
const DATA_BASE = process.env.DATA_BASE || 'mongodb://localhost:27017/mestodb';

const app = express();

mongoose.connect(DATA_BASE);
/*
app.post('/signup', (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      password: user.password,
    }))
    .catch((err) => res.status(422).send({ message: err.message, err }));
}); */

/*
console.log('-start test');
console.log(req.headers);
console.log('- end test -');
res.send(req.headers); */

/*
app.use((req, res, next) => {
  req.user = {
    _id: '644a52787e7f73995231f3d3',
  };

  next();
});
*/

app.use(express.json());
app.use(cookieParser());
app.use('/', router);
app.use(validationErrs());
app.use(errProcess);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
