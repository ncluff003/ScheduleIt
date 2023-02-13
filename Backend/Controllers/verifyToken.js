////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

////////////////////////////////////////////
//  My Models
const Owner = require("../Models/ownerModel");

module.exports = catchAsync(async (request, response, next) => {
  const email = request.body.email;
  const token = request.body.token;
  const owner = await Owner.findOne({ email }).select("+token");
  let tokenVerified = false;
  console.log(request.body);

  console.log(owner, token);
  if (token !== owner.token) {
    return next(new AppError("Token provided does not match the token given to the owner.", 400));
  }

  tokenVerified = true;
  response.status(200).json({
    status: "Success",
    data: {
      owner: owner,
      token: token,
      tokenVerified: tokenVerified,
      message: "Token Verified",
    },
  });
});
