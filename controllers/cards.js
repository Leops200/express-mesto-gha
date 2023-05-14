const Card = require('../models/card');

const {
  // CODE,
  CREATED_CODE,
  // const ERROR_BAD_REQUEST_CODE = 400;
  // ERROR_NOT_FOUND_CODE,
  // const ERROR_SERVER_CODE = 500;
} = require('../utils/utils');

const Forbidden = require('../errors/Forbidden');

//= =====================================================

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};
//= =====================================================

module.exports.createCards = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATED_CODE).send(card))
    .catch(next);
};

//= =====================================================

const upLikes = (req, res, upData, next) => {
  Card.findByIdAndUpdate(req.params.cardId, upData, { new: true })
    .orFail()
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => res.send(card))
    .catch(next);
};
//= =====================================================

module.exports.addLike = (req, res, next) => {
  const ownerId = req.user._id;
  const newData = { $addToSet: { likes: ownerId } };
  upLikes(req, res, newData, next);
};
//= =====================================================

module.exports.removeLike = (req, res, next) => {
  const ownerId = req.user._id;
  const newData = { $pull: { likes: ownerId } };
  upLikes(req, res, newData, next);
};
//= =====================================================

module.exports.deleteCards = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      Card.deleteOne({ _id: card._id, owner: req.user._id })
        .then((result) => {
          if (result.deletedCount === 0) {
            throw new Forbidden(`Пользователь с id ${req.user._id} не добавлял карточку с id ${req.params.cardId}`);
          } else {
            res.send({ message: 'Удалено' });
          }
        })
        .catch(next);
    })
    .catch(next);
};
