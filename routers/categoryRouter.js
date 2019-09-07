const router = require('koa-router')();
const categories = require('../controllers/categories');

router.get('/getAllCategories',categories.getAllCategories);
router.post('/addNewCategory',categories.addNewCategory);
router.post('/editCategoryByid',categories.editCategoryById);
router.post('/deleteCategoryById',categories.deleteCategoryById);

module.exports = router.routes();