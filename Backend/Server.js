////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const dotenv = require('dotenv');
const mongoose = require('mongoose');

////////////////////////////////////////////
//  Third Party Config Files
dotenv.config({
  path: `./config.env`,
});

////////////////////////////////////////////
//  My Modules
const App = require('./App');

module.exports = {
  // EVENTUALLY, THIS WILL NEED TO BE REPLACED WITH MORE FLEXIBILITY FOR CONNECTING TO MORE THAN A MONGODB DATABASE.
  connectToDB: {
    mongo: (connectionString) => {
      // const DB = process.env.DB.replace(`<PASSWORD>`, process.env.DBPASSWORD)
      //   .replace(`<DATABASE>`, process.env.DBNAME)
      //   .replace(`<USERNAME>`, process.env.DBUSERNAME);
      const DB = connectionString;
      console.log(process.env.DB);
      mongoose
        .connect(DB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => console.log(`DB Connection Successful`));
    },
  },
  startServer: (PORT) => {
    // THIS GIVES THE USERS MORE FLEXBILITY OVER THE PORT THEY USE.
    App.listen(PORT, () => {
      console.log(`App listening at port ${PORT}`);
    });
  },
};
