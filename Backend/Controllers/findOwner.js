////////////////////////////////////////////
//  Third Party Modules
const randomToken = require("random-token");

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);
const Email = require("../Utilities/email");

////////////////////////////////////////////
//  My Models
const Owner = require("../Models/ownerModel");

module.exports = catchAsync(async (request, response) => {
  const email = request.params.email;
  const owner = await Owner.findOne({ email });
  const token = randomToken(8);
  let newOwner;
  let firstTime = false;
  console.log(request.body, request.params);
  console.log(owner);

  if (owner === null) {
    newOwner = await Owner.create({
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      company: request.body.company,
      email: request.body.email,
      scheduleStart: request.body.scheduleStart,
      scheduleEnd: request.body.scheduleEnd,
      appointments: request.body.appointments,
      token: token,
    });
    firstTime = true;
    await new Email("ownerLogin", newOwner, {}).sendToken();
  }

  if (owner !== null && owner !== undefined) {
    await Owner.findOneAndUpdate({ email }, { token: token });
    owner.token = token;
    await new Email("ownerLogin", owner, {}).sendToken();
  }

  const userType = "Owner";
  response.status(200).json({
    status: "Success",
    data: {
      userType: userType,
      owner: owner,
      token: token,
      firstTime: firstTime,
    },
  });
});
