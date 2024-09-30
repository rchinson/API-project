"use strict";


const { Spot } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          address: "81 north street",
          city: "Austin",
          state: "TEXAS",
          country: "USA",
          lat: 40.4173,
          lng: 82.9071,
          name: "Get-away",
          description: 'A spot in texas!',
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
          description: 'A good spot!',
          price: 3232.51,
          ownerId: 1,
        },
        {
          address: "723 north street",
          city: "Columbus",
          state: "OHIO",
          country: "USA",
          lat: 72.4173,
          lng: 100.9071,
          name: "The-Get-away",
          description: 'A good in ohio!',
          price: 8000.51,
          ownerId: 2,
        },
        {
          address: "2234 Vegas street",
          city: "Las Vegas",
          state: "Nevada",
          country: "USA",
          lat: 222.1232,
          lng: 133.2254,
          name: "Desert Vacation",
          description: 'A good spot in vegas!',
          price: 3400.51,
          ownerId: 3,
        },
        {
          address: "997 Western drive",
          city: "Santa Cruz",
          state: "CALIFORNIA",
          country: "USA",
          lat: 224.4332,
          lng: 211.1224,
          name: "Beach House",
          description: 'A good spot in santa cruz!',
          price: 8000.51,
          ownerId: 4,
        }, {
          address: "434 Up street",
          city: "San Francisco",
          state: "CALIFORNIA",
          country: "USA",
          lat: 72.4173,
          lng: 100.9071,
          name: "A City Apartment",
          description: 'A good spot in san francisco!',
          price: 8000.51,
          ownerId: 4,
        },
        {
          address: "1234 Disney street",
          city: "Orlando",
          state: "FLORIDA",
          country: "USA",
          lat: 76.7742,
          lng: 56.4712,
          name: "Disney World",
          description: 'A good spot in florida!',
          price: 8000.51,
          ownerId: 5,
        },
        {
          address: "723 north street",
          city: "New York",
          state: "NEW YORK",
          country: "USA",
          lat: 79.3387,
          lng: 222.5823,
          name: "A Place in Manhattan",
          description: 'A good spot in new york!',
          price: 8000.51,
          ownerId: 6,
        },
       


      ],
      
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
