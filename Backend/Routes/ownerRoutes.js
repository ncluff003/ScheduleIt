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
const controllers = require("../Controllers");

////////////////////////////////////////////
//  Routing Middleware
const routes = require("./routes");
const appointmentRouter = require("./apointmentRoutes");

router.route("/").get(controllers.getAllOwners).post(controllers.getReady);
router.use(routes.scheduleIt.appointments.all, appointmentRouter);

////////////////////////////////////////////
//  Exported Router
module.exports = router;
