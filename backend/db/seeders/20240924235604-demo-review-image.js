'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await User.bulkCreate(
      [
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Texas_capitol_day.jpg',
          preview: true,
        },

        {
          url: 'https://i.pinimg.com/736x/f4/a5/5a/f4a55a745c3a0cd78c2819df00530ba7.jpg',
          preview: true,
        },

        {
          url: 'https://img-9gag-fun.9cache.com/photo/aggGm21_460s.jpg',
          preview: true,
        },

        {
          url: 'https://bgr.com/wp-content/uploads/2023/10/rsz_gettyimages-1718280422.jpg?quality=82&strip=all&w=1020&h=574&crop=1',
          preview: true,
        },

        {
          url: 'https://www.shutterstock.com/image-photo/santa-cruz-california-usa-january-260nw-1133279981.jpg',
          preview: true,
        },

        {
          url: 'https://i.pinimg.com/originals/f1/73/d2/f173d2b22479e646db8c9cc92e02ddb7.jpg',
          preview: true,
        },

        {
          url: 'https://allears.net/wp-content/uploads/2021/01/2021-allears-wallpapers-cinderella-castle-4-768x1024.jpg',
          preview: true,
        },

        {
          url: 'https://media.npr.org/assets/img/2022/05/24/gettyimages-1240857647-25c2cc77d125239d3340d14428d9e24dd5c19092.jpg',
          preview: true,
        },
        { validate: true }
      ],
     
    );
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
