'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Texas_capitol_day.jpg',
          preview: true,
        },

        {
          url: 'https://en.wikipedia.org/wiki/Miami_Beach,_Florida#/media/File:Miamimetroarea.jpg',
          preview: true,
        },

        {
          url:'https://upload.wikimedia.org/wikipedia/commons/3/37/Ohio_Stadium_infobox_crop.JPG',
          preview: true,
        },

        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Sphere-exosphere-on-Jan-26-2024.jpg',
          preview: true,
        },

        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Santa_Cruz%2C_CA%2C_USA_-_panoramio_%2810%29.jpg',
          preview: true,
        },

        {
          url: 'https://en.wikipedia.org/wiki/Golden_Gate_Bridge#/media/File:Golden_Gate_Bridge_as_seen_from_Battery_East.jpg',
          preview: true,
        },

        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Cinderella_Castle%2C_Magic_Kingdom_Walt_Disney_World_2024_%28square_crop%29.jpg',
          preview: true,
        },

        {
          url: 'https://en.wikipedia.org/wiki/Statue_of_Liberty#/media/File:Front_view_of_Statue_of_Liberty_with_pedestal_and_base_2024.jpg',
          preview: true,
        },
        
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
