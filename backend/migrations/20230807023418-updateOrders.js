'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'productOrderId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'productOrders',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('orders', 'productOrderId');
  }
};
