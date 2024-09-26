const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Spot, User, Review, ReviewImage } = require("../../db/models");
const review = require("../../db/models/review");
const router = express.Router();

router.put("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { userId, spotId, review: newReview, stars } = req.body;

  let review = await Review.findByPk(reviewId);

  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }

  review.userId = userId || review.userId;
  review.spotId = spotId || review.spotId;
  review.review = newReview || review.review;
  review.stars = stars || review.stars;
  await review.save();

  return res.json({
    id: review.id,
    userId: review.userId,
    spotId: review.spotId,
    review: review.review,
    stars: review.stars,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  });
});

router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { url } = req.body;

  const review = await Review.findByPk(reviewId);

  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  const existingImagesCount = await ReviewImage.count({
    where: { reviewId: review.id },
  });


  if (existingImagesCount >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });
  }

  const newImage = await ReviewImage.create({
    reviewId: review.id,
    url,
  });

  return res.status(201).json({
    id: newImage.id,
    reviewId: newImage.reviewId,
    url: newImage.url,
  });
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

router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;

  await ReviewImage.destroy({ where: { reviewId } });

  const deletedreview = await Review.destroy({ where: { id: reviewId } });

  if (deletedreview) {
    return res.json({
      message: "Successfully deleted",
    });
  } else {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }
});

router.get("/:spotId", async (req, res) => {});

router.get("/", async (req, res) => {});

module.exports = router;
