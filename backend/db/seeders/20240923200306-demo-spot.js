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
        {
          address: "723 north street",
          city: "austin",
          state: "OHIO",
          country: "USA",
          lat: 72.4173,
          lng: 100.9071,
          name: "The-Get-away",
          price: 8000.51,
          ownerId: 2,
        },
        // {
        //   address: "200 south street",
        //   city: "miami",
        //   state: "FLORIDA",
        //   country: "USA",
        //   lat: 125.7617,
        //   lng: 180.1918,
        //   name: "POLKA-get-away",
        //   price: 7222.51,
        //   ownerId: 5,
        // },
        // {
        //   address: "720 north street",
        //   city: "chance",
        //   state: "kentucky",
        //   country: "USA",
        //   lat: 240.4173,
        //   lng: 382.9071,
        //   name: "Kentucky-Get-away",
        //   price: 5622.51,
        //   ownerId: 3,
        // },
        // {
        //   address: "600 south street",
        //   city: "newyork",
        //   state: "Newyork",
        //   country: "USA",
        //   lat: 225.7617,
        //   lng: 480.1918,
        //   name: "Newyork-get-away",
        //   price: 10522.51,
        //   ownerId: 4,
        // },
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
    await queryInterface.bulkDelete("Spot");

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
