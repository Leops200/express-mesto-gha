const router = require('express').Router();

const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');
const signin = require('./signin');
const signup = require('./signup');
const auth = require('../middlewares/auth');

router.use(auth);
router.use('/users', users);
router.use('/cards', cards);
router.use('*', notFound);
router.use('/signin', signin);
router.use('/signup', signup);

module.exports = router;
