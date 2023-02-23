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
  console.log(request.params);
  const email = request.params.email;

  const owner = await Owner.findOne({ email });
  console.log(owner);

  owner.appointments = owner.appointments.filter((appointment) => {
    return DateTime.fromISO(appointment.appointmentDate).day < DateTime.now().day;
  });

  await owner.save();
  console.log(owner);

  response.status(200).json({
    status: 'Success',
    message: 'Past Appointments Removed Successfully.',
  });
});
