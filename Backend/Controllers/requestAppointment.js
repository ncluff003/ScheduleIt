////////////////////////////////////////////
//  Third Party Modules
const { DateTime } = require('luxon');

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);
const Email = require('../Utilities/email');

////////////////////////////////////////////
//  My Models
const Owner = require('../Models/ownerModel');

module.exports = catchAsync(async (request, response, next) => {
  console.log(request.body);
  // GET USER TYPE.
  const userType = request.originalUrl.split('/')[2];

  // IF SOMEHOW THE OWNER MAKES THIS REQUEST RETURN ERROR
  if (userType === 'Owners') {
    return next(new AppError('Owners Do Not Request Appointments.', 400));
  }

  // GET DATA FROM REQUEST BODY.
  const info = request.body;
  const email = info.ownerEmail;

  // OWNER
  const owner = await Owner.findOne({ email });

  // CLIENT
  const client = {
    firstname: info.firstname,
    lastname: info.lastname,
    clientEmail: info.clientEmail,
    clientPhone: info.clientPhone,
  };

  // APPOINTMENT
  const appointment = {
    appointmentType: info.appointment.appointmentType,
    dateRequested: info.appointment.dateRequested,
    appointmentStart: info.appointment.appointmentStart,
    appointmentEnd: info.appointment.appointmentEnd,
  };

  // MESSAGE
  const message = info.message;

  await new Email('appointmentRequest', owner, {
    host: request.header('host'),
    protocol: request.protocol,
    client: client,
    appointment: appointment,
    message: message,
  }).requestAppointment();

  const potentialAppointment = {
    appointmentType: info.appointment.communicationPreference,
    dateRequested: DateTime.fromISO(info.appointment.dateRequested).toISO(),
    appointmentDate: DateTime.local(
      DateTime.fromISO(info.appointment.appointmentStart).year,
      DateTime.fromISO(info.appointment.appointmentStart).month,
      DateTime.fromISO(info.appointment.appointmentStart).day,
    ).toISO(),
    appointmentStart: DateTime.fromISO(info.appointment.appointmentStart).toISO(),
    appointmentEnd: DateTime.fromISO(info.appointment.appointmentEnd).toISO(),
    attendees: [],
  };

  const host = {
    attendeeFirstname: owner.firstname,
    attendeeLastname: owner.lastname,
    attendeeEmail: owner.email,
    attendeePhone: owner.phone,
  };

  potentialAppointment.attendees.push(host);
  potentialAppointment.attendees.push({
    attendeeFirstname: client.firstname,
    attendeeLastname: client.lastname,
    attendeeEmail: client.clientEmail,
    attendeePhone: client.clientPhone,
  });

  owner.potentialAppointments.push(potentialAppointment);
  await owner.save();

  response.status(200).json({
    status: 'Success',
    data: {
      owner: owner,
      client: client,
      potentialAppointment: potentialAppointment,
      appointment: appointment,
      message: message,
    },
  });
});
