const router = require('koa-router')();
const article = require('../controllers/articles');

router.get('/getArticlesByPagination',article.getArticlesByPagination);

module.exports = router.routes();