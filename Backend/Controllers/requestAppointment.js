////////////////////////////////////////////
//  Third Party Modules
const { DateTime } = require("luxon");

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);
const Email = require("../Utilities/email");

////////////////////////////////////////////
//  My Models
const Owner = require("../Models/ownerModel");

module.exports = catchAsync(async (request, response) => {
  const info = request.body;
  const ownerEmail = info.ownerEmail;

  // Start by getting the owner's information.
  // OWNER
  const owner = await Owner.findOne({ ownerEmail });

  // Gather the info given by the client.
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

  await new Email("appointmentRequest", owner, { host: request.header("host"), protocol: request.protocol, client: client, appointment: appointment, message: message }).requestAppointment();

  response.status(200).json({
    status: "Success",
    data: {
      owner: owner,
      client: client,
      appointment: appointment,
      message: message,
    },
  });
});
