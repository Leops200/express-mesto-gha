const router = require('express').Router();

const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');
const signin = require('./signin');
const signup = require('./signup');
const auth = require('../middlewares/auth');

router.use('/users', auth, users);
router.use('/cards', auth, cards);
router.use('/signin', signin);
router.use('/signup', signup);
router.use('*', notFound);

module.exports = router;
