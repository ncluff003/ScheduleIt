import axios from 'axios';
import { DateTime } from 'luxon';
import { addClasses, insertElement } from '../Global/Utility';
import Theme from '../Global/Theme';
import { planningHeader } from '../Components/Header';
import { scheduleDisplay } from '../Components/Display';

export default class Schedule {
  constructor(settings) {
    if (document.querySelector('#schedule')) {
      if (!settings) {
        return console.error('You must have settings for your schedule.');
      }
      if (!settings.theme) {
        return console.error(`You must set your schedule's theme.`);
      }
      if (!settings.details) {
        return console.error(`You must give the owner or freelancer details.`);
      }
      if (!settings.schedule) {
        return console.error(`You must set your schedule's settings.`);
      }
      if (settings.theme) {
        if (!settings.theme.timeOfDay.set) {
          settings.theme.timeOfDay.set === 'Auto';
        }
        if (settings.theme.timeOfDay.set === 'Auto') {
          settings.theme.timeOfDay.setting = DateTime.now().hour > 6 && DateTime.now().hour < 18 ? 'Day' : 'Night';
          console.log(settings.theme.timeOfDay.setting);
        }
        if (settings.theme.timeOfDay.set && settings.theme.timeOfDay.set === 'Manual') {
          if (!settings.theme.timeOfDay.setting) {
            return console.error('If you are manually setting your time of day, you must provide the setting.');
          }
        }
        if (!settings.theme.message) {
          settings.theme.message = 'Open For Business.';
        }
        if (!settings.theme.intervals) {
          settings.theme.intervals = 15; // Setting a default for this setting.
        }
        if (!settings.theme.font) {
          settings.theme.font = 'sans-serif'; // Setting the default font.
        }
        if (!settings.theme.colors) {
          return console.error(`You must set the colors for your schedule.`);
        } else if (settings.theme.colors) {
          if (!settings.theme.colors.primary) {
            return console.error(`You must set the primary color of your schedule.`);
          }
          if (!settings.theme.colors.secondary) {
            return console.error(`You must set the secondary color of your schedule.`);
          }
          if (!settings.theme.colors.tertiary) {
            return console.error(`You must set the tertiary color of your schedule.`);
          }
        }
        settings.theme.colors.grayScale = {
          black: `#030303`,
          chineseBlack: `#111111`,
          raisinBlack: `#222222`,
          darkCharcoal: `#333333`,
          outerSpace: `#444444`,
          davysGrey: `#555555`,
          granite: `#666666`,
          sonicSilver: `#777777`,
          taupeGrey: `#888888`,
          spanishGrey: `#999999`,
          darkGrey: `#AAAAAA`,
          gray: `#BBBBBB`,
          chineseSilver: `#CCCCCC`,
          gainsboro: `#DDDDDD`,
          brightGrey: `#EEEEEE`,
          offWhite: `#F0F0F0`,
          white: `#FFFFFF`,
        };
        settings.theme.colors.error = '#cf352e';
      }
      if (settings.details) {
        if (!settings.details.firstname) {
          return console.error('You must provide your first name.');
        }
        if (!settings.details.lastname) {
          return console.error('You must provide your last name.');
        }
        if (!settings.details.email) {
          return console.error('You must provide your email.');
        }
      }
      if (settings.schedule) {
        if (!settings.schedule.overnight) {
          settings.schedule.overnight = false; // Making the default schedule NOT an overnight one.
        }
        if (!settings.schedule.appointmentBuffer) {
          settings.schedule.appointmentBuffer = 0; // Making the default of zero minutes.  Settings are in minutes.
        }
        if (!settings.schedule.start) {
          return console.error('You must provide a start hour in 24 hour format for your schedule.');
        }
        if (!settings.schedule.end) {
          return console.error('You must provide a end hour in 24 hour format for your schedule.');
        }
        if (!settings.schedule.minimumAppointmentLength) {
          settings.schedule.minimumAppointmentLength = 60; // Setting the default of the minimum appointment length to 60 minutes, or one hour.
        }
        if (settings.schedule.minimumAppointmentLength && settings.schedule.minimumAppointmentLength < 60) {
          return console.error(`Please select a minimum appointment length that is at least 60 minutes.`);
        }
        if (!settings.schedule.maximumAppointmentLength) {
          return console.error(`You must set a maximum appointment length, even if you plan on working 24 hours a day.`);
        }
      }
      this.theme = settings.theme;
      this.details = settings.details;
      this.schedule = settings.schedule;
      this.schedule.start = DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, this.schedule.start, 0, 0);
      this.schedule.end = DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, this.schedule.end, 0, 0);
      this.schedule.appointments = [];
      this.info = {
        errors: {},
      };
      this.renderSchedule(this.theme, document.querySelector('#schedule'));
      this.ready(this.theme.message);
    }
  }

  async ready(readyMessage) {
    const response = await axios({
      method: 'POST',
      url: '/ScheduleIt',
      data: {
        message: readyMessage,
      },
    });
    const responseMessage = response.data.message;
    console.log(responseMessage);
  }

  renderSchedule(theme, container) {
    if (!document.querySelector('.schedule-it')) {
      const scheduleItContainer = document.createElement('section');
      const style = scheduleItContainer.style;
      addClasses(scheduleItContainer, ['schedule-it']);
      style.height = '100%';
      style.width = '100%';
      style.borderRadius = '.5rem';
      style.backgroundColor = `${theme.colors.primary}cc`;
      style.fontSize = '3rem';

      insertElement('beforeend', container, scheduleItContainer);
      planningHeader(this.theme, scheduleItContainer);
      scheduleDisplay(this.theme, scheduleItContainer, this.details, this.schedule, this.info);
    }
  }
}

/*
  * Brainstorming An Easier Setup

  * theme: 
  *  {
  *    welcome: 'Welcome Message' -- This will be where the message is set by the developer. -- default is 'Open For Business'
  *    timeOfDay: {
  *       set: ['auto', 'manual'] | default = 'auto',
  *       setting: ['day', 'night'] -- This will be over-ridden by the default setting of 'auto' if it is that way.
  *    },
  *    intervals: [15, 30, 60] -- default is 15,
  *    font: (user defined font) default is 'sans-serif',
  *    colors: {
  *      primary: ,
  *      secondary: ,
  *      tertiary: ,
  *    },
  *  },
     owner: {
      firstname: '',
      lastname: '',
      company: '',
      email: '',
     },
     schedule: {
      overnight: [true, false] -- default is false.
      start: 9, -- no default.  REQUIRED.
      end: 17, -- no default.  REQUIRED.
      minimumAppointmentLength: 1 -- default and absolute minimum is 1.  Measured in minutes.
      maximumAppointmentLength: 3 -- no default, and is REQUIRED.  Measured in minutes.
     }
*/
