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
  connectToDB: {
    mongo: (connectionString) => {
      const DB = connectionString;
      mongoose
        .connect(DB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => console.log(`DB Connection Successful`));
    },
  },
  startServer: (PORT) => {
    App.listen(PORT, () => {
      console.log(`App listening at port ${PORT}`);
    });
  },
};
