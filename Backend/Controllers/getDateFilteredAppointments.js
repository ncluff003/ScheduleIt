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
  console.log(request.body);
  const userType = request.body.userType;
  const email = request.body.ownerEmail;
  const selectedDate = request.body.selectedDate;
  let appointmentId;
  let previousDate;

  if (request.body.appointmentId) {
    appointmentId = request.body.appointmentId;
    previousDate = request.body.previousAppointmentDate;
  }

  const owner = await Owner.findOne({ email });

  console.log(DateTime.fromISO(selectedDate));
  console.log('----------------------------------------------------------------------------------------------');
  // console.log(DateTime.fromISO(owner.appointments[0].appointmentStart));
  console.log('----------------------------------------------------------------------------------------------');
  console.log(owner.appointments);

  // GET THIS DATE'S APPOINTMENTS
  let dateFilteredAppointments;
  if (!appointmentId) {
    dateFilteredAppointments = owner.appointments.filter((appointment) => {
      if (
        (DateTime.fromISO(selectedDate).day === DateTime.fromISO(appointment.appointmentStart).day &&
          DateTime.fromISO(selectedDate).month === DateTime.fromISO(appointment.appointmentStart).month &&
          DateTime.fromISO(selectedDate).year === DateTime.fromISO(appointment.appointmentStart).year) ||
        (DateTime.fromISO(selectedDate).day === DateTime.fromISO(appointment.appointmentEnd).day &&
          DateTime.fromISO(selectedDate).month === DateTime.fromISO(appointment.appointmentEnd).month &&
          DateTime.fromISO(selectedDate).year === DateTime.fromISO(appointment.appointmentEnd).year)
      ) {
        return appointment;
      }
    });
  } else if (appointmentId) {
    dateFilteredAppointments = owner.appointments.filter((appointment) => {
      if (
        (DateTime.fromISO(previousDate).day === DateTime.fromISO(appointment.appointmentStart).day &&
          DateTime.fromISO(previousDate).month === DateTime.fromISO(appointment.appointmentStart).month &&
          DateTime.fromISO(previousDate).year === DateTime.fromISO(appointment.appointmentStart).year) ||
        (DateTime.fromISO(previousDate).day === DateTime.fromISO(appointment.appointmentEnd).day &&
          DateTime.fromISO(previousDate).month === DateTime.fromISO(appointment.appointmentEnd).month &&
          DateTime.fromISO(previousDate).year === DateTime.fromISO(appointment.appointmentEnd).year)
      ) {
        return appointment;
      }
    });
  }

  let data = {
    userType: userType,
    currentAppointments: dateFilteredAppointments,
  };

  response.status(200).json({
    status: 'Success',
    data: data,
  });
});
