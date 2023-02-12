////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const dotenv = require("dotenv");
const mongoose = require("mongoose");

////////////////////////////////////////////
//  Third Party Config Files
dotenv.config({
  path: `./config.env`,
});

////////////////////////////////////////////
//  My Modules
const App = require("./App");

////////////////////////////////////////////
//  Initialize Port Number
// const PORT = process.env.PORT || 3333;

/*
   TODO
  @ 1. Connect to the database.
  @ 2. Start the server.
*/

module.exports = {
  // EVENTUALLY, THIS WILL NEED TO BE REPLACED WITH MORE FLEXIBILITY FOR CONNECTING TO MORE THAN A MONGODB DATABASE.
  dbConnect: (connectionString) => {
    const DB = connectionString;
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log(`DB Connection Successful`));
  },
  startServer: (PORT) => {
    // THIS GIVES THE USERS MORE FLEXBILITY OVER THE PORT THEY USE.
    App.listen(process.env.PORT || PORT, () => {
      console.log(`App listening at port ${proces.env.PORT || PORT}`);
    });
  },
};
