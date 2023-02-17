import { addClasses, insertElement } from '../Global/Utility';
import { scheduleHeader } from './Header';

function renderSchedule(theme, info) {
  const display = document.querySelector('.schedule-it__display');

  const schedule = document.createElement('section');
  addClasses(schedule, ['schedule-it__display__schedule']);
  const style = schedule.style;
  style.position = 'relative';
  style.height = '100%';
  style.width = '100%';
  style.borderRadius = '0 0 .5rem .5rem';
  if (theme.timeOfDay === 'day') {
    style.backgroundColor = theme.grayScale.offWhite;
  } else if (theme.timeOfDay === 'night') {
    style.backgroundColor = theme.grayScale.raisinBlack;
  }
  insertElement('beforeend', display, schedule);

  scheduleHeader(theme, schedule, info);
}

export { renderSchedule };
