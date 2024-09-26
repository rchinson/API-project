const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { SpotImage } = require("../../db/models");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Spot, User, Review, ReviewImage } = require("../../db/models");
const spot = require("../../db/models/spot");
const { ERROR } = require("sqlite3");
const { Sequelize } = require('sequelize');

const router = express.Router();

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid address."),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid city."),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid state."),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid country."),
  check("lat").isDecimal().withMessage("Latitude must be a decimal value."),
  check("lng").isDecimal().withMessage("Longitude must be a decimal value."),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters."),
  check("price").isDecimal().withMessage("Price must be a decimal value."),
];

router.post("/:spotId/reviews", async (req, res) => {
  const { userId,review,stars } = req.body;
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);
  const newReview = await Review.create({
    userId,
    spotId,
    review,
    stars,
  });
  return res.status(201).json(newReview);
});

router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  const reviews = await Review.findAll({
    attributes: ["id", "userId", "spotId", "review", "stars"],

    where: { spotId: spot.id },
    include: [
      {
        model: User,

        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,

        attributes: ["id", "url"],
        foreignKey: "reviewId",
      },
    ],
  });

  res.status(200).json({ Reviews: reviews });
});

router.put("/:spotId", validateSpot, async (req, res) => {
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.findByPk(spotId);

  spot.address = address || spot.address;
  spot.city = city || spot.city;
  spot.state = state || spot.state;
  spot.country = country || spot.country;
  spot.lat = lat || spot.lat;
  spot.lng = lng || spot.lng;
  spot.name = name || spot.name;
  spot.description = description || spot.description;
  spot.price = price || spot.price;

  await spot.save();

  return res.json({
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
  });
});

router.post("/:spotId/images", async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(spotId);

  const newImage = await SpotImage.create({
    spotId: spot.id,
    url,
    preview: preview || false,
  });

  return res.json(newImage);
});

router.post("/", validateSpot, async (req, res) => {
  const {
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  } = req.body;

  const newSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  return res.status(201).json(newSpot);
});

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
    if (!spot) {
      return res.status(400).json({
        message: "Spot couldn't be found",
        statusCode: 400,
        error: error.message,
      });
    }
  }
);


// Working on adding query filter to get all spots
// router.get("/", async (req, res) => {
//   let spots = [];

//   spots = await Spot.findAll({
//     attributes: [
//       "id",
//       "ownerId",
//       "address",
//       "city",
//       "state",
//       "country",
//       "lat",
//       "lng",
//       "name",
//       "description",
//       "price",
//       "createdAt",
//       "updatedAt",
//     ],
//     include: [
//       {}
//     ]
//   });
//   res.status(200);
//   res.json({ spots });
// });



// GET ALL SPOTS WORKING
router.get("/", async (req, res) => {
  // let spots = [];

  let spots = await Spot.findAll({
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
    include: [
      {
        model: Review,
        attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']],
      },
      {
        model: SpotImage,
        attributes: ['id', 'url']
      }
    ],
    group: ['Spot.id', 'SpotImages.id']
  });


  let formattedSpots = spots.map(spot => {

    const avgRating = spot.Reviews[0]?.dataValues.avgRating || null;


    const previewImage = spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null;

    return {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: avgRating ? parseFloat(avgRating).toFixed(1) : null, 
      previewImage
    };
  });

  res.status(200).json({ Spots: formattedSpots });
});



router.delete("/:spotId", async (req, res) => {
  const { spotId } = req.params;

  await SpotImage.destroy({ where: { spotId } });

  const deletedSpot = await Spot.destroy({ where: { id: spotId } });

  if (deletedSpot) {
    return res.json({ message: "Spot successfully deleted" });
  } else {
    return res.status(404).json({ message: "Spot not found" });
  }
});

module.exports = router;
