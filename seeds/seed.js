const sequelize = require("../config/connection");
const { User, Trip } = require("../models");

const userData = require("./userData.json");
const tripData = require("./tripData.json");
// const destinationData = require("./destinationData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  //  const destinations = await Destination.bulkCreate(destinationData, {
  //    individualHooks: true,
  //    returning: true,
  //  });

  for (const trip of tripData) {
    await Trip.create({
      ...trip,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
