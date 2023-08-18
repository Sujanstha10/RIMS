"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsToMany(models.products, {
        through: models.productOrder,
        foreignKey: "orderId",
        otherKey: "productId",
      });
      order.belongsTo(models.customer, {
        foreignKey: "customerId",
        as: "customer",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      order.hasMany(models.productOrder)
    }
  }
  order.init(
    {
      customerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "customer",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: "order",
    }
  );
  return order;
};
