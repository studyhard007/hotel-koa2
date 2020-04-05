const RoomModel = require('../modules/room');

class roomController {
  /**
   * 创建房间
   * @param ctx
   * @return {Promise.<void>}
   */
  static async createroom(ctx) {
    // 接收客户端
    let req = ctx.request.body;
    if(req.number
      && req.type 
      && req.price 
      && req.decoration
      && req.introduction) {
        try {
          // 创建客房模型
          const ret = await RoomModel.createRoom(req);
          // 把刚刚创建的客房信息返回
          // const data = await RoomModel.getRoomDetail(ret.id);
          ctx.response.status = 200;
          ctx.body = {
            code: 200,
            msg: '创建房间成功',
            ret
          }
        }catch(err) {
          ctx.response.status = 412;
          ctx.body = {
            code: 200,
            msg: '创建房间失败',
            data: err
          }
        }
      } else {
        ctx.response.status = 416;
        ctx.body = {
          code: 200,
          msg: '参数不齐全',
        }
      }
  }

  /**
   * 获取客房详情
   * @param ctx
   * @return {Promise.<void>}
   */
  static async roomdetail(ctx) {
    let id = ctx.params.id;

    if (id) {
        try {
            // 查询顾客详情模型
            let data = await RoomModel.getRoomDetail(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data
            }

        } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '查询失败',
                data: err
            }
        }
    } else {
        ctx.response.status = 416;
        ctx.body = {
            code: 416,
            msg: 'ID必须传'
        }
    }
  }

          /**
     * 获取所有房间
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async allroom(ctx) {
      try{
          // 获取数据库全部房间信息
          let data = await RoomModel.getAllRoom();
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
     * 删除房间
     * @param ctx
     * @returns {Promise<void>}
     */

    static async deleteroom(ctx) {
      let req = ctx.request.body;
      if(req.id) {
          try {
              //删除某个房间
              let data = await RoomModel.deleteRoom(req.id);
              ctx.response.status = 200;
              ctx.body = {
                  code: 200,
                  msg: '删除成功',
                  data
              }
          }catch (err) {
              ctx.response.status = 412;
              ctx.body = {
                  code: 412,
                  msg: '删除失败',
                  data: err
              }
          }
      }else {
          ctx.response.status = 416;
          ctx.body = {
              code: 416,
              msg: 'ID必须传'
          }
      }
   }
}

module.exports = roomController;