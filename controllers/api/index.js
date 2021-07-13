const router = require("express").Router();
const userRoutes = require("./userRoutes");
const tripRoutes = require("./tripRoutes");

router.use("/users", userRoutes);
router.use("/trips", tripRoutes);

module.exports = router;
