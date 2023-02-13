///////////////////////////////
// Individual Controllers
const getReady = require("./getReady");
const getAllOwners = require("./getAllOwners");
const findOwner = require("./findOwner");
const getClientFilteredAppointments = require("./getClientFilteredAppointments");
const getDateFilteredAppointments = require("./getDateFilteredAppointments");

module.exports = {
  getReady: getReady,
  getAllOwners: getAllOwners,
  findOwner: findOwner,
  getClientFilteredAppointments: getClientFilteredAppointments,
  getDateFilteredAppointments: getDateFilteredAppointments,
};
