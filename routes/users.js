const router = require('express').Router();

const {
  getAllUsers,
  getUserId,
  getProfile,
  updateProfil,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserId);
router.get('/me', getProfile);
router.patch('/me', updateProfil);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
