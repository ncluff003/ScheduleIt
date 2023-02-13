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
      this.from = `Support | <${process.env.NAMECHEAP_EMAIL}>`;
      this.owner = ownerOptions;
      // FROM email will need to be set by having a business email made for this application under the domain of purenspiration.com.  The correct owner's name will be attached to it, along with adding the owner's email into the message so they can be contacted directly.  The initial email will ALWAYS say something to the effect that the client should NOT reply to the email as it is not attended, nor will it get a reply.
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
          user: process.env.NAMECHEAP_EMAIL,
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
      token: this.owner.token,
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

  /*
    Generally speaking, if an Owner or a Freelancer creates using this application, it means they are wanting to be a part of the Owner database.  So..., the first step is knowing that the Owner is emailed a random token to enter into the input to login.

    Client logins will only necessitate their email to check appointments.
  
  */
};
