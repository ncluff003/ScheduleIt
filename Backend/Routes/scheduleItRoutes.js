////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const express = require('express');

////////////////////////////////////////////
//  Third Party Module Instances

////////////////////////////////////////////
//  Third Party Middleware
const router = express.Router();

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  My Middleware
const routes = require('./routes.js');
const controllers = require('../Controllers');

////////////////////////////////////////////
//  Routing Middleware
const ownerRouter = require('./ownerRoutes');
const clientRouter = require('./clientRoutes');
const tokenRouter = require('./tokenRoutes');

router.route('/').post(controllers.app.getReady);
router.use('/Owners', ownerRouter);
router.use('/Client', clientRouter);
router.use('/Token', tokenRouter);

////////////////////////////////////////////
//  Exported Router
module.exports = router;
