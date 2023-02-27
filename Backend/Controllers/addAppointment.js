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
module.exports = catchAsync(async (request, response, next) => {
  const info = request.body;
  console.log(info);

  // GET POTENTIAL APPOINTMENT'S ID
  const appointmentId = info.appointmentId;

  const email = info.email;
  const owner = await Owner.findOne({ email });

  console.log(owner.appointments);

  let potentialAppointments = owner.potentialAppointments.filter((pot) => {
    return String(pot._id) === appointmentId;
  });

  owner.appointments.push(potentialAppointments[0]);

  potentialAppointments = owner.potentialAppointments.filter((pot) => {
    return String(pot._id) !== appointmentId;
  });

  owner.potentialAppointments = potentialAppointments;
  await owner.save();

  console.log(owner.appointments);
  // const appointment = {
  //   appointmentType: info.communicationPreference,
  //   dateRequested: DateTime.fromISO(info.requestDate).toISO(),
  //   appointmentDate: DateTime.fromISO(info.scheduledDate).toISO(),
  //   appointmentStart: DateTime.fromISO(info.scheduledStart).toISO(),
  //   appointmentEnd: DateTime.fromISO(info.scheduledEnd).toISO(),
  //   attendees: [],
  // };

  // const host = {
  //   attendeeFirstname: owner.firstname,
  //   attendeeLastname: owner.lastname,
  //   attendeeEmail: owner.email,
  //   attendeePhone: owner.phone,
  // };

  // appointment.attendees.push(host);
  // appointment.attendees.push({
  //   attendeeFirstname: info.clientFirstName,
  //   attendeeLastname: info.clientLastName,
  //   attendeeEmail: info.clientEmail,
  //   attendeePhone: info.clientPhone,
  // });

  // console.log(owner.appointments);
  // owner.appointments.push(appointment);
  // // owner.appointments = [...owner.appointments, appointment];
  // console.log(owner.appointments);

  console.log(owner);
  response.status(200).json({
    status: 'Success',
    message: 'You have successfully added this appointment.',
    potentialAppointments: owner.potentialAppointments,
  });
});
