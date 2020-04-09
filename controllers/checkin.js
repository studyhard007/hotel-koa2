const CheckInModel = require('../modules/checkin');
const RoomModel = require('../modules/room');
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

     /**
   * 按条件查询入住记录
   * @param ctx
   * @return {Promise.<Modal>}
   */
  static async findsomerecord(ctx) {
    let req = ctx.request.body;
    if(req.customername || req.customeridcard || req.type || req.decoration) {
      try {
        let data = await CheckInModel.findSomeRecord(req);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          mas: '查询成功',
          data
        }
      }catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          mas: '查询失败',
          data: err
        }
      }
    } else {
      let data = await CheckInModel.getAllCheckInRecord();
      ctx.response = status = 200;
      ctx.body = {
        code: 200,
        msg: '查询全部',
        data
      }
    }
  }

           /**
     * 编辑具体id的房间(退房)
     * @param ctx
     * @returns {Promise<Modal>}
     */
    static async roomcheckout(ctx) {
      let req = ctx.request.body;
      if(req.ischeckout && req.isfree && req.id) {
        try {
          let ret = await CheckInModel.roomCheckOut(req);
          let res = await RoomModel.roomCheckOut(req);
          ctx.response.status = 200;
          ctx.body = {
            code: 200,
            msg: '退房成功',
            ret,
            res
          }
        }catch(err) {
          ctx.response.status = 412;
          ctx.body = {
            code: 412,
            msg: '退房失败',
            data: err
          }
        }
      } else {
        ctx.response.status = 416;
        ctx.body = {
          code: 416,
          msg: '参数不齐全',
        }
      }
    }
}

module.exports  =  checkinController;