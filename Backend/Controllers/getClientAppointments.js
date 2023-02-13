////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

////////////////////////////////////////////
//  My Models
const Owner = require("../Models/ownerModel");

module.exports = catchAsync(async (request, response, next) => {
  const email = request.body.email;
  const ownerEmail = request.body.token;
  const owner = await Owner.findOne({ ownerEmail });

  const clientAppointments = owner.appointments.filter((appointment, index) => {
    let attendees = appointment.attendees;
    attendees.forEach((attendee) => {
      if (attendee.email === email) {
        return appointment;
      }
    });
  });

  console.log(request.body);
  console.log(owner.appointments, clientAppointments);

  response.status(200).json({
    status: "Success",
    data: {
      appointments: owner.appointments,
      clientAppointments: clientAppointments,
    },
  });
});
