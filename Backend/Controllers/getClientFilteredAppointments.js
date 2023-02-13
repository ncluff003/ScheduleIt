////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

////////////////////////////////////////////
//  My Models
const Owner = require("../Models/ownerModel");

module.exports = catchAsync(async (request, response) => {
  console.log(request.params);
  const email = request.params.email;
  const owner = await Owner.findOne({ email });

  /*
   * First is checking for the client's email for the client router.
   */

  // Check for 'clientEmail'.  If found, return the owner's appointments along with a filtered version of the appointments that the client is a part of.  The appointments themselves should have enough info to be able to control whether the client can update or delete them or not.

  // If 'clientEmail' not found, just return the Owners appointments and an empty array for the other ones.

  response.status(200).json({
    status: "Success",
    data: owner,
  });
});
