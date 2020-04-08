const CheckInModel = require('../modules/checkin');

class checkinController {
  /**
   * 创建入住信息记录
   * @param ctx
   * @return {Promise.<void>}
   */
  static async createcheckin(ctx) {
    // 接受客户端
    let req = ctx.request.body;
    if(req.number 
      && req.type
      && req.decoration 
      && req.price 
      && req.customername
      && req.customeridcard
      && req.checkintime
      && req.checkouttime
      && req.ischeckout) {
        try {
          const ret = await CheckInModel.createCheckIn(req);
          ctx.response.status = 200;
          ctx.body = {
            code: 200,
            msg: '创建入住记录成功',
            data: ret
          }
        }catch(err) {
          ctx.response.status = 412;
          ctx.body = {
            code: 412,
            msg: '创建入住记录失败',
            data: err
          }
        }
      }else {
        ctx.response.status = 416;
        ctx.body = {
          code: 416,
          msg: '参数不齐全',
        }
      }
  }

      /**
     * 获取所有入住记录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getallcheckinrecord(ctx) {
      try{
          // 获取数据库全部入住信息记录
          let data = await CheckInModel.getAllCheckInRecord();
          ctx.response.status = 200;
          ctx.body = {
              code: 200,
              msg: '查询成功',
              data
          }
      }catch (err) {
          ctx.response.status = 412;
              ctx.body = {
                  code: 412,
                  msg: '查询失败',
                  data
              }
      }
  }
}

module.exports  =  checkinController;