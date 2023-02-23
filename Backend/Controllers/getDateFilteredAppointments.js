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
  const userType = request.body.userType;
  const email = request.body.ownerEmail;
  let selectedDate = request.body.selectedDate;
  selectedDate = DateTime.fromISO(selectedDate).set({ hours: 0, minutes: 0, seconds: 0 }).toISO();

  // THIS IS FOR IF IT IS A CLIENT SELECTING THE DATE.
  let clientEmail;
  if (request.body.clientEmail) {
    clientEmail = request.body.clientEmail;
  }

  const owner = await Owner.findOne({ email });

  // GET THIS DATE'S APPOINTMENTS
  const dateFilteredAppointments = owner.appointments.filter((appointment) => {
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
