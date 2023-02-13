///////////////////////////////
// Individual Controllers
const getReady = require("./getReady");
const getAllOwners = require("./getAllOwners");
const findOwner = require("./findOwner");
const getClientFilteredAppointments = require("./getClientFilteredAppointments");
const getDateFilteredAppointments = require("./getDateFilteredAppointments");
const verifyToken = require("./verifyToken");

module.exports = {
  getReady: getReady,
  getAllOwners: getAllOwners,
  findOwner: findOwner,
  verifyToken: verifyToken,
  getClientFilteredAppointments: getClientFilteredAppointments,
  getDateFilteredAppointments: getDateFilteredAppointments,
};
