import { addClasses, insertElement } from '../Global/Utility';

function calendarHeader(theme, container) {
  // Parent font size = 3rem or 30px.
  const header = document.createElement('section');
  addClasses(header, ['schedule-it__header']);
  header.style.position = 'relative';
  header.style.height = '10%';
  header.style.width = '100%';
  header.style.padding = '1rem 2rem';
  header.style.display = 'flex';
  header.style.flexFlow = 'row nowrap';
  header.style.justifyContent = 'flex-start';
  header.style.alignItems = 'center';
  insertElement('beforeend', container, header);

  const logo = document.createElement('img');
  logo.src = './../../schedule-it-logo.png';
  logo.alt = 'Schedule It Logo';
  addClasses(logo, ['schedule-it__header__logo']);
  insertElement('beforeend', header, logo);

  const title = document.createElement('h2');
  title.textContent = 'ScheduleIt';
  addClasses(title, ['schedule-it__header__title']);
  title.style.fontFamily = 'Made Tommy Soft';
  title.style.fontSize = '1em';
  title.style.fontWeight = '300';
  title.style.color = theme.grayScale.raisinBlack;
  insertElement('beforeend', header, title);
}

function loginFormHeader(theme, container) {
  const heading = document.createElement('header');
  addClasses(heading, ['schedule-it__form--login__heading']);
  const style = heading.style;
  style.height = '33%';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  style.fontFamily = 'MADE Tommy Soft';
  style.fontSize = '1em';
  const headingText = document.createElement('h4');
  insertElement('beforeend', heading, headingText);
  insertElement('beforeend', container, heading);
}

export { calendarHeader, loginFormHeader };
