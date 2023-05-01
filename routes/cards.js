const router = require('express').Router();

const {
  getAllCards,
  createCards,
  deleteCards,
  addLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', createCards);
router.delete('/:cardId', deleteCards);
router.put('/:cardId/likes', addLike);
router.delete('/:cardId/likes', removeLike);

module.exports = router;
