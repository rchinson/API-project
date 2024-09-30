"use strict";
const { ReviewImage } = require("../models");
const { Op } = require('sequelize');
let options = {};

if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const demoReviewImages=[ 
  {
  reviewId: 1,
  url: "https://upload.wikimedia.org/wikipedia/commons/3/36/Texas_capitol_day.jpg",
  },

  {
    reviewId: 2,
    url: "https://i.pinimg.com/736x/f4/a5/5a/f4a55a745c3a0cd78c2819df00530ba7.jpg",
  },

  {
    reviewId: 3,
    url: "https://img-9gag-fun.9cache.com/photo/aggGm21_460s.jpg",
  },

  {
    reviewId: 4,
    url: "https://bgr.com/wp-content/uploads/2023/10/rsz_gettyimages-1718280422.jpg?quality=82&strip=all&w=1020&h=574&crop=1",
  },

  {
    reviewId: 5,
    url: "https://www.shutterstock.com/image-photo/santa-cruz-california-usa-january-260nw-1133279981.jpg",
  },

  {
    reviewId: 6,
    url: "https://i.pinimg.com/originals/f1/73/d2/f173d2b22479e646db8c9cc92e02ddb7.jpg",
  },

  {
    reviewId: 7,
    url: "https://allears.net/wp-content/uploads/2021/01/2021-allears-wallpapers-cinderella-castle-4-768x1024.jpg",
  },

  {
    reviewId: 8,
    url: "https://media.npr.org/assets/img/2022/05/24/gettyimages-1240857647-25c2cc77d125239d3340d14428d9e24dd5c19092.jpg",
  },
]

const reviewImagesDelete = demoReviewImages.map( (reviewImage) => {
  return reviewImage.reviewId;
})

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */


    await ReviewImage.bulkCreate(demoReviewImages);
  },

  async down(queryInterface, Sequelize) {
    
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, 
      { where: { 

      reviewId: { [Op.in]: reviewImagesDelete }
    } 
  });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
