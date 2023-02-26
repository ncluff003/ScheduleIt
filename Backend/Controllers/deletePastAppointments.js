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

  console.log(owner.appointments);
  // IF THERE ARE APPOINTMENTS -- FILTER OUT THE ONES THAT COME BEFORE THE CURRENT DAY.
  if (owner.appointments.length > 0) {
    console.log(DateTime.fromISO(owner.appointments[0].appointmentDate));
    console.log(DateTime.fromJSDate(owner.appointments[0].appointmentDate));

    owner.appointments = owner.appointments.filter((appointment) => {
      if (DateTime.fromISO(appointment.appointmentEnd).invalidReason === null && DateTime.fromISO(appointment.appointmentEnd).day > DateTime.now().day) {
        return appointment;
      }
    });
  }

  console.log(owner.appointments);
  // SAVE THE OWNER.
  await owner.save();

  // RETURN SUCCESS MESSAGE
  response.status(200).json({
    status: 'Success',
    message: 'Past Appointments Removed Successfully.',
    userType: userType,
  });
});
