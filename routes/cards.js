const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REGEX } = require('../utils/utils');

const {
  getAllCards,
  createCards,
  deleteCards,
  addLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(REGEX),
  }),
}), createCards);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCards);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), addLike);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), removeLike);

module.exports = router;
