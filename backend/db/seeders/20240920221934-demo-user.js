"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          firstName: "john",
          lastName: "spoon",
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "chance",
          lastName: "chuck",
          email: "user1@user.io",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "call",
          lastName: "help",
          email: "user2@user.io",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password3"),
        },

        {
          firstName: "simon",
          lastName: "says",
          email: "simon@says.com",
          username: "simonuser",
          hashedPassword: bcrypt.hashSync("simonpassword"),
        },
        {
          firstName: "howard",
          lastName: "stern",
          email: "howard@gmail",
          username: "howarduser",
          hashedPassword: bcrypt.hashSync("howardpassword"),
        },
        {
          firstName: "christano",
          lastName: "ronaldo",
          email: "christiano@gmail.com",
          username: "christianouser",
          hashedPassword: bcrypt.hashSync("christanopassword"),
        },
        {
          firstName: "jerry",
          lastName: "rice",
          email: "jerry@gmail.com",
          username: "jerryuser",
          hashedPassword: bcrypt.hashSync("jerrypassword"),
        },
        {
          firstName: "bob",
          lastName: "melvin",
          email: "bob@gmail.com",
          username: "bobuser",
          hashedPassword: bcrypt.hashSync("bobpassword"),
        },
        { validate: true }
      ],
      
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2",'simonuser','howarduser','christianouser','jerryuser','bobuser'] },
      },
      {}
    );
  },
};
