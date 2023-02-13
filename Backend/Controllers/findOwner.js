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
  console.log(request.params);
  console.log(request.body);
  const email = request.params.email;
  const owner = await Owner.findOne({ email });
  const token = randomToken(8);
  let newOwner;
  let firstTime = false;

  // If Owner is not found, create one using the request.body.
  if (owner === null) {
    console.log(`Owner with the email: ${email} NOT found.`);
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

  // If Owner is found, update it with the created token.
  if (owner !== null && owner !== undefined) {
    await Owner.findOneAndUpdate({ email }, { token: token });
    owner.token = token;
    await new Email("ownerLogin", owner, {}).sendToken();
  }

  // After setting the token, next is sending an email with the token inside of it.

  console.log(owner);

  const userType = "Owner";
  response.status(200).json({
    status: "Success",
    data: {
      userType: userType,
      owner: owner,
      token: token,
      firstTime: firstTime, // If it is the first time, a message stating that the owner is now created and the button needs to be clicked again to start the login process.  Also, re-assure them that the double click is not going to be needed again.
    },
  });
});
