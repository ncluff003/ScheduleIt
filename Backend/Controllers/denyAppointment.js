////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);
const Email = require('../Utilities/email');

////////////////////////////////////////////
//  My Models
const Owner = require('../Models/ownerModel');

module.exports = catchAsync(async (request, response) => {
  const info = request.params;
  const email = info.ownerEmail;
  const clientFirstName = info.clientFirstName;
  const clientLastName = info.clientLastName;
  const clientEmail = info.clientEmail;

  const owner = await Owner.findOne({ email });

  await new Email('appointmentDeclined', owner, {
    client: { firstname: clientFirstName, lastname: clientLastName, clientEmail: clientEmail },
  }).declineAppointment();

  if (process.env.NODE_ENV === 'development') {
    response.redirect(301, process.env.DEV_URL);
  } else if (process.env.NODE_ENV === 'production') {
    response.redirect(301, process.env.PROD_URL);
  }

  // response.status(200).json({
  //   status: 'Success',
  //   data: {
  //     owner: owner,
  //     params: info,
  //   },
  // });
});
