"use strict";

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

      {
        spotId: 2,
        userId: 1,
        startDate: "06-06-2000",
        endDate: "06-16-2000",
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "07-07-2007",
        endDate: "07-17-2007",
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "08-08-2008",
        endDate: "08-18-2008",
      }, {
        spotId: 2,
        userId: 1,
        startDate: "09-09-2009",
        endDate: "09-19-2009",
      }, {
        spotId: 2,
        userId: 1,
        startDate: "10-10-2010",
        endDate: "10-10-2010",
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
