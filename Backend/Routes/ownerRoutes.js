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
import appointmentRouter from './appointmentRoutes';

router.route('/').get(controllers.owners.getAllOwners).post(controllers.app.getReady);
router.route(routes.scheduleIt.owners.owner).post(controllers.owners.findOwner);
router.use(`${routes.scheduleIt.owners.owner}${routes.scheduleIt.appointments.all}`, appointmentRouter);

////////////////////////////////////////////
//  Exported Router
module.exports = router;
