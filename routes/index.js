const router = require('express').Router();
const authRouter = require('./authorization');
const usersRoutes = require('./users');
const articlesRouter = require('./articles');
const { auth } = require('../middlewares/auth');
const { nonExistentPaths } = require('../controllers/non-existent-paths');

router.use('/', authRouter);
router.use('/users', auth, usersRoutes);
router.use('/articles', auth, articlesRouter);
router.use('/*', nonExistentPaths);

module.exports = router;
