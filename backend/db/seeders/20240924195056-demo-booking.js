"use strict";
const { Statement } = require("sqlite3");
const { Booking } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: "01-01-2000",
        endDate: "01-14-2000",
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "02-01-2000",
        endDate: "02-14-2000",
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "03-01-2000",
        endDate: "03-14-2000",
      },
      {
        spotId: 3,
        userId: 2,
        startDate: "04-01-2000",
        endDate: "04-14-2000",
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "05-01-2000",
        endDate: "05-14-2000",
      },
    ]);

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Booking");

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
