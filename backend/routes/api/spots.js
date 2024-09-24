const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Spot, User } = require("../../db/models");
const spot = require("../../db/models/spot");

const router = express.Router();

router.get(
  "/current",

  async (req, res) => {
    const { user } = req;

    let spots = [];

    spots = await Spot.findAll({
      attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "description",
        "price",
        "createdAt",
        "updatedAt",
      ],
      where: { ownerId: user.id },
    });

    res.status(200);
    res.json({ spots });
  }
);
router.get(
  "/:spotId",

  async (req, res) => {
    let spot;

    spot = await Spot.findByPk(req.params.spotId);

    res.status(200);
    res.json({ spot });
  }
);

router.get("/", async (req, res) => {
  let spots = [];

  spots = await Spot.findAll({
    attributes: [
      "id",
      "ownerId",
      "address",
      "city",
      "state",
      "country",
      "lat",
      "lng",
      "name",
      "description",
      "price",
      "createdAt",
      "updatedAt",
    ],
  });
  res.status(200);
  res.json({ spots });
});

module.exports = router;
