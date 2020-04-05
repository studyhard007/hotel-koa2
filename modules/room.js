const db = require('../config/db');
const Sequelize = db.sequelize;
const SequelizeOp = require('sequelize');
const Room = Sequelize.import('../schema/room');
const Op = SequelizeOp.Op
Room.sync({alter: true})

class RoomModel {
  /**
   * 创建客房模型
   * @param data
   * @return {Promise<*>}
   */

  static async createRoom(data) {
    return await Room.create({
      number: data.number, //房间编号
      type: data.type, // 房间类型
      decoration: data.decoration, // 房间装潢
      price: data.price, //价格
      introduction: data.introduction, //房间描述
      customername: data.customername, //入住人名字
      customeridcard: data.customeridcard, //入住人身份证
      checkintime: data.checkintime, //入住时间
      checkouttime: data.checkouttime, //退房时间
      isfree: (data.customername && data.customeridcard) ? false : true //房间状态是否为空
    })
  }

      /**
     * 查询取客房详情数据
     * @param id  房间ID
     * @returns {Promise<Model>}
     */

    static async getRoomDetail(id) {
      return await Room.findOne({
          where: {
              id,
          },
      })
  }

     /**
     * 获取所有客房
     * @param none
     * @returns {Promise<Model>}
     */
    static async getAllRoom() {
      return await Room.findAll()
    }
    
    /**
     * 删除某个房间
     * @param id 房间id
     * @returns {Promise<Modal>}
     */
    
    static async deleteRoom(id) {
      return await Room.destroy({
          where:{
             id,
          },
      })
  }

      /**
     * 根据条件查询客房
     * @param ctx
     * @returns {Promise<Modal>}
     */
    static async findSome(ctx) {
      const op = [];
      if(ctx.type) {
        op.push({type: {
          [Op.eq]:ctx.type
        }})
      }
      if(ctx.decoration) {
        op.push({decoration: {
          [Op.eq]:ctx.decoration
        }})
      }
      if(ctx.isfree) {
        op.push({isfree: {
          [Op.eq]:ctx.isfree
        }})
      }
      return await Room.findAll({
        where: {
          [Op.and]: op
        }
      })
    }
}

module.exports = RoomModel;