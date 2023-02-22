////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

////////////////////////////////////////////
//  My Models
const Owner = require('../Models/ownerModel');

module.exports = catchAsync(async (request, response) => {
  console.log(request.params);
  // THIS MUST BE UPDATED TO REFLECT THE UPDATE REGARDING THE NEED FOR THE FREELANCER'S AND OWNER'S NEED TO PROVIDE THE ENVIRONMENT VARIABLES AND DATABASE CONNECTION STRING.
  const email = request.params.email;
  const id = request.params.appointmentId;
  const owner = await Owner.findOne({ email });

  const filteredAppointments = owner.appointments.filter((app) => String(app._id) === id);
  const appointment = filteredAppointments[0];

  const userType = 'Owner';
  response.status(200).json({
    status: 'Success',
    data: {
      appointment: appointment,
    },
  });
});
