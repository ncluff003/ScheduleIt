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

router.route("/").post(controllers.getReady);
router.use(routes.scheduleIt.owners.all, ownerRouter);

////////////////////////////////////////////
//  Exported Router
module.exports = router;
