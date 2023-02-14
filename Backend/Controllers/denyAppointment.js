////////////////////////////////////////////
//  Third Party Modules
const { DateTime } = require("luxon");

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

////////////////////////////////////////////
//  My Models
const Owner = require("../Models/ownerModel");

module.exports = catchAsync(async (request, response) => {
  const info = request.params;
  const ownerEmail = info.ownerEmail;
  const clientFirstName = info.clientFirstName;
  const clientLastName = info.clientLastName;
  const clientEmail = info.clientEmail;

  const owner = await Owner.findOne({ ownerEmail });

  response.status(200).json({
    status: "Success",
    data: {
      owner: owner,
      params: info,
    },
  });
});
