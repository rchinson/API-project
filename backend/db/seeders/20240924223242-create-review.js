"use strict";
const { Statement } = require("sqlite3");
const { Review } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 1,
        spotId: 1,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        userId: 2,
        spotId: 2,
        review: "BETTER THEN THE BEST!",
        stars: 5,
      },
      {
        userId: 3,
        spotId: 3,
        review: "BETTE THEN THE REST",
        stars: 5,
      },

      {
        userId: 2,
        spotId: 3,
        review: "OKAY",
        stars: 4,
      },
      {
        userId: 1,
        spotId: 3,
        review: "NOT GOOD",
        stars: 2,
      },
      {
        userId: 2,
        spotId: 3,
        review: "AVERAGE",
        stars: 3,
      },

      {
        userId: 3,
        spotId: 2,
        review: "NOT GOOD",
        stars: 2,
      },
      {
        userId: 4,
        spotId: 4,
        review: "PRETTY GOOD",
        stars: 4,
      },
      {
        userId: 5,
        spotId: 4,
        review: "AVERAGE",
        stars: 3,
      },
      {
        userId: 1,
        spotId: 3,
        review: "NOT GOOD",
        stars: 2,
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
