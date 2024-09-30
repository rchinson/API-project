const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { SpotImage } = require("../../db/models");
const { Spot, User, Review, ReviewImage } = require("../../db/models");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { check } = require("express-validator");
// const { ERROR } = require("sqlite3");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
  const { imageId } = req.params;

  const reviewImage = await ReviewImage.findByPk(imageId, {
    include: Review,
  });

  if (!reviewImage) {
    return res.status(404).json({
      message: "Review Image couldn't be found",
    });
  }

  if (reviewImage.Review.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await reviewImage.destroy();

  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
