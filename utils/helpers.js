const { options } = require("../models/Trip");
const moment = require("moment");

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  isUpcoming: (date) => {
    let today = moment();
    if (date >= today) {
      return true;
    }
  },
  isPast: (date) => {
    let today = moment();
    if (date < today) {
      return true;
    }
  },
  logName: (location) => {
    console.log(location);
  },
};
