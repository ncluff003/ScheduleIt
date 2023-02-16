import axios from 'axios';
import { addClasses, insertElement } from '../Global/Utility';
import Theme from '../Global/Theme';
import { calendarHeader } from '../Components/Header';
import { calendarDisplay } from '../Components/Display';

export default class Calendar {
  constructor(theme, readyMessage, ownerDetails) {
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
      console.log(this.info);
      const scheduleItContainer = document.createElement('section');
      const style = scheduleItContainer.style;
      addClasses(scheduleItContainer, ['schedule-it']);
      style.height = '100%';
      style.width = '100%';
      style.borderRadius = '.5rem';
      style.backgroundColor = `${theme.primary}cc`;
      style.fontSize = '3rem';

      insertElement('beforeend', container, scheduleItContainer);
      calendarHeader(theme, scheduleItContainer);
      calendarDisplay(theme, scheduleItContainer);
    }
  }
}
