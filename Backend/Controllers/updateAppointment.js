////////////////////////////////////////////
//  Third Party Modules
const { DateTime } = require('luxon');

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

////////////////////////////////////////////
//  My Models
const Owner = require('../Models/ownerModel');

module.exports = catchAsync(async (request, response, next) => {
  console.log(request.params);
  const info = request.params;
  const email = info.ownerEmail;
  const id = request.params.appointmentId;

  // Start by getting the owner's information.
  // OWNER
  const owner = await Owner.findOne({ email });

  // UPDATE APPOINTMENT
  owner.appointments.forEach((appointment) => {
    if (String(appointment._id) === id) {
      appointment.appointmentType = info.communicationPreference;
      appointment.dateRequested = DateTime.fromISO(info.requestDate).toISO();
      appointment.appointmentDate = DateTime.fromISO(info.scheduledDateISO).toISO();
      appointment.appointmentStart = DateTime.fromISO(info.scheduledStart).toISO();
      appointment.appointmentEnd = DateTime.fromISO(info.scheduledEnd).toISO();

      const host = {
        attendeeFirstname: owner.firstname,
        attendeeLastname: owner.lastname,
        attendeeEmail: owner.email,
        attendeePhone: owner.phone,
      };
      appointment.attendees[0] = host;
      appointment.attendees[1] = {
        attendeeFirstname: info.clientFirstName,
        attendeeLastname: info.clientLastName,
        attendeeEmail: info.clientEmail,
        attendeePhone: info.clientPhone,
      };
    }
  });
  await owner.save();

  const filteredAppointments = owner.appointments.filter((appointment) => {
    return String(appointment._id === id);
  });
  const appointment = filteredAppointments[0];

  // Gather the info given by the client.
  // CLIENT
  const client = {
    firstname: info.firstname,
    lastname: info.lastname,
    clientEmail: info.clientEmail,
    clientPhone: info.clientPhone,
  };

  // MESSAGE
  const message = info.message;

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
