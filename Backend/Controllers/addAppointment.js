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
const Email = require('../Utilities/email');

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

  const newestAppointment = potentialAppointments[0];

  // CLIENT
  const client = {
    firstname: newestAppointment.attendees[1].attendeeFirstname,
    lastname: newestAppointment.attendees[1].attendeeLastname,
    clientEmail: newestAppointment.attendees[1].attendeeEmail,
    clientPhone: newestAppointment.attendees[1].attendeePhone,
  };

  // APPOINTMENT
  const appointment = {
    appointmentType: newestAppointment.appointmentType,
    dateRequested: newestAppointment.dateRequested,
    appointmentStart: newestAppointment.appointmentStart,
    appointmentEnd: newestAppointment.appointmentEnd,
  };

  owner.appointments.push(potentialAppointments[0]);

  potentialAppointments = owner.potentialAppointments.filter((pot) => {
    return String(pot._id) !== appointmentId;
  });

  owner.potentialAppointments = potentialAppointments;
  await owner.save();

  console.log(owner.appointments);

  await new Email('appointmentAccepted', owner, {
    host: request.header('host'),
    protocol: request.protocol,
    client: client,
    appointment: appointment,
  }).acceptAppointment();

  console.log(owner);
  response.status(200).json({
    status: 'Success',
    message: 'You have successfully added this appointment.',
    potentialAppointments: owner.potentialAppointments,
    currentAppointments: owner.appointments,
  });
});
