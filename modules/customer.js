// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的顾客数据表模型文件
const Customer = Sequelize.import('../schema/customer');
// 自动创建表
Customer.sync({force: false});

class CustomerModel {
    /**
     * 创建顾客模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createCustomer(data) {
        return await Customer.create({
            name: data.name, // 顾客姓名
            gender: data.gender, // 顾客性别
            age: data.age, // 顾客年龄
            idcard: data.idcard, // 顾客身份证
        })
    }

    /**
     * 查询取顾客详情数据
     * @param id  顾客ID
     * @returns {Promise<Model>}
     */
    static async getCustomerDetail(id) {
        return await Customer.findOne({
            where: {
                id,
            },
        })
    }
}

module.exports = CustomerModel