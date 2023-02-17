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
  const clientEmail = request.body.email;
  console.log(clientEmail);

  if (!clientEmail || clientEmail === null || clientEmail === undefined) return next(new AppError('You must provide an email for the client to login.', 400));

  const email = request.body.ownerEmail;
  const owner = await Owner.findOne({ email });
  const userType = 'Client';

  const dateFilteredAppointments = owner.appointments.filter((appointment, index) => {
    if (DateTime.now().day === DateTime.fromISO(appointment.appointmentStart).day || DateTime.now().day === DateTime.fromISO(appointment.appointmentEnd).day) {
      return appointment;
    }
  });

  const clientAppointments = dateFilteredAppointments.filter((appointment, index) => {
    let attendees = appointment.attendees;
    attendees.forEach((attendee) => {
      if (attendee.email === clientEmail) {
        return appointment;
      }
    });
  });

  response.status(200).json({
    status: 'Success',
    data: {
      userType: userType,
      currentAppointments: dateFilteredAppointments,
      clientAppointments: clientAppointments,
    },
  });
});
