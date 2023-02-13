////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

////////////////////////////////////////////
//  Third Party Module Instances
const App = express();

////////////////////////////////////////////
//  Third Party Config Files
App.set(`view engine`, `pug`);
App.set(`views`, path.join(__dirname, `Views`));
App.use(bodyParser.json({ limit: `300kb` }));
App.use(express.json());

////////////////////////////////////////////
//  Routing Middleware
const routes = require("./Routes/routes");
const scheduleItRouter = require(`./Routes/scheduleItRoutes`);

console.log(routes);

////////////////////////////////////////////
//  My Middleware
App.use(routes.scheduleIt.app, scheduleItRouter); // CONFIGURATION IN DOCUMENTATION NEEDS TO LET USERS KNOW ABOUT THIS.

////////////////////////////////////////////
//  Exporting App
module.exports = App;
