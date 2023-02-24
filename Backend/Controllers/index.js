///////////////////////////////
// Individual Controllers
// Application
const goHome = require('./renderHome');
const getReady = require('./getReady');

// Owners
const findOwner = require('./findOwner');

// Clients
const getClientFilteredAppointments = require('./getClientFilteredAppointments');

// Appointments
const getAppointment = require('./getAppointment');
const getDateFilteredAppointments = require('./getDateFilteredAppointments');
const requestAppointment = require('./requestAppointment');
const denyAppointment = require('./denyAppointment');
const denyAppointmentUpdate = require('./denyAppointmentUpdate');
const addAppointment = require('./addAppointment');
const requestAppointmentUpdate = require('./requestAppointmentUpdate');
const updateAppointment = require('./updateAppointment');
const deleteAppointment = require('./deleteAppointment');
const deletePastAppointments = require('./deletePastAppointments');

// Token
const verifyToken = require('./verifyToken');

module.exports = {
  app: {
    goHome: goHome,
    getReady: getReady,
  },
  owners: {
    findOwner: findOwner,
  },
  clients: {
    getClientFilteredAppointments: getClientFilteredAppointments,
  },
  appointments: {
    getAppointment: getAppointment,
    getDateFilteredAppointments: getDateFilteredAppointments,
    requestAppointment: requestAppointment,
    addAppointment: addAppointment,
    denyAppointment: denyAppointment,
    requestAppointmentUpdate: requestAppointmentUpdate,
    updateAppointment: updateAppointment,
    denyAppointmentUpdate: denyAppointmentUpdate,
    deleteAppointment: deleteAppointment,
    deletePastAppointments: deletePastAppointments,
  },
  token: {
    verifyToken: verifyToken,
  },
};
