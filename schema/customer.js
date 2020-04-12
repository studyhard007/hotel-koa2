const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('customer', {
      // 顾客id
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
      // 普通管理员手机号(账号)
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'phone',
        },
        // 普通管理员登录密码
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password'
        },
        // 是否是超级管理员
        issuper: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'issuper'
        },
        // 创建时间
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        // 更新时间
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })

}