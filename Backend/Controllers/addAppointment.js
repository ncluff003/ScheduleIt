////////////////////////////////////////////
//  Third Party Modules
const dotenv = require('dotenv');
const { DateTime } = require('luxon');

////////////////////////////////////////////
//  Third Party Config Files
dotenv.config({
  path: `./config.env`,
});

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

////////////////////////////////////////////
//  My Models
const Owner = require('../Models/ownerModel');
module.exports = catchAsync(async (request, response) => {
  const info = request.params;
  console.log(info);
  const email = info.ownerEmail;
  const owner = await Owner.findOne({ email });

  const appointment = {
    appointmentType: info.communicationPreference,
    dateRequested: DateTime.fromJSDate(info.requestDate).toISO(),
    appointmentDate: DateTime.fromJSDate(info.scheduledDate).toISO(),
    appointmentStart: DateTime.fromJSDate(info.scheduledStart).toISO(),
    appointmentEnd: DateTime.fromJSDate(info.scheduledEnd).toISO(),
    attendees: [],
  };

  const host = {
    attendeeFirstname: owner.firstname,
    attendeeLastname: owner.lastname,
    attendeeEmail: owner.email,
    attendeePhone: owner.phone,
  };

  appointment.attendees.push(host);
  appointment.attendees.push({
    attendeeFirstname: info.clientFirstName,
    attendeeLastname: info.clientLastName,
    attendeeEmail: info.clientEmail,
    attendeePhone: info.clientPhone,
  });

  console.log(owner.appointments);
  owner.appointments.push(appointment);
  // owner.appointments = [...owner.appointments, appointment];
  console.log(owner.appointments);

  await owner.save();

  if (process.env.NODE_ENV === 'development') {
    response.redirect(301, process.env.DEV_URL);
  } else if (process.env.NODE_ENV === 'production') {
    response.redirect(301, process.env.PROD_URL);
  }
});
