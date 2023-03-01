import chroma from 'chroma-js';
import { addClasses, insertElement } from '../Global/Utility';
import { dateContainer, scheduleButtonContainer } from './Container';

function planningHeader(theme, container, dimensions) {
  // Parent Font Size: 3rem
  const header = document.createElement('section');
  addClasses(header, ['schedule-it__header']);
  header.style.position = 'relative';
  header.style.height = '10%';
  header.style.width = '100%';
  header.style.backgroundColor = theme.timeOfDay.setting === 'Day' ? chroma(theme.colors.primary).darken(0.4).hex() : theme.colors.primary;
  header.style.padding = '.5em';
  header.style.display = 'flex';
  header.style.flexFlow = 'row nowrap';
  header.style.justifyContent = 'flex-start';
  header.style.alignItems = 'center';
  header.style.borderBottom = `.15em groove ${chroma(theme.colors.primary).darken(0.4).hex()}`;
  insertElement('beforeend', container, header);

  const title = document.createElement('h2');
  title.textContent = 'ScheduleIt';
  addClasses(title, ['schedule-it__header__title']);
  title.style.fontFamily = theme.font;
  title.style.fontSize = '1em'; // 3rem
  title.style.fontWeight = '300';
  title.style.color = theme.colors.grayScale.raisinBlack;
  insertElement('beforeend', header, title);
}

function loginFormHeader(theme, container) {
  // Parent Font Size: 3rem
  const heading = document.createElement('header');
  addClasses(heading, ['schedule-it__form--login__heading']);
  const style = heading.style;
  style.height = '33%';
  style.minHeight = '1.25em';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  style.margin = '.25rem 0';
  style.fontFamily = theme.font;
  style.fontSize = '1em'; // 3rem
  const headingText = document.createElement('h4');
  insertElement('beforeend', heading, headingText);
  insertElement('beforeend', container, heading);
}

function selectDateFormHeader(formType, theme, container) {
  // Parent Font Size: 3rem
  const heading = document.createElement('header');
  const style = heading.style;
  if (formType === 'select-date') {
    addClasses(heading, ['schedule-it__form--date-selection__heading']);
    style.fontSize = '1.5em'; // 5.25rem
  } else if (formType === 'request-appointment') {
    addClasses(heading, ['schedule-it__form--request-appointment__heading']);
    style.fontSize = '1.25em'; // 3.75rem
  } else if (formType === 'update-appointment') {
    addClasses(heading, ['schedule-it__form--request-appointment__heading']);
    style.fontSize = '1.25em'; // 3.75rem
  } else if (formType === 'appointment-requests') {
    addClasses(heading, ['schedule-it__form--appointment-requests__heading']);
    style.fontSize = '1.25em'; // 3.75rem
  }
  style.height = '15%';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  style.fontFamily = theme.font;
  const headingText = document.createElement('h4');
  theme.timeOfDay.setting === 'Day'
    ? (headingText.style.color = theme.colors.grayScale.raisinBlack)
    : (headingText.style.color = theme.colors.grayScale.raisinBlack);
  insertElement('beforeend', heading, headingText);
  insertElement('beforeend', container, heading);
}

function scheduleHeader(user, theme, container, details, schedule, info) {
  // Parent Font Size: 3rem
  const header = document.createElement('header');
  addClasses(header, ['schedule-it__display__schedule__header']);
  const style = header.style;
  style.position = 'relative';
  style.height = '20%';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'column nowrap';
  style.justifyContent = 'space-evenly';
  style.alignItems = 'center';
  style.borderBottom = `.3rem groove ${chroma(theme.colors.primary).darken(0.4).hex()}`;
  insertElement('beforeend', container, header);
  scheduleButtonContainer(user, theme, header, details, schedule, info);
  dateContainer(theme, header, info);
}

function communicationPreferenceHeader(theme, container) {
  // Parent Font Size: 3rem
  const header = document.createElement('header');
  addClasses(header, ['schedule-it__form--request-appointment__flex-section__header']);
  const style = header.style;
  style.position = 'relative';
  style.height = '3em';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'column nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  style.fontFamily = theme.font;
  style.fontSize = '.6em'; // 1.8rem
  style.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack;
  style.marginBottom = '.6em';
  style.paddingTop = '1em';

  const headerText = document.createElement('h3');
  addClasses(header, ['schedule-it__form--request-appointment__flex-section__header__text']);
  headerText.textContent = 'Select Your Preferred Means Of Communication';
  insertElement('beforeend', header, headerText);

  insertElement('beforeend', container, header);
}

export { planningHeader, loginFormHeader, scheduleHeader, selectDateFormHeader, communicationPreferenceHeader };
