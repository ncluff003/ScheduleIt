////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const express = require("express");

////////////////////////////////////////////
//  Third Party Module Instances

////////////////////////////////////////////
//  Third Party Middleware
const router = express.Router();

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  My Middleware
const routes = require("./routes");
const controllers = require("../Controllers");

////////////////////////////////////////////
//  Routing Middleware

router.route("/").get(controllers.appointments.addAppointment).post(controllers.appointments.requestAppointment);
router.route(routes.scheduleIt.appointments.appointment).post(controllers.appointments.requestAppointmentUpdate);
router.route(routes.scheduleIt.appointments.updateAppointment).get(controllers.appointments.updateAppointment);
router.route(routes.scheduleIt.appointments.dateFiltered).get(controllers.appointments.getDateFilteredAppointments);
router.route(routes.scheduleIt.appointments.acceptAppointment).get(controllers.appointments.addAppointment);
router.route(routes.scheduleIt.appointments.declineAppointment).get(controllers.appointments.denyAppointment);
router.route(routes.scheduleIt.appointments.declineAppointmentUpdate).get(controllers.appointments.denyAppointmentUpdate);
router.route(routes.scheduleIt.appointments.appointment).post(controllers.app.getReady);

////////////////////////////////////////////
//  Exported Router
module.exports = router;
