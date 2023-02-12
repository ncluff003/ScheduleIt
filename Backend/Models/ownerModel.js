const mongoose = require("mongoose");
const validator = require("validator");

const ownerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, `Your email must be unique`],
    validate: [validator.isEmail, `Please provide a valid email.`],
  },
  scheduleStart: {
    type: Number,
    min: 0,
    max: 24,
  },
  scheduleEnd: {
    type: Number,
    min: 0,
    max: 24,
  },
  appointments: [
    {
      appointmentType: {
        type: String,
        enum: ["Video", "Phone"],
      },
      dateRequested: {
        type: Date,
      },
      appointmentDate: {
        type: Date,
      },
      appointmentStart: {
        type: Date,
      },
      appointmentEnd: {
        type: Date,
      },
      attendees: [
        {
          firstname: {
            type: String,
            trim: true,
          },
          lastname: {
            type: String,
            trim: true,
          },
          phoneNumber: {
            type: String,
            trim: true,
          },
          email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: [true, `Your email must be unique`],
            validate: [validator.isEmail, `Please provide a valid email.`],
          },
        },
      ],
    },
  ],
});

const Owner = new mongoose.model("Owner", ownerSchema);

module.exports = Owner;
