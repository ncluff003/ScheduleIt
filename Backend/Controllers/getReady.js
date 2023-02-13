////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

module.exports = catchAsync(async (request, response) => {
  // GIVE THE USER SOME CREATIVE LICENSE TO LET USERS KNOW THE APPLICATION SHOULD BE READY TO USE.
  console.log(request.body);
  const message = request.body.message;

  response.status(200).json({
    status: "Success",
    message: message,
  });
});
