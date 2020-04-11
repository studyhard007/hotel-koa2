const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "checkin",
    {
      // 入住信息id
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
      },
      // 入住房间编号
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "number",
      },
      // 房间类型
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "type",
      },
      // 装潢类型
      decoration: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "decoration",
      },
      // 价格
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "price",
      },
      // 入住人姓名
      customername: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "customername",
      },
      // 入住人身份证
      customeridcard: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "customeridcard",
      },
      // 入住时间
      checkintime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "checkintime",
      },
      // 退房时间
      checkouttime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "checkouttime",
      },
      // 是否已经退房
      ischeckout: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "ischeckout",
      },
      // 创建时间
      createdAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("createdAt")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      // 更新时间
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("updatedAt")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
    },
    {
      // 如果为 true 则表的名称和 model 相同，即 user
      // 为 false MySQL创建的表名称会是复数 users
      // 如果指定的表名称本就是复数形式则不变
      freezeTableName: true,
    }
  );
};
