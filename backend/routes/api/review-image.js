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
const { ERROR } = require("sqlite3");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
  const { imageId } = req.params;

  const deletedreview = await ReviewImage.destroy({ where: { id: imageId } });

  if (deletedreview) {
    return res.json({
      message: {
        message: "Successfully deleted",
      },
    });
  } else {
    return res.status(404).json({
      message: "Review Image couldn't be found",
    });
  }
});

module.exports = router;
