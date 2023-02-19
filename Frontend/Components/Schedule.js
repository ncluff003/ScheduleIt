import { addClasses, insertElement } from '../Global/Utility';
import { scheduleContainer } from './Container';
import { form } from './Form';
import { scheduleHeader } from './Header';

function renderSchedule(user, theme, info) {
  const display = document.querySelector('.schedule-it__display');
  console.log(user);

  const schedule = document.createElement('section');
  addClasses(schedule, ['schedule-it__display__schedule']);
  const style = schedule.style;
  style.position = 'relative';
  style.height = '100%';
  style.width = '100%';
  style.borderRadius = '0 0 .5rem .5rem';
  style.padding = '1rem';
  if (theme.timeOfDay === 'day') {
    style.backgroundColor = theme.grayScale.offWhite;
  } else if (theme.timeOfDay === 'night') {
    style.backgroundColor = theme.grayScale.raisinBlack;
  }
  insertElement('beforeend', display, schedule);

  scheduleHeader(user, theme, schedule, info);
  scheduleContainer(theme, schedule, info);
  form('select-date', user, theme, schedule, info);
  form('request-appointment', user, theme, schedule, info);
  if (user === 'Client') {
    form('update-appointment', user, theme, schedule, info);
  }
}

export { renderSchedule };
