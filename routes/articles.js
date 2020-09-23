const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const BadRequest = require('../errors/400-bad-request-err');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { isUrlValidate } = require('../models/url-valid');

articlesRouter.get('/', getArticles);

articlesRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required().min(2),
    source: Joi.string().required().min(2),
    link: Joi.string().required().custom(isUrlValidate),
    image: Joi.string().required().custom(isUrlValidate),
  }),
}), createArticle);

articlesRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().length(24).hex().error(() => new BadRequest('неверный id')),
  }),
}), deleteArticle);

module.exports = articlesRouter;
