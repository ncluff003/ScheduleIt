////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules;
const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

////////////////////////////////////////////
//  Third Party Module Instances

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  Third Party Middleware
const { DateTime } = require('luxon');

////////////////////////////////////////////
//  My Middleware
const { Utility } = require('./Utility');

////////////////////////////////////////////
//  Routing Middleware

////////////////////////////////////////////
//  My Modules
const Calendar = require('./Calendar');

////////////////////////////////////////////
//  Email Model

module.exports = class Email {
  constructor(emailType, ownerOptions, clientOptions) {
    if (emailType === 'ownerLogin') {
      this.to = ownerOptions.email;
      this.from = `Support | <${process.env.SUPPORT_EMAIL}>`;
      this.owner = ownerOptions;
    } else if (emailType === 'appointmentRequest' || emailType === 'appointmentUpdateRequest') {
      this.to = ownerOptions.email;
      this.from = clientOptions.client.clientEmail;
      this.owner = ownerOptions;
      this.client = clientOptions.client;
      this.appointment = clientOptions.appointment;
      this.message = clientOptions.message;
      if (process.env.NODE_ENV === 'production') {
        this.protocol = clientOptions.protocol;
        this.host = clientOptions.host;
      } else if (process.env.NODE_ENV === 'development') {
        this.protocol = clientOptions.protocol;
        this.host = clientOptions.host;
      }
    } else if (emailType === 'appointmentAccepted' || emailType === 'appointmentUpdateAccepted') {
      this.to = clientOptions.client.clientEmail;
      this.from = `Support | <${process.env.SUPPORT_EMAIL}>`;
      this.owner = ownerOptions;
      this.client = clientOptions.client;
      this.appointment = clientOptions.appointment;
    } else if (emailType === 'appointmentDeclined' || emailType === 'appointmentUpdateDeclined') {
      this.to = clientOptions.client.clientEmail;
      this.from = `Support | <${process.env.SUPPORT_EMAIL}>`;
      this.owner = ownerOptions;
      this.client = clientOptions.client;
      if (emailType === 'appointmentUpdateDeclined') {
        this.appointment = { appointmentId: clientOptions.client.appointmentId };
      }
    } else if (emailType === 'appointmentDeleted') {
      this.to = [ownerOptions.email, clientOptions.client.clientEmail];
      this.from = `Support | <${process.env.SUPPORT_EMAIL}>`;
      this.owner = ownerOptions;
      this.client = clientOptions.client;
      this.appointment = clientOptions.client.appointment;
    }
  }

  // Create Transport
  makeTransport() {
    if (process.env.NODE_ENV === `production`) {
      let transport = {};
      for (let key in Utility.transport) {
        transport[key] = Utility.transport[key];
      }
      return nodemailer.createTransport(transport);
    }
    return nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }

  async send(emailType, template, subject) {
    let emailInfo = {
      to: this.to,
      calendar: new Calendar(),
    };

    if (emailType === 'ownerLogin') {
      emailInfo.firstName = this.owner.firstname;
      emailInfo.lastName = this.owner.lastname;
      emailInfo.token = this.owner.token;
    } else if (emailType === 'appointmentRequest') {
      emailInfo.firstName = this.owner.firstname;
      emailInfo.lastName = this.owner.lastname;
      emailInfo.clientFirstName = this.client.firstname;
      emailInfo.clientLastName = this.client.lastname;
      emailInfo.clientEmail = this.client.clientEmail;
      emailInfo.clientPhone = this.client.clientPhone;
      emailInfo.communicationPreference = this.appointment.appointmentType;
      emailInfo.scheduledDate = DateTime.fromISO(this.appointment.appointmentStart).toLocaleString(DateTime.DATE_HUGE);
      emailInfo.humanScheduledStart =
        DateTime.fromISO(this.appointment.appointmentStart).toLocaleString(DateTime.TIME_SIMPLE) ||
        `${DateTime.fromISO(this.appointment.appointmentStart).toLocaleString(DateTime.TIME_24_SIMPLE)} ${
          DateTime.fromISO(this.appointment.appointmentStart).hour > 11 ? 'PM' : 'AM'
        }`;
      emailInfo.humanScheduledEnd =
        DateTime.fromISO(this.appointment.appointmentEnd).toLocaleString(DateTime.TIME_SIMPLE) ||
        `${DateTime.fromISO(this.appointment.appointmentEnd).toLocaleString(DateTime.TIME_24_SIMPLE)} ${
          DateTime.fromISO(this.appointment.appointmentEnd).hour > 11 ? 'PM' : 'AM'
        }`;
      emailInfo.message = this.message;
      emailInfo.url = `${this.protocol}://${this.host}/ScheduleIt/Owners/${this.owner.email}/Appointments`;
      emailInfo.ownerEmail = this.owner.email;
      emailInfo.requestDate = this.appointment.dateRequested;
      emailInfo.scheduledDateISO = DateTime.local(
        DateTime.fromISO(this.appointment.appointmentStart).year,
        DateTime.fromISO(this.appointment.appointmentStart).month,
        DateTime.fromISO(this.appointment.appointmentStart).day,
        0,
        0,
        0,
      );
      emailInfo.scheduledStart = this.appointment.appointmentStart;
      emailInfo.scheduledEnd = this.appointment.appointmentEnd;
    } else if (emailType === 'appointmentAccepted' || emailType === 'appointmentUpdateAccepted') {
      emailInfo.firstName = this.owner.firstname;
      emailInfo.lastName = this.owner.lastname;
      emailInfo.company = this.owner.company;
      emailInfo.clientFirstName = this.client.firstname;
      emailInfo.clientLastName = this.client.lastname;
      emailInfo.clientEmail = this.client.clientEmail;
      emailInfo.clientPhone = this.client.clientPhone;
      emailInfo.communicationPreference = this.appointment.appointmentType;
      emailInfo.scheduledDate = DateTime.fromJSDate(this.appointment.appointmentStart).toLocaleString(DateTime.DATE_HUGE);
      emailInfo.humanScheduledStart =
        DateTime.fromJSDate(this.appointment.appointmentStart).toLocaleString(DateTime.TIME_SIMPLE) ||
        `${DateTime.fromJSDate(this.appointment.appointmentStart).toLocaleString(DateTime.TIME_24_SIMPLE)} ${
          DateTime.fromJSDate(this.appointment.appointmentStart).hour > 11 ? 'PM' : 'AM'
        }`;
      emailInfo.humanScheduledEnd =
        DateTime.fromJSDate(this.appointment.appointmentEnd).toLocaleString(DateTime.TIME_SIMPLE) ||
        `${DateTime.fromJSDate(this.appointment.appointmentEnd).toLocaleString(DateTime.TIME_24_SIMPLE)} ${
          DateTime.fromJSDate(this.appointment.appointmentEnd).hour > 11 ? 'PM' : 'AM'
        }`;
      emailInfo.message = this.message;
      emailInfo.url = `${this.protocol}://${this.host}/ScheduleIt/Owners/${this.owner.email}/Appointments`;
      emailInfo.ownerEmail = this.owner.email;
      emailInfo.requestDate = this.appointment.dateRequested;
      emailInfo.scheduledDateISO = DateTime.local(
        DateTime.fromISO(this.appointment.appointmentStart).year,
        DateTime.fromISO(this.appointment.appointmentStart).month,
        DateTime.fromISO(this.appointment.appointmentStart).day,
        0,
        0,
        0,
      );
      emailInfo.scheduledStart = this.appointment.appointmentStart;
      emailInfo.scheduledEnd = this.appointment.appointmentEnd;
    } else if (emailType === 'appointmentUpdateRequest') {
      emailInfo.firstName = this.owner.firstname;
      emailInfo.lastName = this.owner.lastname;
      emailInfo.clientFirstName = this.client.firstname;
      emailInfo.clientLastName = this.client.lastname;
      emailInfo.clientEmail = this.client.clientEmail;
      emailInfo.clientPhone = this.client.clientPhone;
      emailInfo.communicationPreference = this.appointment.appointmentType;
      emailInfo.scheduledDate = DateTime.fromISO(this.appointment.appointmentStart).toLocaleString(DateTime.DATE_HUGE);
      emailInfo.humanScheduledStart =
        DateTime.fromISO(this.appointment.appointmentStart).toLocaleString(DateTime.TIME_SIMPLE) ||
        `${DateTime.fromISO(this.appointment.appointmentStart).toLocaleString(DateTime.TIME_24_SIMPLE)} ${
          DateTime.fromISO(this.appointment.appointmentStart).hour > 11 ? 'PM' : 'AM'
        }`;
      emailInfo.humanScheduledEnd =
        DateTime.fromISO(this.appointment.appointmentEnd).toLocaleString(DateTime.TIME_SIMPLE) ||
        `${DateTime.fromISO(this.appointment.appointmentEnd).toLocaleString(DateTime.TIME_24_SIMPLE)} ${
          DateTime.fromISO(this.appointment.appointmentEnd).hour > 11 ? 'PM' : 'AM'
        }`;
      emailInfo.message = this.message;
      emailInfo.url = `${this.protocol}://${this.host}/ScheduleIt/Owners/${this.owner.email}/Appointments`;
      emailInfo.ownerEmail = this.owner.email;
      emailInfo.requestDate = this.appointment.dateRequested;
      emailInfo.scheduledDateISO = DateTime.local(
        DateTime.fromISO(this.appointment.appointmentStart).year,
        DateTime.fromISO(this.appointment.appointmentStart).month,
        DateTime.fromISO(this.appointment.appointmentStart).day,
        0,
        0,
        0,
      );
      emailInfo.scheduledStart = this.appointment.appointmentStart;
      emailInfo.scheduledEnd = this.appointment.appointmentEnd;
      emailInfo.appointmentId = this.appointment.appointmentId;
    } else if (emailType === 'appointmentDeclined' || emailType === 'appointmentUpdateDeclined') {
      emailInfo.firstName = this.owner.firstname;
      emailInfo.lastName = this.owner.lastname;
      emailInfo.ownerEmail = this.owner.email;
      emailInfo.clientFirstName = this.client.firstname;
      emailInfo.clientLastName = this.client.lastname;
    } else if (emailType === 'appointmentDeleted') {
      emailInfo.firstName = this.owner.firstname;
      emailInfo.lastName = this.owner.lastname;
      emailInfo.clientFirstName = this.client.firstname;
      emailInfo.clientLastName = this.client.lastname;
      emailInfo.communicationPreference = this.appointment.appointmentType;
      emailInfo.scheduledDateJS = DateTime.fromJSDate(this.appointment.appointmentStart).toLocaleString(DateTime.DATE_HUGE);
      emailInfo.humanScheduledStartJS =
        DateTime.fromJSDate(this.appointment.appointmentStart).toLocaleString(DateTime.TIME_SIMPLE) ||
        `${DateTime.fromJSDate(this.appointment.appointmentStart).toLocaleString(DateTime.TIME_24_SIMPLE)} ${
          DateTime.fromJSDate(this.appointment.appointmentStart).hour > 11 ? 'PM' : 'AM'
        }`;
      emailInfo.ownerEmail = this.owner.email;
      emailInfo.humanScheduledEndJS =
        DateTime.fromJSDate(this.appointment.appointmentEnd).toLocaleString(DateTime.TIME_SIMPLE) ||
        `${DateTime.fromJSDate(this.appointment.appointmentEnd).toLocaleString(DateTime.TIME_24_SIMPLE)} ${
          DateTime.fromJSDate(this.appointment.appointmentEnd).hour > 11 ? 'PM' : 'AM'
        }`;
      emailInfo.ownerEmail = this.owner.email;
      emailInfo.clientEmail = this.client.clientEmail;
    }

    const html = pug.renderFile(`${__dirname}/../Backend/Views/Emails/${template}.pug`, emailInfo);

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: htmlToText.convert(html),
      attachments: [
        {
          filename: 'schedule-it-logo.png',
          contentType: 'image/jpeg',
          path: __dirname + `/../schedule-it-logo.png`,
          cid: 'company-logo',
        },
      ],
      envelope: {
        from: process.env.SCHEDULE_IT_EMAIL,
        to: this.owner.email,
      },
    };

    await this.makeTransport().sendMail(mailOptions);
  }

  async sendToken() {
    await this.send('ownerLogin', 'sendToken', 'Confirm Login With Token');
  }

  async requestAppointment() {
    await this.send('appointmentRequest', 'requestAppointment', 'Appointment Request');
  }

  async acceptAppointment() {
    await this.send('appointmentAccepted', 'acceptAppointment', 'Appointment Accepted');
  }

  async acceptUpdatedAppointment() {
    await this.send('appointmentUpdateAccepted', 'acceptUpdatedAppointment', 'Appointment Update Accepted');
  }

  async declineAppointment() {
    await this.send('appointmentDeclined', 'declineAppointment', 'Appointment Declined');
  }

  async requestAppointmentUpdate() {
    await this.send('appointmentUpdateRequest', 'requestAppointmentUpdate', 'Appointment Update');
  }

  async declineAppointmentUpdate() {
    await this.send('appointmentUpdateDeclined', 'declineAppointmentUpdate', 'Appointment Update Declined');
  }

  async deleteAppointment() {
    await this.send('appointmentDeleted', 'deleteAppointment', 'Appointment Deleted');
  }
};
