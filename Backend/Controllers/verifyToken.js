////////////////////////////////////////////
//  Third Party Middleware
const { DateTime } = require('luxon');

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

////////////////////////////////////////////
//  My Models
const Owner = require('../Models/ownerModel');

module.exports = catchAsync(async (request, response, next) => {
  const email = request.body.email;
  const token = request.body.token;

  if (!token) {
    return next(new AppError('You must provide a token to compare with the one the owner has to login.', 400));
  }

  if (token.length !== 8) {
    return next(new AppError('Token is not the length that are given, so therefore it will NOT Match.', 400));
  }
  const owner = await Owner.findOne({ email }).select('+token');
  let tokenVerified = false;

  if (token !== owner.token) {
    return next(new AppError('Token provided does not match the token given to the owner.', 400));
  }

  const dateFilteredAppointments = owner.appointments.filter((appointment) => {
    if (
      DateTime.now().day === DateTime.fromJSDate(appointment.appointmentStart).day ||
      DateTime.now().day === DateTime.fromJSDate(appointment.appointmentEnd).day
    ) {
      return appointment;
    }
  });

  tokenVerified = true;
  response.status(200).json({
    status: 'Success',
    data: {
      currentAppointments: dateFilteredAppointments,
      tokenVerified: tokenVerified,
    },
  });
});
