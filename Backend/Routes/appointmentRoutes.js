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

router.route('/').post(controllers.appointments.requestAppointment); //   /ScheduleIt/[Owners, Client]/:email/Appointments
router
  .route(
    `/Accept/:ownerEmail/:communicationPreference/:requestDate/:scheduledDate/:scheduledStart/:scheduledEnd/:clientFirstName/:clientLastName/:clientEmail/:clientPhone`,
  )
  .get(controllers.appointments.addAppointment); // /ScheduleIt/[Owners, Client]/:email/Appointments/Accept/:ownerEmail/:communicationPreference/:requestDate/:scheduledDate/:scheduledStart/:scheduledEnd/:clientFirstName/:clientLastName/:clientEmail/:clientPhone

router.route(`/Date`).post(controllers.appointments.getDateFilteredAppointments); // /ScheduleIt/[Owners, Client]/:email/Appointments/Date

router.route(`/:appointmentId`).post(controllers.appointments.requestAppointmentUpdate); ///ScheduleIt/[Owners, Client]/:email/Appointments/:appointmentId

router
  .route(
    `/Update/:appointmentId/:ownerEmail/:communicationPreference/:requestDate/:scheduledDate/:scheduledStart/:scheduledEnd/:clientFirstName/:clientLastName/:clientEmail/:clientPhone`,
  )
  .get(controllers.appointments.updateAppointment); // /ScheduleIt/[Owners, Client]/:email/Appointments/Update/:appointmentId/:ownerEmail/:communicationPreference/:requestDate/:scheduledDate/:scheduledStart/:scheduledEnd/:clientFirstName/:clientLastName/:clientEmail/:clientPhone

router.route(`/:appointmentId/:email`).get(controllers.appointments.getAppointment).delete(controllers.appointments.deleteAppointment); // /ScheduleIt/[Owners, Client]/:email/Appointments/:appointmentId/:email

router.route(`/Decline/:ownerEmail/:clientFirstName/:clientLastName/:clientEmail`).get(controllers.appointments.denyAppointment); // /ScheduleIt/[Owners, Client]/:email/Appointments/Decline/:ownerEmail/:clientFirstName/:clientLastName/:clientEmai

router.route(`/:appointmentId/Decline/:ownerEmail/:clientFirstName/:clientLastName/:clientEmail`).get(controllers.appointments.denyAppointmentUpdate); // /ScheduleIt/[Owners, Client]/:email/Appointments/:appointmentId/Decline/:ownerEmail/:clientFirstName/:clientLastName/:clientEmail

router.route(`/:email`).delete(controllers.appointments.deletePastAppointments); // /ScheduleIt/[Owners, Client]/:email/Appointments/:email

////////////////////////////////////////////
//  Exported Router
module.exports = router;
