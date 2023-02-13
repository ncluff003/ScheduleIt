////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

////////////////////////////////////////////
//  My Models
const Owner = require("../Models/ownerModel");

module.exports = catchAsync(async (request, response) => {
  const owners = await Owner.find();
  console.log(owners);

  response.status(200).json({
    status: "Success",
    data: owners,
  });
});
