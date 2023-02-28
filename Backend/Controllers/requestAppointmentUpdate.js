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
  const userType = request.originalUrl.split('/')[2];
  if (userType === 'Owners') {
    return next(new AppError('Owners Cannot Update Appointments. Please Consider Emailing The Client About Re-Scheduling If Necessary.', 400));
  }
  const info = request.body;
  const email = info.ownerEmail;
  const appointmentId = request.params.appointmentId;

  // OWNER
  const owner = await Owner.findOne({ email });

  console.log(owner);

  // CLIENT
  const client = {
    firstname: info.firstname,
    lastname: info.lastname,
    clientEmail: info.clientEmail,
    clientPhone: info.clientPhone,
  };

  // APPOINTMENT
  const appointment = {
    appointmentId: appointmentId,
    appointmentType: info.appointment.appointmentType,
    dateRequested: info.appointment.dateRequested,
    appointmentStart: info.appointment.appointmentStart,
    appointmentEnd: info.appointment.appointmentEnd,
  };

  // MESSAGE
  const message = info.message;

  await new Email('appointmentUpdateRequest', owner, {
    host: request.header('host'),
    protocol: request.protocol,
    client: client,
    appointment: appointment,
    message: message,
  }).requestAppointmentUpdate();

  const filteredAppointments = owner.appointments.filter((app) => {
    return String(app._id) === appointmentId;
  });

  const potentialAppointment = { ...filteredAppointments[0] };
  potentialAppointment.update = true;
  potentialAppointment.appointmentType = info.appointment.appointmentType;
  potentialAppointment.dateRequested = DateTime.fromISO(info.appointment.dateRequested).toISO();
  potentialAppointment.appointmentDate = DateTime.local(
    DateTime.fromISO(appointment.appointmentStart).year,
    DateTime.fromISO(appointment.appointmentStart).month,
    DateTime.fromISO(appointment.appointmentStart).day,
  ).toISO();
  potentialAppointment.appointmentStart = DateTime.fromISO(info.appointment.appointmentStart).toISO();
  potentialAppointment.appointmentEnd = DateTime.fromISO(info.appointment.appointmentEnd).toISO();
  potentialAppointment.attendees = [];

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
  owner.appointments = owner.appointments.filter((app) => {
    return String(app._id) !== appointmentId;
  });

  await owner.save();

  response.status(200).json({
    status: 'Success',
    data: {
      owner: owner,
      client: client,
      appointment: appointment,
      message: message,
    },
  });
});
