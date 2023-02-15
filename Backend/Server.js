////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const dotenv = require('dotenv');
import mongoose from 'mongoose';

////////////////////////////////////////////
//  Third Party Config Files
dotenv.config({
  path: `./config.env`,
});

////////////////////////////////////////////
//  My Modules
import App from './App';

export default {
  // EVENTUALLY, THIS WILL NEED TO BE REPLACED WITH MORE FLEXIBILITY FOR CONNECTING TO MORE THAN A MONGODB DATABASE.
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
    // THIS GIVES THE USERS MORE FLEXBILITY OVER THE PORT THEY USE.
    App.listen(PORT, () => {
      console.log(`App listening at port ${PORT}`);
    });
  },
};
