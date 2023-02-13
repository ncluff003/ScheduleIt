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

router.route("/").get(controllers.getAllOwners).post(controllers.getReady);
router.route(routes.scheduleIt.client.appointments).post(controllers.findOwner);
router.route(routes.scheduleIt.owners.owner).post(controllers.findOwner);
router.use(`${routes.scheduleIt.owners.all}/${routes.scheduleIt.owners.owner}/${routes.scheduleIt.appointments.all}`, appointmentRouter);

////////////////////////////////////////////
//  Exported Router
module.exports = router;
