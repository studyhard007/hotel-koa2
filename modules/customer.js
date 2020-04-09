// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的顾客数据表模型文件
const Customer = Sequelize.import('../schema/customer');
// 自动创建表
Customer.sync({alter: true});

class CustomerModel {
    /**
     * 创建顾客模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createCustomer(data) {
        return await Customer.create({
            phone: data.phone,
            password: data.password,
            issuper: false,
        })
    }

    /**
     * 查询是否存在该管理员账号
     * @param phone  管理员手机号
     * @returns {Promise<Model>}
     */
    static async getCustomerDetail(phone) {
        return await Customer.findOne({
            where: {
                phone,
            },
        })
    }
     /**
     * 查询数据表里所有管理员信息
     * @param none
     * @returns {Promise<Model>}
     */
    static async getAllCustomer() {
        return await Customer.findAll()
    }

        /**
     * 删除某个管理员
     * @param id  管理员ID
     * @returns {Promise<Model>}
     */

     static async deleteCustomer(id) {
         return await Customer.destroy({
             where:{
                id,
             },
         })
     }
}

module.exports = CustomerModel;