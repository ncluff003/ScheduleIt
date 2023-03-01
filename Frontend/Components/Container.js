import { addClasses, insertElement } from '../Global/Utility';
import { loginFormHeader } from './Header';
import { formSelect, loginFormInput } from './Input';
import { loginFormLabel } from './Label';
import { button } from './Button';
import { DateTime } from 'luxon';
import { hour } from './Hour';

function loginContainer(user, theme, container, details, schedule, info) {
  // Parent Font Size: 3rem
  const loginContainer = document.createElement('section');
  addClasses(loginContainer, ['schedule-it__form--login__user-login']);
  const style = loginContainer.style;
  style.position = 'relative';
  style.height = '9em';
  style.maxHeight = '13em';
  style.width = '100%';
  style.display = 'none';
  style.flexFlow = 'column nowrap';
  style.justifyContent = 'space-evenly';
  style.alignItems = 'center';
  insertElement('beforeend', container, loginContainer);

  errorContainer(theme, loginContainer);

  loginFormHeader(theme, loginContainer);
  loginFormLabel(theme, loginContainer);
  loginFormInput(theme, loginContainer, details, schedule);
  loginButtonContainer(user, theme, loginContainer, details, schedule, info);
}

function loginButtonContainer(user, theme, container, details, schedule, info) {
  // Parent Font Size: 3rem
  const buttonContainer = document.createElement('section');
  addClasses(buttonContainer, ['schedule-it__form--login__user-login__buttons']);
  const style = buttonContainer.style;
  style.position = 'relative';
  style.height = 'max-content';
  style.width = '70%';
  style.margin = '.25rem 0';
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'flex-end';
  style.alignItems = 'center';

  insertElement('beforeend', container, buttonContainer);
  button('login--overlay', 'Login', theme, buttonContainer, details, schedule, info, user);
  button('login--overlay', 'Close', theme, buttonContainer);
}

function scheduleButtonContainer(user, theme, container, details, schedule, info) {
  // Parent Font Size: 3rem
  const buttonContainer = document.createElement('section');
  addClasses(buttonContainer, ['schedule-it__display__schedule__header__buttons']);
  const style = buttonContainer.style;
  style.position = 'relative';
  style.height = '40%';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'flex-end';
  style.alignItems = 'center';
  insertElement('beforeend', container, buttonContainer);
  button('schedule-outside', 'Select Date', theme, buttonContainer, details, schedule, info);
  if (user === 'Client') {
    button('schedule-outside', 'Request Appointment', theme, buttonContainer, details, schedule, info);
  } else if (user === 'Owners') {
    button('schedule-outside', 'Appointment Requests', theme, buttonContainer, details, schedule, info);
  }
}

function dateContainer(theme, container, details, schedule, info) {
  // Parent Font Size: 3rem
  const dateContainer = document.createElement('section');
  addClasses(dateContainer, ['schedule-it__display__schedule__header__date']);
  const style = dateContainer.style;
  style.position = 'relative';
  style.height = '60%';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  style.fontFamily = theme.font;
  style.fontSize = '.75em'; // 2.7rem
  style.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.offWhite;
  insertElement('beforeend', container, dateContainer);

  const date = document.createElement('h3');
  addClasses(date, ['schedule-it__display__schedule__header__date__text']);
  date.textContent = DateTime.now().toLocaleString(DateTime.DATE_HUGE);
  date.dataset.date = DateTime.now().toISO();
  insertElement('beforeend', dateContainer, date);
}

function scheduleContainer(theme, container, details, schedule, info) {
  // Parent Font Size: 3rem
  const scheduleContainer = document.createElement('section');
  addClasses(scheduleContainer, ['schedule-it__display__schedule__planner']);
  const style = scheduleContainer.style;
  style.position = 'relative';
  style.height = '80%';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'column nowrap';
  style.justifyContent = 'flex-start';
  style.alignItems = 'center';
  style.overflowY = 'auto';

  let hours = 24;
  let start = 0;
  while (start < hours) {
    hour(theme, scheduleContainer, details, schedule, info, start);
    start++;
  }
  insertElement('beforeend', container, scheduleContainer);
}

function dateSelectContainer(theme, container, details, schedule, info, formType) {
  // Parent Font Size: 3rem
  const dateSelectContainer = document.createElement('section');
  addClasses(dateSelectContainer, ['schedule-it__form--date-selection__select-container']);
  const style = dateSelectContainer.style;
  style.position = 'relative';
  style.height = '10%';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';

  if (formType && formType === 'update-appointment') {
    const updateHeading = document.createElement('h4');
    addClasses(updateHeading, ['update-appointment-header']);
    updateHeading.textContent = 'Select Updated Date';
    const updateStyle = updateHeading.style;
    updateStyle.fontFamily = theme.font;
    updateStyle.fontSize = '1em'; // 3rem
    updateStyle.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack;
    updateStyle.margin = '.5em 0 0';
    insertElement('beforeend', container, updateHeading);

    style.margin = '1em 0';
  }

  formSelect('day', theme, dateSelectContainer, details, schedule, info, formType);
  formSelect('month', theme, dateSelectContainer, details, schedule, info, formType);
  formSelect('year', theme, dateSelectContainer, details, schedule, info, formType);
  insertElement('beforeend', container, dateSelectContainer);
}

function appointmentButtons(theme, container, details, schedule, info, appointment) {
  const element = document.createElement('div');
  addClasses(element, ['schedule-it__display__schedule__planner__appointment__buttons']);
  const style = element.style;
  style.height = 'max-content';
  style.minHeight = '1em';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'space-evenly';
  style.alignItems = 'center';
  insertElement('beforeend', container, element);

  if (info.userType === 'Client') {
    let done = false;
    appointment.attendees.forEach((person) => {
      if (person.attendeeEmail === info.clientEmail && done === false) {
        button('Request Appointment Update', 'Update', theme, element, details, schedule, info, '');
        button('Delete Appointment', 'Delete', theme, element, details, schedule, info, '');
        done = true;
      }
    });
  } else if (info.userType === 'Owners') {
    button('Delete Appointment', 'Delete', theme, element, details, schedule, info, '');
  }
}

function errorContainer(theme, container, formType) {
  /*
    * Login Container: // Parent Font Size: 3rem
    * Select Date Form: // Parent Font Size: 3rem
  
  */
  const errorContainer = document.createElement('div');
  addClasses(errorContainer, ['error-container']);
  const style = errorContainer.style;
  style.position = 'relative';
  style.height = 'max-content';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'column nowrap';
  style.justifyContent = 'flex-start';
  style.alignItems = 'center';
  style.padding = '1em';
  style.fontFamily = theme.font;
  style.fontSize = '.53em';
  style.color = theme.colors.error;
  style.textAlign = 'center';
  if (formType && formType === 'update-appointment') {
    style.margin = '1em 0 2em';
  }
  insertElement('beforeend', container, errorContainer);
}

export {
  loginContainer,
  loginButtonContainer,
  scheduleButtonContainer,
  dateContainer,
  scheduleContainer,
  dateSelectContainer,
  appointmentButtons,
  errorContainer,
};
