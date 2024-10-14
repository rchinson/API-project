const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Spot, User } = require("../../db/models");
const spot = require("../../db/models/spot");

const router = express.Router();

router.get("../api/spots", async (req, res) => {
  // const spots = await Spot.findAll({
  //   attributes: [
  //     "id",
  //     "ownerId",
  //     "address",
  //     "city",
  //     "state",
  //     "country",
  //     "lat",
  //     "lng",
  //     "name",
  //     "description",
  //     "price",
  //     "createdAt",
  //     "updatedAt",
  //     "avgRating",
  //     "previewImage",
  //   ],
  // });

  return res.json({ requestBody: 'fixedtest' });
});



module.exports = router;
