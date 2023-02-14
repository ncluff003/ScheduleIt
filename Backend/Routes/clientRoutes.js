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
const appointmentRouter = require("./appointmentRoutes");

router.route("/").get(controllers.owners.getAllOwners).post(controllers.app.getReady);
router.route(routes.scheduleIt.client.appointments).post(controllers.clients.getClientFilteredAppointments);
// router.route(routes.scheduleIt.owners.owner).post(controllers.findOwner);
router.use(`${routes.scheduleIt.client.owner}${routes.scheduleIt.client.appointments}`, appointmentRouter);

////////////////////////////////////////////
//  Exported Router
module.exports = router;
