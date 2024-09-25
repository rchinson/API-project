const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Spot, User, Review, ReviewImage } = require("../../db/models");
const review = require("../../db/models/review");
const router = express.Router();

router.post("/:reviewId/images", async (req, res) => {
  const { reviewId } = req.params;
  const { url } = req.body;

  const review = await Spot.findByPk(reviewId);

  const newImage = await ReviewImage.create({
    reviewId: review.id,
    url,
  });

  return res.json(newImage);
});

router.get("/current", async (req, res) => {
  const { user } = req;

  const reviews = await Review.findAll({
    where: { userId: user.id },
    attributes: [
      "id",
      "userId",
      "spotId",
      "review",
      "stars",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: User,
        as: "User",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        as: "Spot",
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
          "price",
        ],
      },
      {
        model: ReviewImage,
        as: "ReviewImages",
        attributes: ["id", "url"],
      },
    ],
  });

  res.status(200).json(reviews);
});
router.get("/:spotId", async (req, res) => {});

router.get("/", async (req, res) => {});

module.exports = router;
