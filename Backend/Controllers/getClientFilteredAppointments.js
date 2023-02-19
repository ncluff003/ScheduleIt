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

  // I STILL NEED TO VALIDATE IT AS AN EMAIL ADDRESS AT ALL.

  if (!clientEmail || clientEmail === null || clientEmail === undefined) return next(new AppError('You must provide an email for the client to login.', 400));

  const email = request.body.ownerEmail;
  const owner = await Owner.findOne({ email });
  const userType = 'Client';

  // GET TODAY'S APPOINTMENTS
  const dateFilteredAppointments = owner.appointments.filter((appointment) => {
    if (
      DateTime.now().day === DateTime.fromJSDate(appointment.appointmentStart).day ||
      DateTime.now().day === DateTime.fromJSDate(appointment.appointmentEnd).day
    ) {
      return appointment;
    }
  });

  // GET THE CLIENT'S APPOINTMENTS FOR TODAY
  const clientAppointments = dateFilteredAppointments.filter((appointment) => {
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
