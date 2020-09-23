const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const usersRoutes = require('./users');
const articlesRouter = require('./articles');
const { auth } = require('../middlewares/auth');
const { nonExistentPaths } = require('../controllers/non-existent-paths');

router.post('/api/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/api/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.use('/api/users', auth, usersRoutes);
router.use('/api/articles', auth, articlesRouter);
router.use('/*', nonExistentPaths);

module.exports = router;
