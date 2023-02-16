import { addClasses, insertElement } from '../Global/Utility';
import { loginOverlay } from './Overlay';

function calendarDisplay(theme, container, info) {
  // Parent font size = 3rem or 30px.
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
  theme.timeOfDay === 'day' ? (style.backgroundColor = theme.grayScale.offWhite) : (style.backgroundColor = theme.grayScale.raisinBlack);
  style.borderRadius = '0 0 .5rem .5rem';
  style.overflowY = 'auto';
  insertElement('beforeend', container, calendarDisplay);
  loginOverlay(theme, calendarDisplay, info);
}

export { calendarDisplay };
