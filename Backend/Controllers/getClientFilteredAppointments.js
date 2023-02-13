////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

////////////////////////////////////////////
//  My Models
const Owner = require("../Models/ownerModel");

module.exports = catchAsync(async (request, response, next) => {
  const clientEmail = request.body.email;
  const ownerEmail = request.body.ownerEmail;
  const owner = await Owner.findOne({ ownerEmail });
  const userType = "Client";

  const clientAppointments = owner.appointments.filter((appointment, index) => {
    let attendees = appointment.attendees;
    attendees.forEach((attendee) => {
      if (attendee.email === clientEmail) {
        return appointment;
      }
    });
  });

  console.log(request.body);
  console.log(owner.appointments, clientAppointments);

  response.status(200).json({
    status: "Success",
    data: {
      userType: userType,
      appointments: owner.appointments,
      clientAppointments: clientAppointments,
    },
  });
});
