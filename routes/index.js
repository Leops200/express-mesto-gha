const router = require('express').Router();

const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');
const signin = require('./signin');
const signup = require('./signup');
const auth = require('../middlewares/auth');
// const NotFound = require('../errors/NotFound');

router.use(auth);
router.use('/users', auth, users);
router.use('/cards', auth, cards);
router.use('*', notFound);
router.use('/', signin);
router.use('/', signup);

module.exports = router;
