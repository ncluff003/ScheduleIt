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

  console.log(owner.appointments);
  if (owner.appointments[0]) {
    console.log(DateTime.fromISO(owner.appointments[0].appointmentDate));
    console.log(DateTime.fromJSDate(owner.appointments[0].appointmentDate));
  }

  owner.appointments = owner.appointments.filter((appointment) => {
    if (DateTime.fromISO(appointment.appointmentEnd).invalidReason === null) {
      return DateTime.fromISO(appointment.appointmentEnd).day >= DateTime.now().day;
    }
    if (DateTime.fromJSDate(appointment.appointmentEnd).invalidReason === null) {
      return DateTime.fromJSDate(appointment.appointmentEnd).day >= DateTime.now().day;
    }
  });

  console.log(owner.appointments);
  await owner.save();

  response.status(200).json({
    status: 'Success',
    message: 'Past Appointments Removed Successfully.',
  });
});
