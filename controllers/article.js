const ArticleModel = require("../modules/article");

class articleController {
  /**
   * 创建文章
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async create(ctx) {
    // 接收客服端
    let req = ctx.request.body;
    if (
      req.type && // 房间类型
      req.price && // 房间价格
      req.checkouttime && // 入账时间
      req.decoration && //装潢类型
      req.billinquiryin //入账日期
    ) {
      try {
        // 创建文章模型
        const ret = await ArticleModel.createArticle(req);
        // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
        const data = await ArticleModel.getArticleDetail(ret.id);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: "创建账单记录成功",
          data,
        };
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 200,
          msg: "创建账单记录失败",
          data: err,
        };
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 200,
        msg: "参数不齐全",
      };
    }
  }

  /**
   * 获取文章详情
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async detail(ctx) {
    let id = ctx.params.id;

    if (id) {
      try {
        // 查询文章详情模型
        let data = await ArticleModel.getArticleDetail(id);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: "查询成功",
          data,
        };
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: "查询失败",
          data,
        };
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: "文章ID必须传",
      };
    }
  }

  /**
   * 查询账单该段时间数据
   * @param ctx
   * @returns {Promise<Model>}
   */

  static async findsomebillinquiry(ctx) {
    let req = ctx.request.body;
    if (req.start_at && req.end_at) {
      try {
        // 查询账单详情模型
        let data = await ArticleModel.findSomeBillInquiry(req);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: "查询成功",
          data,
        };
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: "查询失败",
          data: err,
        };
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: "参数不齐",
      };
    }
  }

  /**
   * 获取所有账单信息
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async getbillinquirylist(ctx) {
    try {
      // 获取数据库全部房间信息
      let data = await ArticleModel.getBillInquirylist();
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: "查询成功",
        data,
      };
    } catch (err) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: "查询失败",
        data: err,
      };
    }
  }

  /**
   * 获取业绩统计
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async getperformance(ctx) {
    let req = ctx.request.body;
    if (req.start_at && req.end_at) {
      try {
        // 获取数据库全部业绩信息
        let data = await ArticleModel.getPerformance(req);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: "查询成功",
          data,
        };
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: "查询失败",
          data: err,
        };
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: "参数不齐",
      };
    }
  }
}

module.exports = articleController;
