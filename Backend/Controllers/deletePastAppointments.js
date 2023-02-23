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
  const email = request.params.email;
  const owner = await Owner.findOne({ email });

  owner.appointments = owner.appointments.filter((appointment) => {
    return DateTime.fromJSDate(appointment.appointmentDate).day >= DateTime.now().day;
  });

  await owner.save();

  response.status(200).json({
    status: 'Success',
    message: 'Past Appointments Removed Successfully.',
  });
});
