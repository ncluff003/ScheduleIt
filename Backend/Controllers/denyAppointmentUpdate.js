////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);
const Email = require("../Utilities/email");

////////////////////////////////////////////
//  My Models
const Owner = require("../Models/ownerModel");

module.exports = catchAsync(async (request, response) => {
  const info = request.params;
  const ownerEmail = info.ownerEmail;
  const clientFirstName = info.clientFirstName;
  const clientLastName = info.clientLastName;
  const clientEmail = info.clientEmail;
  const appointmentId = info.appointmentId;

  const owner = await Owner.findOne({ ownerEmail });

  await new Email("appointmentUpdateDeclined", owner, {
    client: { firstname: clientFirstName, lastname: clientLastName, clientEmail: clientEmail, appointmentId: appointmentId },
  }).declineAppointmentUpdate();

  response.status(200).json({
    status: "Success",
    data: {
      owner: owner,
      params: info,
    },
  });
});
