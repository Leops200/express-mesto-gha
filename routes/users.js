const router = require('express').Router();

const {getAllUsers,
      getUserId,
      createUser
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserId);
router.post('/', createUser);

module.exports = router;