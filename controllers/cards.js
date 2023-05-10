/*
const {
  // CastError,
  ValidationError,
} = require('mongoose').Error;
*/
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const Card = require('../models/card');

const {
  CODE,
  CREATED_CODE,
  // const ERROR_BAD_REQUEST_CODE = 400;
  ERROR_NOT_FOUND_CODE,
  // const ERROR_SERVER_CODE = 500;
} = require('../utils/utils');

//= =====================================================

module.exports.createCards = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATED_CODE).send({ data: card }))
    .catch(next);
};

//= =====================================================

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((card) => {
      res.status(CODE).send({ data: card });
    })
    .catch(next);
};
//= =====================================================

const cardCheck = (card, res) => {
  if (card) {
    return res.send({ data: card });
  }
  return res
    .status(ERROR_NOT_FOUND_CODE)
    .send({ message: `Карточка с таким _id отсутствует ${ERROR_NOT_FOUND_CODE}` });
};
//= =====================================================

const upLikes = (req, res, upData, next) => {
  Card.findByIdAndUpdate(req.params.cardId, upData, { new: true })
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((user) => cardCheck(user, res))
    .catch(next);
};
//= =====================================================

module.exports.addLike = (req, res, next) => {
  const owner = req.user._id;
  const newData = { $addToSet: { likes: owner } };
  upLikes(req, res, newData, next);
};
//= =====================================================

module.exports.removeLike = (req, res, next) => {
  const owner = req.user._id;
  const newData = { $pull: { likes: owner } };
  upLikes(req, res, newData, next);
};
//= =====================================================

module.exports.deleteCards = (req, res, next) => {
  const _id = req.params.cardId;
  Card.findOne({ _id })
    .populate([
      { path: 'owner', model: 'user' },
    ])
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка удалена');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new Forbidden('Не достаточно прав');
      }
      Card.findByIdAndDelete({ _id })
        .populate([
          { path: 'owner', model: 'user' },
        ])
        .then((cardDelete) => {
          res.send({ data: cardDelete });
        });
    })
    .catch(next);
};
