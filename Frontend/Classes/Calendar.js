import axios from 'axios';
import { DateTime } from 'luxon';
import { addClasses, insertElement } from '../Global/Utility';
import Theme from '../Global/Theme';
import { calendarHeader } from '../Components/Header';
import { calendarDisplay } from '../Components/Display';

export default class Calendar {
  constructor(readyMessage, theme, ownerDetails) {
    if (document.querySelector('#schedule')) {
      this.theme = theme;
      this.info = ownerDetails;
      this.renderCalendar(theme, document.querySelector('#schedule'));
      this.ready(readyMessage);
    }
  }

  async ready(message) {
    const response = await axios({
      method: 'POST',
      url: '/ScheduleIt',
      data: {
        message: message,
      },
    });
    console.log(response.data.message);
  }

  renderCalendar(theme, container) {
    if (!document.querySelector('.schedule-it')) {
      !this.info.minimumAppointmentLength // This is set by hours.
        ? (this.info.minimumAppointmentLength = 1)
        : (this.info.minimumAppointmentLength = this.info.minimumAppointmentLength);
      !this.info.appointmentBuffer ? (this.info.appointmentBuffer = 0) : (this.info.appointmentBuffer = this.info.appointmentBuffer);
      console.log(this.info, this.info.minimumAppointmentLength);
      this.info.scheduleStart = DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, this.info.scheduleStart, 0, 0);
      this.info.scheduleEnd = DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, this.info.scheduleEnd, 0, 0);
      this.theme.error = '#cf352e';
      this.info.errors = {};
      this.theme.grayScale = {
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
      const scheduleItContainer = document.createElement('section');
      const style = scheduleItContainer.style;
      addClasses(scheduleItContainer, ['schedule-it']);
      style.height = '100%';
      style.width = '100%';
      style.borderRadius = '.5rem';
      style.backgroundColor = `${theme.primary}cc`;
      style.fontSize = '3rem';

      insertElement('beforeend', container, scheduleItContainer);
      calendarHeader(this.theme, scheduleItContainer);
      calendarDisplay(this.theme, scheduleItContainer, this.info);
    }
  }
}
