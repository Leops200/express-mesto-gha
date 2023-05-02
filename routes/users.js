const router = require('express').Router();

const {
  getAllUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/qw');

router.get('/', getAllUsers);
router.get('/:userId', getUserId);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
