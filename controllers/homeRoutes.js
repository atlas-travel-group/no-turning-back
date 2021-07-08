const router = require("express").Router();
const { User } = require('../models');
const { Trip } = require('../models');
const { Destination } = require('../models');
const withAuth = require("../controllers/index");

//Looking at it from the lens of a user in your site, you only really want to see the trips that
//you're involved in, therefore finding all users is not ideal. So instead you can try to Find TRIPS
//where the user_id foreign key matches with the logged in user and then when you find the trips you INCLUDE the destinations

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
        include: [Trip]
      });
      const users = userData.map((user) =>
        user.get({ plain: true })
      );
    res.render("homepage", { users });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const tripData = await Trip.findAll();
    const trips = tripData.map((trip) => trip.get({ plain: true }));
    res.render("homepage", { trips });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const destinationData = await Destination.findAll();
    const destinations = destinationData.map((destination) => destination.get({ plain: true }));
    res.render("homepage", { destinations });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
