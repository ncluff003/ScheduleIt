////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`../Utilities/catchAsync`);
const AppError = require(`../Utilities/appError`);

module.exports = catchAsync(async (request, response) => {
  if (process.env.NODE_ENV === 'development') {
    response.redirect(301, process.env.DEV_URL);
  } else if (process.env.NODE_ENV === 'production') {
    response.redirect(301, process.env.PROD_URL);
  }
});
