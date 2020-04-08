const db = require('../config/db');
const Sequelize = db.sequelize;
// const moment = require('moment');
const SequelizeOp = require('sequelize');
const Checkin = Sequelize.import('../schema/checkin');
const Op = SequelizeOp.Op
Checkin.sync({alter: true})

class CheckinModel {
    /**
   * 创建入住信息模型
   * @param data
   * @return {Promise<*>}
   */

   static async createCheckIn(data) {
     return await Checkin.create({
      number: data.number, //房间编号
      type: data.type, // 房间类型
      decoration: data.decoration, // 房间装潢
      price: data.price, //价格
      customername: data.customername, //入住人名字
      customeridcard: data.customeridcard, //入住人身份证
      checkintime: data.checkintime, //入住时间
      checkouttime: data.checkouttime, //退房时间
      ischeckout: data.ischeckout //是否已经退房
     })
   }

    /**
   * 获取所有入住信息
   * @param none
   * @return {Promise<Model>}
   */
  static async getAllCheckInRecord () {
    return await Checkin.findAll()
  }
    /**
     * 根据条件查询入住记录
     * @param ctx
     * @returns {Promise<Modal>}
     */
    static async findSomeRecord(ctx) {
      const op = [];
      if(ctx.customername !== 'undefined'){
        op.push({
          type: {
            [Op.eq]: ctx.customername
          }
        })
      }
      if(ctx.customeridcard !== 'undefined'){
        op.push({
          type: {
            [Op.eq]: ctx.customeridcard
          }
        })
      }
      if(ctx.type !== 'undefined') {
        op.push({type: {
          [Op.eq]:ctx.type
        }})
      }
      if(ctx.decoration !== 'undefined') {
        op.push({decoration: {
          [Op.eq]:ctx.decoration
        }})
      }
      return await Checkin.findAll({
        where: {
          [Op.and]: op
        }
      })
    }
}

module.exports = CheckinModel