const { addClasses, insertElement } = require('../Global/Utility');
const Theme = require('../Global/Theme');

export default class ScheduleIt {
  constructor(theme, ownerDetails) {
    if (document.querySelector('#schedule')) {
      this.render(theme, document.querySelector('#schedule'));
    }
  }

  render(theme, container) {
    const scheduleItContainer = document.createElement('section');
    addClasses(scheduleItContainer, ['schedule-it']);
    scheduleItContainer.style.height = '100%';
    scheduleItContainer.style.width = '100%';
    theme === 'day' ? (scheduleItContainer.style.backgroundColor = Theme.day.background) : (scheduleItContainer.style.backgroundColor = Theme.night.background);
    insertElement('beforeend', container, scheduleItContainer);
  }
}
