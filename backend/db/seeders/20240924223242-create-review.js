"use strict";

const { Review } = require("../models");

const { Op } = require('sequelize');

const demoReviews = [
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
]

const reviewsDelete = demoReviews.map((review) => {
  return review.userId;
})


module.exports = {

  async up(queryInterface, Sequelize) {

    await Review.bulkCreate(demoReviews);

 
  },


  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("Reviews",
      {
        userId: { [Op.in]: reviewsDelete }
      }
    );
  
  },
};
