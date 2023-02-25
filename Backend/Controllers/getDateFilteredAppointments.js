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

  // THIS IS FOR IF IT IS A CLIENT SELECTING THE DATE.
  let clientEmail;
  if (request.body.clientEmail) {
    clientEmail = request.body.clientEmail;
  }

  const owner = await Owner.findOne({ email });

  console.log(DateTime.fromISO(selectedDate), DateTime.fromJSDate(selectedDate));
  console.log('----------------------------------------------------------------------------------------------');
  console.log(DateTime.fromJSDate(owner.appointments[0].appointmentStart), DateTime.fromISO(owner.appointments[0].appointmentStart));
  console.log('----------------------------------------------------------------------------------------------');
  console.log(owner.appointments);

  // GET THIS DATE'S APPOINTMENTS
  let dateFilteredAppointments;
  if (!appointmentId) {
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
  } else if (appointmentId) {
    dateFilteredAppointments = owner.appointments.filter((appointment) => {
      if (
        (DateTime.fromISO(previousDate).day === DateTime.fromJSDate(appointment.appointmentStart).day &&
          DateTime.fromISO(previousDate).month === DateTime.fromJSDate(appointment.appointmentStart).month &&
          DateTime.fromISO(previousDate).year === DateTime.fromJSDate(appointment.appointmentStart).year) ||
        (DateTime.fromISO(previousDate).day === DateTime.fromJSDate(appointment.appointmentEnd).day &&
          DateTime.fromISO(previousDate).month === DateTime.fromJSDate(appointment.appointmentEnd).month &&
          DateTime.fromISO(previousDate).year === DateTime.fromJSDate(appointment.appointmentEnd).year)
      ) {
        return appointment;
      }
    });
  }

  let data = {
    userType: userType,
    currentAppointments: dateFilteredAppointments,
  };

  // IF CLIENT IS MAKING THE REQUEST, GET THEIR APPOINTMENTS FOR THIS DATE.
  let clientAppointments;
  if (userType === 'Client') {
    clientAppointments = dateFilteredAppointments.filter((appointment) => {
      let attendees = appointment.attendees;
      attendees.forEach((attendee) => {
        if (attendee.email === clientEmail) {
          return appointment;
        }
      });
    });

    data.clientAppointments = clientAppointments;
  }

  response.status(200).json({
    status: 'Success',
    data: data,
  });
});
