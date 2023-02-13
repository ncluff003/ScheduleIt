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
   * First, is handling the initialization of the Owner's document and flow culminating with a random token.
   */

  // If Owner is not found, use email to send an invite to be part of the application.

  // If accepted, return to the personal website after putting a new document into the database. -- An object will need to be part of the request.
  if (owner === null) {
    console.log(`Owner with the email: ${email} NOT found.`);
  }
  console.log(owner);

  // If Owner is found, add a random token to that owner's document.  Then, send the same token in an email for the Owner to put into the form to compare it to the newly added one in the document.  If it matches, move forward to the scheduling application and add the Owner's document to the response.

  response.status(200).json({
    status: "Success",
    data: owner,
  });
});
