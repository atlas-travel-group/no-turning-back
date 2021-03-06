const router = require("express").Router();
const { User } = require("../models");
const { Trip } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const tripData = await Trip.findAll({
      where: { user_id: 1 },
    });
    const trips = tripData.map((trip) => trip.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      trips,

      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users", async (req, res) => {
  try {
    User.findAll().then((userData) => {
      res.json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render("user", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/trips", async (req, res) => {
  try {
    Trip.findAll().then((tripData) => {
      res.json(tripData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/plan-trips", async (req, res) => {
  res.render("plan-trips");
});

router.get("/upcoming-trips", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Trip }],
    });

    const user = userData.get({ plain: true });

    res.render("upcoming-trips", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/past-trips", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Trip }],
    });

    const user = userData.get({ plain: true });

    res.render("past-trips", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Trip }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
