const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");

const { Spot, User, Review, ReviewImage } = require("../../db/models");
const review = require("../../db/models/review");
const router = express.Router();

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer between 1 and 5"),
];

router.put("/:reviewId", requireAuth, validateReview, async (req, res) => {
  const { reviewId } = req.params;
  const { review: newReview, stars } = req.body;

  if (!newReview || !stars) {
    return res.status(400).json({
      message: "Validation error",
      errors: {
        review: newReview ? null : "Review is required",
        stars: stars ? null : "Stars are required",
      },
    });
  }

  let review = await Review.findByPk(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  if (review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  review.review = newReview;
  review.stars = stars;
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

  if (review.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
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

router.get("/current", requireAuth, async (req, res) => {
  try {
    const { user } = req;

    console.log("Fetching reviews for user:", user.id);

    const reviews = await Review.findAll({
      where: { userId: user.id },
      include: [
        {
          model: Spot,
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
          include: [
            {
              model: SpotImage,
              where: { preview: true },
              attributes: ["url"],
              required: false,
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
    });

    console.log("Reviews fetched:", reviews);

    const formattedReviews = reviews.map((review) => {
      const spot = review.Spot;
      const previewImage = spot.SpotImages?.[0]?.url || null;

      return {
        ...review.toJSON(),
        Spot: {
          ...spot.toJSON(),
          previewImage,
        },
      };
    });

    return res.status(200).json({ Reviews: formattedReviews });
  } catch (error) {
    console.error("Error fetching current user reviews:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findByPk(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  if (review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await ReviewImage.destroy({ where: { reviewId } });

  await review.destroy();

  return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
