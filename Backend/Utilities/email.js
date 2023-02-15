////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules;
const nodemailer = require(`nodemailer`);
const pug = require(`pug`);
const htmlToText = require(`html-to-text`);

////////////////////////////////////////////
//  Third Party Module Instances

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  Third Party Middleware
const { DateTime } = require("luxon");

////////////////////////////////////////////
//  My Middleware

////////////////////////////////////////////
//  Routing Middleware

////////////////////////////////////////////
//  My Modules
const Calendar = require("./Calendar");

////////////////////////////////////////////
//  Email Model

module.exports = class Email {
  constructor(emailType, ownerOptions, clientOptions) {
    if (emailType === "ownerLogin") {
      this.to = ownerOptions.email;
      // this.from = `Support | <${process.env.NAMECHEAP_EMAIL}>`;
      this.from = `Support | <${process.env.SCHEDULE_IT_EMAIL}>`;
      this.owner = ownerOptions;
    } else if (emailType === "appointmentRequest" || emailType === "appointmentUpdateRequest") {
      this.to = ownerOptions.email;
      this.from = clientOptions.client.clientEmail;
      this.owner = ownerOptions;
      this.client = clientOptions.client;
      this.appointment = clientOptions.appointment;
      this.message = clientOptions.message;
      if (process.env.NODE_ENV === "production") {
        this.protocol = clientOptions.protocol;
        this.host = clientOptions.host;
      } else if (process.env.NODE_ENV === "development") {
        this.protocol = clientOptions.protocol;
        this.host = clientOptions.host;
      }
    } else if (emailType === "appointmentDeclined" || emailType === "appointmentUpdateDeclined") {
      this.to = clientOptions.client.clientEmail;
      // this.from = `Support | <${process.env.NAMECHEAP_EMAIL}>`;
      this.from = `Support | <${process.env.SCHEDULE_IT_EMAIL}>`;
      this.owner = ownerOptions;
      this.client = clientOptions.client;
      this.appointment = { appointmentType: undefined };
      if (emailType === "appointmentUpdateDeclined") {
        this.appointment = { appointmentId: clientOptions.client.appointmentId };
      }
    } else if (emailType === "appointmentDeleted") {
      this.to = [ownerOptions.email, clientOptions.client.clientEmail];
      // this.from = `Support | <${process.env.NAMECHEAP_EMAIL}>`;
      this.from = `Support | <${process.env.SCHEDULE_IT_EMAIL}>`;
      this.owner = ownerOptions;
      this.client = clientOptions.client;
      this.appointment = clientOptions.client.appointment;
    }
  }

  // Create Transport
  makeTransport() {
    if (process.env.NODE_ENV === `production`) {
      return nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: process.env.SECURE_PORT,
        secure: true,
        auth: {
          // user: process.env.NAMECHEAP_EMAIL,
          user: process.env.SCHEDULE_IT_EMAIL,
          pass: process.env.NAMECHEAP_PASSWORD,
        },
        logger: true,
      });
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

  async send(template, subject) {
    // This will take the template from the pug file and create an email from it.
    const html = pug.renderFile(`${__dirname}/../Views/Emails/${template}.pug`, {
      // from: this.from,
      to: this.to,
      calendar: new Calendar(),
      firstName: this.owner.firstname,
      lastName: this.owner.lastname,
      clientFirstName: this.client.firstname,
      clientLastName: this.client.lastname,
      token: this.owner.token,
      communicationPreference: this.appointment.appointmentType,
      clientEmail: this.client.clientEmail,
      clientPhone: this.client.clientPhone,
      requestDate: this.appointment.dateRequested,
      scheduledDate: DateTime.fromISO(this.appointment.appointmentStart).toLocaleString(DateTime.DATE_HUGE),
      scheduledDateJS: DateTime.fromJSDate(this.appointment.appointmentStart).toLocaleString(DateTime.DATE_HUGE),
      scheduledDateISO: DateTime.local(
        DateTime.fromISO(this.appointment.appointmentStart).year,
        DateTime.fromISO(this.appointment.appointmentStart).month,
        DateTime.fromISO(this.appointment.appointmentStart).day,
        0,
        0,
        0
      ),
      scheduledStart: this.appointment.appointmentStart,
      scheduledEnd: this.appointment.appointmentEnd,
      humanScheduledStart:
        DateTime.fromISO(this.appointment.appointmentStart).toLocaleString(DateTime.TIME_SIMPLE) ||
        `${DateTime.fromISO(this.appointment.appointmentStart).toLocaleString(DateTime.TIME_24_SIMPLE)} ${DateTime.fromISO(this.appointment.appointmentStart).hour > 11 ? "PM" : "AM"}`,
      humanScheduledStartJS:
        DateTime.fromJSDate(this.appointment.appointmentStart).toLocaleString(DateTime.TIME_SIMPLE) ||
        `${DateTime.fromJSDate(this.appointment.appointmentStart).toLocaleString(DateTime.TIME_24_SIMPLE)} ${DateTime.fromJSDate(this.appointment.appointmentStart).hour > 11 ? "PM" : "AM"}`,
      humanScheduledEnd:
        DateTime.fromISO(this.appointment.appointmentEnd).toLocaleString(DateTime.TIME_SIMPLE) ||
        `${DateTime.fromISO(this.appointment.appointmentEnd).toLocaleString(DateTime.TIME_24_SIMPLE)} ${DateTime.fromISO(this.appointment.appointmentEnd).hour > 11 ? "PM" : "AM"}`,
      humanScheduledEndJS:
        DateTime.fromJSDate(this.appointment.appointmentEnd).toLocaleString(DateTime.TIME_SIMPLE) ||
        `${DateTime.fromJSDate(this.appointment.appointmentEnd).toLocaleString(DateTime.TIME_24_SIMPLE)} ${DateTime.fromJSDate(this.appointment.appointmentEnd).hour > 11 ? "PM" : "AM"}`,
      message: this.message,
      url: `${this.protocol}://${this.host}/ScheduleIt/Owners/${this.owner.email}/Appointments`,
      ownerEmail: this.owner.email,
      appointmentId: this.appointment.appointmentId,
      // user: this.user,
      // username: this.username,
      // subject: subject,
      // url: this.url,
      // greeting: Calendar.getGreeting(),
      // hour: Calendar.getHour(),
      // minutes: Calendar.getMinutes(),
      // timeOfDay: Calendar.getTimeOfDay(),
      // day: Calendar.getDay(),
      // weekday: Calendar.getWeekday(),
      // month: Calendar.getMonth(),
      // year: Calendar.getYear(),
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: htmlToText.convert(html),
      attachments: [
        {
          filename: "schedule-it-logo.png",
          contentType: "image/jpeg",
          path: __dirname + `/../../schedule-it-logo.png`,
          cid: "company-logo",
        },
      ],
    };

    await this.makeTransport().sendMail(mailOptions);
  }

  async sendToken() {
    await this.send("sendToken", "Confirm Login With Token");
  }

  async requestAppointment() {
    await this.send("requestAppointment", "Appointment Request");
  }

  async declineAppointment() {
    await this.send("declineAppointment", "Appointment Declined");
  }

  async requestAppointmentUpdate() {
    await this.send("requestAppointmentUpdate", "Appointment Update");
  }

  async declineAppointmentUpdate() {
    await this.send("declineAppointmentUpdate", "Appointment Update Declined");
  }

  async deleteAppointment() {
    await this.send("deleteAppointment", "Appointment Deleted");
  }

  /*
    Generally speaking, if an Owner or a Freelancer creates using this application, it means they are wanting to be a part of the Owner database.  So..., the first step is knowing that the Owner is emailed a random token to enter into the input to login.

    Client logins will only necessitate their email to check appointments.
  
  */
};
