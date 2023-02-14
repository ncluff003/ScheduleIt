///////////////////////////////
// Individual Controllers
// Application
const getReady = require("./getReady");

// Owners
const getAllOwners = require("./getAllOwners");
const findOwner = require("./findOwner");

// Clients
const getClientFilteredAppointments = require("./getClientFilteredAppointments");

// Appointments
const getDateFilteredAppointments = require("./getDateFilteredAppointments");
const requestAppointment = require("./requestAppointment");
const denyAppointment = require("./denyAppointment");
const addAppointment = require("./addAppointment");
const updateAppointment = require("./updateAppointment");

// Token
const verifyToken = require("./verifyToken");

module.exports = {
  app: {
    getReady: getReady,
  },
  owners: {
    getAllOwners: getAllOwners,
    findOwner: findOwner,
  },
  clients: {
    getClientFilteredAppointments: getClientFilteredAppointments,
  },
  appointments: {
    getDateFilteredAppointments: getDateFilteredAppointments,
    requestAppointment: requestAppointment,
    addAppointment: addAppointment,
    denyAppointment: denyAppointment,
  },
  token: {
    verifyToken: verifyToken,
  },
};
