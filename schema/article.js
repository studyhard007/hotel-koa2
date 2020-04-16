const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "article",
    {
      // 账单记录ID
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
      },
      // 房间类型
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "type",
      },
      // 装潢类型
      decoration: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "decoration",
      },
      // 价格
      price: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "price",
      },
      // 入账时间
      checkouttime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "checkouttime",
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
