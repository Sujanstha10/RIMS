'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins',[
      {
        name:"superadmin@gmail.com",
        password:bcrypt.hashSync("Superadmin@123",8),
        email:"superadmin@gmail.com",
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
