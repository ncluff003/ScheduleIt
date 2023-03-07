////////////////////////////////////
// Individual Exports
const Server = require('./Server');
const ScheduleItRouter = require('./Routes/scheduleItRoutes.js');
const Routes = require('./Routes/routes.js');
const Methods = require('./Methods');

module.exports = {
  server: Server,
  router: ScheduleItRouter,
  scheduleItRoute: Routes.scheduleIt.app,
  setupEmailTransport: Methods.setupEmailTransport,
};
