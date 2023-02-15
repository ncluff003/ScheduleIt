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

module.exports = catchAsync(async (request, response, next) => {
  const ownerEmail = request.params.email;
  const appointmentId = request.params.appointmentId;

  const owner = await Owner.findOne({ ownerEmail });
  const filteredAppointments = owner.appointments.filter((appointment) => {
    if (String(appointment._id) === appointmentId) {
      return appointment;
    }
  });

  const deletedAppointment = filteredAppointments[0];
  const client = deletedAppointment.attendees[1];

  // Send Emails To Both Owner AND Client
  await new Email(`appointmentDeleted`, owner, {
    client: {
      firstname: client.attendeeFirstname,
      lastname: client.attendeeLastname,
      clientEmail: client.attendeeEmail,
      appointment: deletedAppointment,
    },
  }).deleteAppointment();

  // Delete Appointment AFTER Emails Are Sent Out.
  owner.appointments = owner.appointments.filter((appointment) => {
    if (String(appointment._id) !== appointmentId) {
      return appointment;
    }
  });

  // Save Owner Without Those Appointments.
  await owner.save();

  response.status(200).json({
    status: "Success",
    message: "Appointment Successfully Deleted",
  });
});
