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

module.exports = catchAsync(async (request, response) => {
  // GET THE ESSENTIAL DATA FROM THE REQUEST
  const userType = request.body.userType;
  const email = request.body.ownerEmail;
  const selectedDate = request.body.selectedDate;

  // GET THE OWNER WITH THE EMAIL SENT
  const owner = await Owner.findOne({ email });

  // FILTER OWNER'S APPOINTMENTS FOR THE DATE SENT
  let dateFilteredAppointments;

  dateFilteredAppointments = owner.appointments.filter((appointment) => {
    if (
      (DateTime.fromISO(selectedDate).day === DateTime.fromJSDate(appointment.appointmentStart).day &&
        DateTime.fromISO(selectedDate).month === DateTime.fromJSDate(appointment.appointmentStart).month &&
        DateTime.fromISO(selectedDate).year === DateTime.fromJSDate(appointment.appointmentStart).year) ||
      (DateTime.fromISO(selectedDate).day === DateTime.fromJSDate(appointment.appointmentEnd).day &&
        DateTime.fromISO(selectedDate).month === DateTime.fromJSDate(appointment.appointmentEnd).month &&
        DateTime.fromISO(selectedDate).year === DateTime.fromJSDate(appointment.appointmentEnd).year)
    ) {
      return appointment;
    }
  });

  // RESPONSE
  response.status(200).json({
    status: 'Success',
    data: {
      userType: userType,
      currentAppointments: dateFilteredAppointments,
    },
  });
});
