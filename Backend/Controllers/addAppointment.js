////////////////////////////////////////////
//  Third Party Modules
const { DateTime } = require("luxon");

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

////////////////////////////////////////////
//  My Models
const Owner = require("../Models/ownerModel");

module.exports = catchAsync(async (request, response) => {
  const info = request.params;
  const ownerEmail = info.ownerEmail;

  const appointment = {
    appointmentType: info.communicationPreference,
    dateRequested: info.requestDate,
    appointmentDate: info.scheduledDate,
    appointmentStart: info.scheduledStart,
    appointmentEnd: info.scheduledEnd,
    attendees: [],
  };

  const owner = await Owner.findOne({ ownerEmail });

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

  owner.appointments.push(appointment);
  await owner.save();

  response.status(200).json({
    status: "Success",
    data: {
      owner: owner,
      appointment: appointment,
      params: request.params,
      message: "Successful Added Appointment",
    },
  });
});
