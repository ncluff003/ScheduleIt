import { addClasses, insertElement } from '../Global/Utility';
import { loginOverlay } from './Overlay';

function scheduleDisplay(theme, container, details, schedule, info, dimensions) {
  // Parent Font Size: 3rem
  const calendarDisplay = document.createElement('section');
  const style = calendarDisplay.style;
  addClasses(calendarDisplay, ['schedule-it__display']);
  style.position = 'relative';
  style.height = '90%';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'column nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  theme.timeOfDay === 'day' ? (style.backgroundColor = theme.colors.grayScale.offWhite) : (style.backgroundColor = theme.colors.grayScale.raisinBlack);
  style.borderRadius = '0';
  style.overflowY = 'auto';
  insertElement('beforeend', container, calendarDisplay);
  loginOverlay(theme, calendarDisplay, details, schedule, info);
}

export { scheduleDisplay };
