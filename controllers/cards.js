const Card = require('../models/card');

const CODE = 200;
const CREATED_CODE = 201;
const ERROR_BAD_REQUEST_CODE = 400;
const ERROR_NOT_FOUND_CODE = 404;
const ERROR_SERVER_CODE = 500;

const {
  //CastError,
  ValidationError
} = require('mongoose').Error;
//======================================================

module.exports.createCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATED_CODE).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res
          .status(ERROR_BAD_REQUEST_CODE)
          .send(
            //message: `Некорректные данные ${ERROR_BAD_REQUEST_CODE}`,
            console.log("bad createCards")
          );
      }
      return res.status(ERROR_SERVER_CODE).send(
       // message: `Ошибка сервера ${ERROR_SERVER_CODE}`,
        console.log("2bad createCards")
      );
    });
};
//======================================================

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.status(CODE).send(card);
    })
    .catch(() => {
      res
        .status(ERROR_SERVER_CODE)
        .send({
          message: `Ошибка сервера ${ERROR_SERVER_CODE}`,
        });
    });
};
//======================================================

module.exports.addLike = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND_CODE)
          .send({
            message: `Несуществующий _id карточки ${ERROR_NOT_FOUND_CODE}`,
          });
      }
      return res.status(CODE).send(card);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res
          .status(ERROR_BAD_REQUEST_CODE)
          .send({
            message: `Некорректные данные ${ERROR_BAD_REQUEST_CODE}`,
          });
      }
      return res.status(ERROR_SERVER_CODE).send({
        message: `Ошибка сервера ${ERROR_SERVER_CODE}`,
      });
    });
};
//======================================================

module.exports.removeLike = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND_CODE)
          .send({
            message: `Несуществующий _id карточки ${ERROR_NOT_FOUND_CODE}`,
          });
      }
      return res.status(CODE).send(card);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res
          .status(ERROR_BAD_REQUEST_CODE)
          .send({
            message: `Некорректные данные ${ERROR_BAD_REQUEST_CODE}`,
          });
      }
      return res.status(ERROR_SERVER_CODE).send({
        message: `Ошибка сервера ${ERROR_SERVER_CODE}`,
      });
    });
};
//======================================================

module.exports.deleteCards = (req, res) => {
  const { cardId } = req.params;
  Card.deleteOne({ _id: cardId })
    .then((card) => {
      if (card.deletedCount !== 0) {
        return res.send({ message: 'Удаление выполнено' });
      }
      return res
        .status(ERROR_NOT_FOUND_CODE)
        .send({
          message: `Нет карточки с указанным _id ${ERROR_NOT_FOUND_CODE}`,
        });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res
          .status(ERROR_NOT_FOUND_CODE)
          .send({
            message: `Hекорректные данные ${ERROR_NOT_FOUND_CODE}`,
          });
      }
      return res.status(ERROR_SERVER_CODE).send({
        message: `Ошибка сервера ${ERROR_SERVER_CODE}`,
      });
    });
};
