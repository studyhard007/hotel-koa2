const RoomModel = require('../modules/room');
const CheckInModel = require('../modules/checkin');
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
          const data = await RoomModel.getRoomDetail(ret.id);
          ctx.response.status = 200;
          ctx.body = {
            code: 200,
            msg: '创建房间成功',
            data: data
          }
        }catch(err) {
          ctx.response.status = 412;
          ctx.body = {
            code: 412,
            msg: '创建房间失败',
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

     /**
   * 按条件查询房间
   * @param ctx
   * @return {Promise.<Modal>}
   */
   static async findsome(ctx) {
     let req = ctx.request.body;
     if(req.type || req.decoration || req.isfree || req.number) {
       try {
         let data = await RoomModel.findSome(req);
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
       let data = await RoomModel.getAllRoom();
       ctx.response = status = 200;
       ctx.body = {
         code: 200,
         msg: '查询全部',
         data
       }
     }
   }

         /**
     * 编辑具体id的房间(办理入住、退房)
     * @param ctx
     * @returns {Promise<Modal>}
     */
    static async roomcheckin(ctx) {
      let req = ctx.request.body;
      if(req.customername && req.customeridcard 
         && req.checkouttime && req.id && req.deposit && req.roomrate) {
           try {
            let ret = await RoomModel.roomCheckIn(req);
            const data = await RoomModel.getRoomDetail(req.id);
            const res = await CheckInModel.createCheckIn(data);
             ctx.response.status = 200;
             ctx.body = {
               code: 200,
               msg: '编辑房间成功',
               data: data,
               ret,
               res
             }
           }catch(err) {
             ctx.response.status = 412;
             ctx.body = {
               code: 412,
               msg: '编辑房间失败',
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

module.exports = roomController;