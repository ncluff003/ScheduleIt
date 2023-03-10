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
const appointmentRouter = require('./appointmentRoutes');

router.route(routes.scheduleIt.client.owner).delete(controllers.appointments.deletePastAppointments);
router.use(`${routes.scheduleIt.owners.owner}${routes.scheduleIt.client.appointments}`, appointmentRouter);

////////////////////////////////////////////
//  Exported Router
module.exports = router;
