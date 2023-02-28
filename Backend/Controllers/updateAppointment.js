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
  console.log(request.body);
  const info = request.body;
  const email = info.email;
  const appointmentId = info.appointmentId;

  // Start by getting the owner's information.
  // OWNER
  const owner = await Owner.findOne({ email });

  console.log(owner.appointments);

  let potentialAppointments = owner.potentialAppointments.filter((pot) => {
    return String(pot._id) === appointmentId;
  });

  owner.appointments.push(potentialAppointments[0]);

  potentialAppointments = owner.potentialAppointments.filter((pot) => {
    return String(pot._id) !== appointmentId;
  });

  owner.potentialAppointments = potentialAppointments;
  await owner.save();

  console.log(owner.appointments);

  response.status(200).json({
    status: 'Success',
    message: 'Appointment Successfully Updated.',
    data: {
      potentialAppointments: owner.potentialAppointments,
    },
  });
});
