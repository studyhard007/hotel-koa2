const db = require('../config/db');
const Sequelize = db.sequelize;
const Room = Sequelize.import('../schema/room');
Room.sync({force: false})

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
      checkouttime: data.checkouttime //退房时间
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
}

module.exports = RoomModel;