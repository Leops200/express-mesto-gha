const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REGEX } = require('../utils/utils');

const {
  getAllUsers,
  getUserId,
  getProfile,
  updateProfil,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getProfile);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserId);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfil);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(REGEX),
  }),
}), updateAvatar);

module.exports = router;
