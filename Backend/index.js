////////////////////////////////////
// Individual Exports
const Server = require('./Server');
const ScheduleItRouter = require('./Routes/scheduleItRoutes.js');
const Routes = require('./Routes/routes.js');
const Controllers = require('./Controllers');

module.exports = {
  server: Server,
  router: ScheduleItRouter,
  routes: Routes,
  controllers: Controllers,
};
