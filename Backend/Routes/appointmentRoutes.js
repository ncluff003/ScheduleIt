////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const express = require('express');

////////////////////////////////////////////
//  Third Party Module Instances

////////////////////////////////////////////
//  Third Party Middleware
const router = express.Router();

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  My Middleware
const routes = require('./routes.js');
const controllers = require('../Controllers');

////////////////////////////////////////////
//  Routing Middleware

router.route('/').post(controllers.appointments.requestAppointment); // CLIENTS MAKE AN APPOINTMENT REQUEST
router.route(`/Date`).post(controllers.appointments.getDateFilteredAppointments); // OWNERS AND CLIENTS SELECT A DATE TO VIEW
router
  .route(routes.scheduleIt.appointments.appointment)
  .get(controllers.appointments.getAppointment) // CLIENT WILL NEED THE SPECIFIC APPOINTMENT INFO WHEN REQUESTING AN UPDATE TO THEIR APPOINTMENT
  .post(controllers.appointments.requestAppointmentUpdate) // CLIENTS CAN REQUEST AN APPOINTMENT UPDATE
  .patch(controllers.appointments.addAppointment); // OWNERS WILL ACCEPT THE POTENTIAL APPOINTMENT
router.route(`${routes.scheduleIt.appointments.appointment}${routes.scheduleIt.owners.owner}`).delete(controllers.appointments.deleteAppointment); // OWNERS AND CLIENTS CAN DELETE THE APPOINTMENT
router
  .route(`${routes.scheduleIt.appointments.appointment}/Decline`)
  .post(controllers.appointments.denyAppointment)
  .patch(controllers.appointments.denyAppointmentUpdate); // OWNERS WILL DECLINE THE APPOINTMENT OR DECLINE THE APPOINTMENT UPDATE
router.route(`${routes.scheduleIt.appointments.appointment}/Update`).post(controllers.appointments.updateAppointment); // OWNERS CAN ACCEPT THE UPDATED APPOINTMENT

////////////////////////////////////////////
//  Exported Router
module.exports = router;
