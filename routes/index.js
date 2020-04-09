const Router = require('koa-router');
const ArticleController = require('../controllers/article');
const CustomerController = require('../controllers/customer');
const RoomController = require('../controllers/room');
const CheckInController = require('../controllers/checkin');
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
// 添加顾客
router.post('/addcustomer', CustomerController.create);
// 获取顾客详情接口（路由）
router.get('/customer/:id', CustomerController.detail);
// 获取全部顾客接口
router.get('/getcustomerlist', CustomerController.allcustomer);
// 删除某个顾客
router.post('/deletecustomer', CustomerController.delete);
/**
 * 房间接口
 */
// 录入房间信息
router.post('/createroom', RoomController.createroom);
// 查询某个房间
router.get('/roomdetail/:id', RoomController.roomdetail);
// 获取全部房间
router.get('/getroomlist', RoomController.allroom);
// 删除某个房间
router.post('/deleteroom', RoomController.deleteroom);
// 按条件查询房间
router.post('/searchroom', RoomController.findsome);
// 编辑房间
router.post('/roomcheckin', RoomController.roomcheckin);
/**
 * 入住信息登记接口
 */
// 退房
router.post('/checkinrecord', CheckInController.roomcheckout)
// 获取所有入住记录
router.get('/getallcheckinrecord', CheckInController.getallcheckinrecord);
// 根据条件查询入住记录
router.post('/searchcheckrecord', CheckInController.findsomerecord);
module.exports = router