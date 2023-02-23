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

router.route('/').get(controllers.appointments.addAppointment).post(controllers.appointments.requestAppointment);
router.route(routes.scheduleIt.owners.owner).delete(controllers.appointments.deletePastAppointments);
router.route(routes.scheduleIt.appointments.dateFiltered).post(controllers.appointments.getDateFilteredAppointments);
router.route(routes.scheduleIt.appointments.appointment).post(controllers.appointments.requestAppointmentUpdate);
router
  .route(`${routes.scheduleIt.appointments.appointment}${routes.scheduleIt.owners.owner}`)
  .get(controllers.appointments.getAppointment)
  .delete(controllers.appointments.deleteAppointment);
router.route(routes.scheduleIt.appointments.updateAppointment).get(controllers.appointments.updateAppointment);
router.route(routes.scheduleIt.appointments.acceptAppointment).get(controllers.appointments.addAppointment);
router.route(routes.scheduleIt.appointments.declineAppointment).get(controllers.appointments.denyAppointment);
router.route(routes.scheduleIt.appointments.declineAppointmentUpdate).get(controllers.appointments.denyAppointmentUpdate);

////////////////////////////////////////////
//  Exported Router
module.exports = router;
