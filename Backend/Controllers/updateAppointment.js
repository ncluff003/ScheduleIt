////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);
const Email = require('../Utilities/email');

////////////////////////////////////////////
//  My Models
const Owner = require('../Models/ownerModel');

module.exports = catchAsync(async (request, response, next) => {
  const info = request.body;
  const email = info.email;
  const appointmentId = info.appointmentId;

  // Start by getting the owner's information.
  // OWNER
  const owner = await Owner.findOne({ email });

  console.log(owner.appointments);
  console.log(owner.potentialAppointments);

  let potentialAppointments = owner.potentialAppointments.filter((pot) => {
    return String(pot._id) === appointmentId;
  });

  const newestAppointment = potentialAppointments[0];

  // CLIENT
  const client = {
    firstname: newestAppointment.attendees[1].attendeeFirstname,
    lastname: newestAppointment.attendees[1].attendeeLastname,
    clientEmail: newestAppointment.attendees[1].attendeeEmail,
    clientPhone: newestAppointment.attendees[1].attendeePhone,
  };

  // APPOINTMENT
  const appointment = {
    appointmentType: newestAppointment.appointmentType,
    dateRequested: newestAppointment.dateRequested,
    appointmentStart: newestAppointment.appointmentStart,
    appointmentEnd: newestAppointment.appointmentEnd,
  };

  owner.appointments.push(potentialAppointments[0]);

  potentialAppointments = owner.potentialAppointments.filter((pot) => {
    return String(pot._id) !== appointmentId;
  });

  owner.potentialAppointments = potentialAppointments;
  await owner.save();

  await new Email('appointmentUpdateAccepted', owner, {
    host: request.header('host'),
    protocol: request.protocol,
    client: client,
    appointment: appointment,
  }).acceptUpdatedAppointment();

  response.status(200).json({
    status: 'Success',
    message: 'Appointment Successfully Updated.',
    data: {
      potentialAppointments: owner.potentialAppointments,
      currentAppointments: owner.appointments,
    },
  });
});
