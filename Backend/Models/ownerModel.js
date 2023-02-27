const mongoose = require('mongoose');
const validator = require('validator');

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
  phone: {
    type: String,
    trim: true,
  },
  scheduleStart: {
    type: Date,
  },
  scheduleEnd: {
    type: Date,
  },
  appointments: [
    {
      appointmentType: {
        type: String,
        enum: ['Video Chat', 'Phone Call'],
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
          attendeeFirstname: {
            type: String,
            trim: true,
          },
          attendeeLastname: {
            type: String,
            trim: true,
          },
          attendeePhone: {
            type: String,
            trim: true,
          },
          attendeeEmail: {
            type: String,
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, `Please provide a valid email.`],
          },
        },
      ],
    },
  ],
  potentialAppointments: [
    {
      update: {
        type: Boolean,
        default: false,
      },
      appointmentType: {
        type: String,
        enum: ['Video Chat', 'Phone Call'],
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
          attendeeFirstname: {
            type: String,
            trim: true,
          },
          attendeeLastname: {
            type: String,
            trim: true,
          },
          attendeePhone: {
            type: String,
            trim: true,
          },
          attendeeEmail: {
            type: String,
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, `Please provide a valid email.`],
          },
        },
      ],
    },
  ],
  token: {
    type: String,
    select: false,
  },
});

const Owner = new mongoose.model('Owner', ownerSchema);

module.exports = Owner;
