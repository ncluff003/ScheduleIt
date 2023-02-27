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

router.route(`/:email`).post(controllers.owners.findOwner);
router.route(`/:email/Appointments/Date`).post(controllers.appointments.getDateFilteredAppointments);
router
  .route(
    `/:email/Appointments/Accept/:communicationPreference/:requestDate/:scheduledDate/:scheduledStart/:scheduledEnd/:clientFirstName/:clientLastName/:clientEmail/:clientPhone`,
  )
  .get(controllers.appointments.addAppointment);
router.route(`/:email/Appointments`).delete(controllers.appointments.deletePastAppointments);
// router.use(`/:email/Appointments`, appointmentRouter);

////////////////////////////////////////////
//  Exported Router
module.exports = router;
