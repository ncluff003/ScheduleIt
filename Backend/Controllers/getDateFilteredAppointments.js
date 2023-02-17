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
  let clientEmail;
  if (request.body.clientEmail) {
    clientEmail = request.body.clientEmail;
  }

  const owner = await Owner.findOne({ email });

  const dateFilteredAppointments = owner.appointments.filter((appointment) => {
    if (
      DateTime.fromISO(selectedDate).day === DateTime.fromISO(appointment.appointmentStart).day ||
      DateTime.fromISO(selectedDate).day === DateTime.fromISO(appointment.appointmentEnd).day
    ) {
      return appointment;
    }
  });

  let data = {
    userType: userType,
    currentAppointments: dateFilteredAppointments,
  };

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
