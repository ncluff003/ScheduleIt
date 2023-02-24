////////////////////////////////////////////
//  Third Party Modules
const randomToken = require('random-token');

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);
const Email = require('../Utilities/email');

////////////////////////////////////////////
//  My Models
const Owner = require('../Models/ownerModel');

module.exports = catchAsync(async (request, response) => {
  // THIS MUST BE UPDATED TO REFLECT THE UPDATE REGARDING THE NEED FOR THE FREELANCER'S AND OWNER'S NEED TO PROVIDE THE ENVIRONMENT VARIABLES AND DATABASE CONNECTION STRING.
  console.log(request.body);
  const details = request.body.details;
  const schedule = request.body.schedule;
  const email = details.email;
  const owner = await Owner.findOne({ email });
  const token = randomToken(8);
  let newOwner;
  let firstTime = false;

  if (owner === null) {
    newOwner = await Owner.create({
      firstname: details.firstname,
      lastname: details.lastname,
      company: details.company,
      email: details.email,
      scheduleStart: schedule.start,
      scheduleEnd: schedule.end,
      appointments: schedule.appointments,
      token: token,
    });
    firstTime = true;
    await new Email('ownerLogin', newOwner, {}).sendToken();
  }

  if (owner !== null && owner !== undefined) {
    await Owner.findOneAndUpdate({ email }, { token: token });
    owner.token = token;
    await new Email('ownerLogin', owner, {}).sendToken();
  }

  const userType = 'Owner';
  response.status(200).json({
    status: 'Success',
    data: {
      userType: userType,
      firstTime: firstTime,
    },
  });
});
