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
  const userType = request.originalUrl.split('/')[2];
  // GET THE OWNER'S EMAIL
  const email = request.params.email;

  // USE THE EMAIL TO GET THE OWNER
  const owner = await Owner.findOne({ email });

  // IF THERE ARE APPOINTMENTS -- FILTER OUT THE ONES THAT COME BEFORE THE CURRENT DAY.
  if (owner.appointments.length > 0) {
    owner.appointments = owner.appointments.filter((appointment) => {
      if (DateTime.fromJSDate(appointment.appointmentEnd).invalidReason === null && DateTime.fromJSDate(appointment.appointmentEnd) > DateTime.now()) {
        return appointment;
      }
    });
  }

  // SAVE THE OWNER.
  await owner.save();

  // RETURN SUCCESS MESSAGE
  response.status(200).json({
    status: 'Success',
    message: 'Past Appointments Removed Successfully.',
    data: {
      userType: userType,
    },
  });
});
