////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

////////////////////////////////////////////
//  Third Party Module Instances
const App = express();

////////////////////////////////////////////
//  My Modules
const controllers = require('./Controllers');

////////////////////////////////////////////
//  Third Party Config Files
App.set(`view engine`, `pug`);
App.set(`views`, path.join(__dirname, `Views`));
App.use(bodyParser.json({ limit: `300kb` }));
App.use(express.json());
App.use(express.urlencoded({ extended: true, limit: '10kb' }));
// App.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       connectSrc: ["'self'", `${process.env.PROD_URL}`, `http://127.0.0.1:${process.env.PORT}/*`],
//     },
//   }),
// );
App.use(xss());
App.use(hpp());
App.use(compression());

////////////////////////////////////////////
//  Routing Middleware
const routes = require('./Routes/routes');
const scheduleItRouter = require(`./Routes/scheduleItRoutes`);

////////////////////////////////////////////
//  My Middleware
if (process.env.STATIC_FOLDER) {
  App.use(express.static(process.env.STATIC_FOLDER));
}
App.use(routes.scheduleIt.app, scheduleItRouter); // CONFIGURATION IN DOCUMENTATION NEEDS TO LET USERS KNOW ABOUT THIS.

////////////////////////////////////////////
//  Exporting App
module.exports = App;
