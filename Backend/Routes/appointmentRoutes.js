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

router.route("/").post(controllers.getReady);
router.route(routes.scheduleIt.appointments.dateFiltered, controllers.getDateFilteredAppointments);
router.route(routes.scheduleIt.appointments.appointment).post(controllers.getReady);

////////////////////////////////////////////
//  Exported Router
module.exports = router;
