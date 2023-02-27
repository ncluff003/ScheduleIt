import { addClasses, insertElement } from '../Global/Utility';
import { scheduleContainer } from './Container';
import { form } from './Form';
import { scheduleHeader } from './Header';

function renderSchedule(user, theme, details, schedule, info) {
  // Parent Font Size: 3rem
  const display = document.querySelector('.schedule-it__display');
  const planner = document.createElement('section');
  addClasses(planner, ['schedule-it__display__schedule']);
  const style = planner.style;
  style.position = 'relative';
  style.height = '100%';
  style.width = '100%';
  style.borderRadius = '0 0 .5rem .5rem';
  style.padding = '1rem';
  if (theme.timeOfDay.setting === 'Day') {
    style.backgroundColor = theme.colors.grayScale.offWhite;
  } else if (theme.timeOfDay.setting === 'Night') {
    style.backgroundColor = theme.colors.grayScale.darkCharcoal;
  }
  insertElement('beforeend', display, planner);

  scheduleHeader(user, theme, planner, details, schedule, info);
  scheduleContainer(theme, planner, details, schedule, info);
  form('select-date', user, theme, planner, details, schedule, info);
  form('request-appointment', user, theme, planner, details, schedule, info);
  if (user === 'Client') {
    form('update-appointment', user, theme, planner, details, schedule, info);
  } else if (user === 'Owners') {
    form('appointment-requests', user, theme, planner, details, schedule, info);
  }
}

export { renderSchedule };
