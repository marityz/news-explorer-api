const Article = require('../models/article');
const NotFoundError = require('../errors/404-not-found-err');
const BadRequest = require('../errors/400-bad-request-err');
const ForbiddenError = require('../errors/403-forbidden-err');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      if (!articles) {
        throw new NotFoundError('Еще нет сохраненных статей');
      }
      return res.send(articles);
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const id = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner: id,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest(err.name);
      }
      return err;
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Такой такой статьи нет');
      }
      return article;
    })
    .then((article) => {
      if (article.owner._id.toString() === req.user._id) {
        article.remove(req.params.articleId);
        return res.status(200).send({ message: 'Статья удалена' });
      }
      throw new ForbiddenError('Недостаточно прав');
    })
    .catch(next);
};
