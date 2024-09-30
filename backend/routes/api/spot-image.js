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

  try {
    // Find the SpotImage by primary key, including the associated Spot
    const spotImage = await SpotImage.findByPk(imageId, {
      include: Spot,
    });

    // If SpotImage is not found, return 404 error
    if (!spotImage) {
      return res.status(404).json({
        message: "Spot Image couldn't be found",
      });
    }

    // Check if the logged-in user is the owner of the Spot
    if (spotImage.Spot.ownerId !== req.user.id) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    // Delete the image if the user is authorized
    await spotImage.destroy();

    return res.json({
      message: "Successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting spot image:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
