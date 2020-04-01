const Router = require('koa-router')
const ArticleController = require('../controllers/article')
const CustomerController = require('../controllers/customer')

const router = new Router({
    prefix: '/api/v1'
})

/**
 * 文章接口
 */
// 创建文章接口（路由）
router.post('/article', ArticleController.create);
// 获取文章详情接口（路由）
router.get('/article/:id', ArticleController.detail);
/**
 * 顾客接口
 */
router.post('/addcustomer', CustomerController.create);
// 获取顾客详情接口（路由）
router.get('/customer/:id', CustomerController.detail);
// 获取全部顾客接口
router.get('/getcustomerlist', CustomerController.allcustomer);
// 删除某个顾客
router.post('/deletecustomer', CustomerController.delete);
module.exports = router