const User = require("./User");
const Trip = require('./Trip')
const Destination = require('./Destination');

User.hasMany(Trip, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Trip.belongsTo(User, {
  foreignKey: "user_id",
});

Trip.belongsTo(Destination, {
  foreignKey: "destination_id"
})

module.exports = { User, Trip, Destination };
