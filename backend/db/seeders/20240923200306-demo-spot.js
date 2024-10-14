"use strict";

const { Statement } = require("sqlite3");
const { Spot } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          address: "81 north street",
          city: "austin",
          state: "OHIO",
          country: "USA",
          lat: 40.4173,
          lng: 82.9071,
          name: "Get-away",
          price: 4232.51,
          ownerId: 1,
        },
        {
          address: "72 south street",
          city: "miami",
          state: "FLORIDA",
          country: "USA",
          lat: 25.7617,
          lng: 80.1918,
          name: "miami-get-away",
          price: 3232.51,
          ownerId: 1,
        },
      ],
      { validate: true }
    );
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
