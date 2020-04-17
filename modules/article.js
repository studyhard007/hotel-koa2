// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require("../config/db");
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const SequelizeOp = require("sequelize");
const Op = SequelizeOp.Op;
const Article = Sequelize.import("../schema/article");
// 自动创建表
Article.sync({ alter: true });

class ArticleModel {
  /**
   * 创建文章模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createArticle(data) {
    return await Article.create({
      type: data.type, // 房间类型
      price: data.price, // 价格
      checkouttime: data.checkouttime, // 入账时间
      decoration: data.decoration, // 装潢类型
    });
  }

  /**
   * 查询账单详情数据
   * @param id  文章ID
   * @returns {Promise<Model>}
   */
  static async getArticleDetail(id) {
    return await Article.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 查询账单该段时间数据
   * @param ctx
   * @returns {Promise<Model>}
   */

  static async findSomeBillInquiry(ctx) {
    return await Article.findAll({
      where: {
        //    [Op.and]: [{checkouttime: {[Op.gte]: ctx.searchtime[0]}}, {checkouttime: {[Op.lte]: ctx.searchtime[1]}}]
        // checkouttime: ctx.searchtime,
        checkouttime: {
          [Op.between]: [ctx.start_at, ctx.end_at],
        },
      },
    });
  }

  /**
   * 获取账单列表
   * @param ctx
   * @returns {Promise<Model>}
   */
  static async getBillInquirylist() {
    return Article.findAll();
  }
}

module.exports = ArticleModel;
