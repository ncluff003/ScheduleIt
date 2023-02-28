////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);
const Email = require('../Utilities/email');

////////////////////////////////////////////
//  My Models
const Owner = require('../Models/ownerModel');

module.exports = catchAsync(async (request, response) => {
  const info = request.body;
  const email = info.email;
  const appointmentId = info.appointmentId;

  const owner = await Owner.findOne({ email });

  const filteredAppointments = owner.potentialAppointments.filter((app) => {
    return String(app._id) === appointmentId;
  });

  const potentialAppointment = filteredAppointments[0];
  const clientFirstName = potentialAppointment.attendees[1].attendeeFirstname;
  const clientLastName = potentialAppointment.attendees[1].attendeeLastname;
  const clientEmail = potentialAppointment.attendees[1].attendeeEmail;

  await new Email('appointmentDeclined', owner, {
    client: { firstname: clientFirstName, lastname: clientLastName, clientEmail: clientEmail },
  }).declineAppointment();

  owner.potentialAppointments = owner.potentialAppointments.filter((app) => {
    return String(app._id) !== appointmentId;
  });

  await owner.save();

  response.status(200).json({
    status: 'Success',
    data: {
      potentialAppointments: owner.potentialAppointments,
    },
  });
});
