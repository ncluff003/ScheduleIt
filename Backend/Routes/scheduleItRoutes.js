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
const ownerRouter = require("./ownerRoutes");
const clientRouter = require("./clientRoutes");
const tokenRouter = require("./tokenRoutes");
const appointmentRouter = require("./appointmentRoutes");

router.route("/").post(controllers.app.getReady);
router.use(routes.scheduleIt.owners.all, ownerRouter);
router.use(routes.scheduleIt.client.base, clientRouter);
router.use(routes.scheduleIt.token.base, tokenRouter);
// router.use(routes.scheduleIt.appointments.all, appointmentRouter);

////////////////////////////////////////////
//  Exported Router
module.exports = router;
