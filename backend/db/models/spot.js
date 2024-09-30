"use strict";
let options = { };
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Spot,{ foreignKey: 'ownerId', onDelete: 'CASCADE' })
      //   Spot.belongsTo(models.User, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
        through: "",
      });
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });

      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });

      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });
    }
  }
  Spot.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Spot",
      ...options
    }
  );
  return Spot;
};
