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
  // GET OWNER'S EMAIL AND THE TOKEN SENT
  const email = request.body.email;
  const token = request.body.token;

  // IF NO TOKEN RETURN ERROR
  if (!token) {
    return next(new AppError('You must provide a token to compare with the one the owner has to login.', 400));
  }

  // IF TOKEN LENGTH DOESN'T EQUAL EIGHT RETURN ERROR
  if (token.length !== 8) {
    return next(new AppError('Token is not the length that are given, so therefore it will NOT Match.', 400));
  }

  // GET OWNER AND BE SURE TO GET THE TOKEN
  const owner = await Owner.findOne({ email }).select('+token');

  // INITIALIZE THAT THE TOKEN IS NOT VERIFIED
  let tokenVerified = false;

  // IF THE TOKEN DOES NOT MATCH THE OWNER'S RETURN ERROR
  if (token !== owner.token) {
    return next(new AppError('Token provided does not match the token given to the owner.', 400));
  }

  // FILTER OWNER'S APPOINTMENTS TO TODAY
  const dateFilteredAppointments = owner.appointments.filter((appointment) => {
    if (
      DateTime.now().day === DateTime.fromJSDate(appointment.appointmentStart).day ||
      DateTime.now().day === DateTime.fromJSDate(appointment.appointmentEnd).day
    ) {
      return appointment;
    }
  });

  owner.potentialAppointments = owner.potentialAppointments.filter((appointment) => {
    if (DateTime.now() <= DateTime.fromJSDate(appointment.appointmentStart)) {
      return appointment;
    }
  });

  // IF USER GETS HERE, TOKEN IS VERIFIED
  tokenVerified = true;

  // RESPONSE
  response.status(200).json({
    status: 'Success',
    data: {
      currentAppointments: dateFilteredAppointments,
      potentialAppointments: owner.potentialAppointments,
      tokenVerified: tokenVerified,
      userType: 'Owners',
    },
  });
});
