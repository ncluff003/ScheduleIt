import { DateTime, Info } from 'luxon';
import chroma from 'chroma-js';
import { addClasses, formatPhoneNumber, insertElement, addError, renderErrors } from '../Global/Utility';

function clearSelect(select) {
  [...select.childNodes].forEach((child) => child.remove());
}

function loginFormInput(theme, container, info) {
  const input = document.createElement('input');
  addClasses(input, ['schedule-it__form--login__user-login__input']);
  const style = input.style;
  style.position = 'relative';
  style.height = '20%';
  style.minHeight = '3em';
  style.width = '70%';
  style.padding = '.5rem 1rem';
  style.margin = '.25rem 0';
  style.fontFamily = theme.text;
  style.fontSize = '.6em';
  style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`;
  style.border = `.2em solid ${theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`}`;
  style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
  style.borderRadius = '.5rem';
  input.addEventListener('focus', (e) => {
    e.preventDefault();
    style.outline = 'none';
    style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}` : `${theme.grayScale.raisinBlack}`;
    style.border = `.2em solid ${theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}` : `${theme.grayScale.raisinBlack}`}`;
    style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}` : `${theme.grayScale.offWhite}`;
  });
  input.addEventListener('blur', (e) => {
    e.preventDefault();
    style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`;
    style.border = `.2em solid ${theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`}`;
    style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
  });

  insertElement('beforeend', container, input);
}

function appointmentRequestInput(type, placeholder, theme, container, info) {
  const input = document.createElement('input');
  addClasses(input, ['schedule-it__form--request-appointment__input']);
  const style = input.style;
  style.position = 'relative';
  style.height = '3em';
  type === 'half' ? (style.width = '40%') : (style.width = '80%');
  style.padding = '.5em';
  style.fontFamily = theme.text;
  style.fontSize = '.53em';
  style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`;
  style.border = `.2em solid ${theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`}`;
  style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
  style.borderRadius = '.5rem';
  input.placeholder = placeholder;
  input.required = true;

  if (placeholder === 'First Name') {
    input.addEventListener('keyup', (e) => {
      e.preventDefault();
      const errorContainer = document.querySelectorAll('.error-container')[3];
      const firstnameRegex = new RegExp(/^[A-Z][A-Za-z]*$/);
      if (firstnameRegex.test(input.value) === true) {
        info.errors = addError(info, 'firstname', '');
        delete info.errors['firstname'];
        renderErrors(errorContainer, info.errors);
      } else if (firstnameRegex.test(input.value) === false) {
        info.errors = addError(info, 'firstname', 'First name should start with a capital, and only be letters.');
        renderErrors(errorContainer, info.errors);
      }
    });
  }
  if (placeholder === 'Last Name') {
    input.addEventListener('keyup', (e) => {
      e.preventDefault();
      const errorContainer = document.querySelectorAll('.error-container')[3];
      if (/^[A-Z][A-Za-z]*$/.test(input.value) === true || input.value === '') {
        info.errors = addError(info, 'lastname', '');
        renderErrors(errorContainer, info.errors);
        delete info.errors['lastname'];
      } else if (/^[A-Z][A-Za-z]*$/.test(input.value) === false) {
        info.errors = addError(info, 'lastname', 'Last name should start with a capital, and only be letters.');
        renderErrors(errorContainer, info.errors);
      }
    });
  }
  if (placeholder === 'Email Address') {
    input.addEventListener('keyup', (e) => {
      e.preventDefault();
      const errorContainer = document.querySelectorAll('.error-container')[3];
      if (/[^@]+@[^@]+[\.]+(com|net|org|io|edu|(co.uk)|me|tech|money|gov)+$/.test(input.value) === true || input.value === '') {
        info.errors = addError(info, 'email', '');
        renderErrors(errorContainer, info.errors);
        delete info.errors['email'];
      } else if (/[^@]+@[^@]+[\.]+(com|net|org|io|edu|(co.uk)|me|tech|money|gov)+$/.test(input.value) === false) {
        info.errors = addError(info, 'email', 'Please Provide A Valid Email Address');
        renderErrors(errorContainer, info.errors);
      }
    });
  }

  if (placeholder === 'Phone Number') {
    input.addEventListener('keyup', (e) => {
      e.preventDefault();
      const errorContainer = document.querySelectorAll('.error-container')[3];
      input.value = input.value.replace(/[^\d]/g, '');
      if (input.value.length !== 10) {
        info.errors = addError(info, 'phone', 'Phone numbers must be at least ten digits long.');
        renderErrors(errorContainer, info.errors);
        delete info.errors['phone'];
      } else {
        info.errors = addError(info, 'phone', '');
        renderErrors(errorContainer, info.errors);
      }
      input.value = formatPhoneNumber(input.value);
    });
  }

  insertElement('beforeend', container, input);
}

function formSelect(type, theme, container, info, elNum) {
  const select = document.createElement('select');
  const style = select.style;
  style.fontFamily = theme.text;
  let dividerNeeded = false;
  let colonNeeded = false;
  if (type === 'day') {
    addClasses(select, ['schedule-it__form--date-selection__select-container__select']);
    style.position = 'relative';
    style.height = 'max-content';
    style.width = 'max-content';
    style.padding = '.25em';
    style.margin = '0 .5em';
    style.backgroundColor = 'transparent';
    style.border = 'none';
    dividerNeeded = true;
    // style.borderRight = `.2em solid ${theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite}cc`;
    let start = 0;
    let end = DateTime.now().daysInMonth;
    while (start < end) {
      const option = document.createElement('option');
      addClasses(option, ['schedule-it__form--date-selection__select-container__select__option']);
      const style = option.style;
      style.fontFamily = theme.text;
      style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
      option.textContent =
        `${DateTime.local(DateTime.now().year, DateTime.now().month, start + 1).day}`.length === 1
          ? `0${DateTime.local(DateTime.now().year, DateTime.now().month, start + 1).day}`
          : DateTime.local(DateTime.now().year, DateTime.now().month, start + 1).day;
      option.value = start + 1;
      insertElement('beforeend', select, option);
      start++;
    }
    select.selectedIndex = DateTime.now().day - 1;

    select.addEventListener('change', (e) => {
      e.preventDefault();
      const errorContainers = document.querySelectorAll('.error-container');
      const errorContainer = errorContainers[2];
      const dateSelects = document.querySelectorAll('.schedule-it__form--date-selection__select-container__select');

      const year = Number(dateSelects[2].value);
      const month = Number(dateSelects[1].value);
      const day = Number(dateSelects[0].value);
      const selectedDate = DateTime.local(year, month, day);

      if (selectedDate.day < DateTime.now().day) {
        addError(info, 'date', 'Please select a date that is either today or in the future.');
        renderErrors(errorContainer, info.errors);
      } else if (selectedDate.day >= DateTime.now().day) {
        addError(info, 'date', '');
        renderErrors(errorContainer, info.errors);
      }
    });
  } else if (type === 'month') {
    addClasses(select, ['schedule-it__form--date-selection__select-container__select']);
    style.position = 'relative';
    style.height = 'max-content';
    style.width = 'max-content';
    style.padding = '.25em';
    style.margin = '0 .5em';
    style.backgroundColor = 'transparent';
    style.border = 'none';
    dividerNeeded = true;
    // style.borderRight = `.2em solid ${theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite}cc`;

    let start = 0;
    let end = 12;
    while (start < end) {
      const option = document.createElement('option');
      addClasses(option, ['schedule-it__form--date-selection__select-container__select__option']);
      const style = option.style;
      style.fontFamily = theme.text;
      style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
      option.textContent =
        `${DateTime.local(DateTime.now().year, start + 1, 1).month}`.length === 1
          ? `0${DateTime.local(DateTime.now().year, start + 1, 1).month}`
          : DateTime.local(DateTime.now().year, start + 1, 1).month;
      option.value = DateTime.local(DateTime.now().year, 1, 1).month + start;
      insertElement('beforeend', select, option);
      start++;
    }

    select.selectedIndex = DateTime.now().month - 1;
    select.addEventListener('change', (e) => {
      e.preventDefault();
      const errorContainers = document.querySelectorAll('.error-container');
      const errorContainer = errorContainers[2];
      const day = e.target.closest('.schedule-it__form--date-selection__select-container').firstChild;
      const month = e.target.closest('.schedule-it__form--date-selection__select-container').firstChild.nextSibling.nextSibling;
      const year = e.target.closest('.schedule-it__form--date-selection__select-container').firstChild.nextSibling.nextSibling.nextSibling.nextSibling;

      const dayValue = Number(day.value);

      let dayStart = 0;
      const monthValue = Number(month.value);
      const yearValue = Number(year.value);

      const daysInMonth = DateTime.local(yearValue, monthValue, 1).daysInMonth;
      clearSelect(day);

      while (dayStart < daysInMonth) {
        const option = document.createElement('option');
        addClasses(option, ['schedule-it__form--date-selection__select-container__select__option']);
        const style = option.style;
        style.fontFamily = theme.text;
        style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
        option.textContent =
          `${DateTime.local(yearValue, monthValue, dayStart + 1).day}`.length === 1
            ? `0${DateTime.local(yearValue, monthValue, dayStart + 1).day}`
            : DateTime.local(yearValue, monthValue, dayStart + 1).day;
        option.value = dayStart + 1;
        insertElement('beforeend', day, option);
        dayStart++;
      }

      if (dayValue > daysInMonth) {
        day.selectedIndex = daysInMonth - 1;
      } else {
        day.selectedIndex = dayValue - 1;
      }
      let selectedDate = DateTime.local(yearValue, monthValue, dayValue);

      if (selectedDate < DateTime.now()) {
        addError(info, 'date', 'Please select a date that is either today or in the future.');
        renderErrors(errorContainer, info.errors);

        if (selectedDate.day === DateTime.now().day && selectedDate.month === DateTime.now().month && selectedDate.year === DateTime.now().year) {
          selectedDate = selectedDate.set({ hour: 23, minute: 59, second: 59 });
          if (selectedDate >= DateTime.now()) {
            addError(info, 'date', '');
            renderErrors(errorContainer, info.errors);
          }
        }
      }
    });
  } else if (type === 'year') {
    addClasses(select, ['schedule-it__form--date-selection__select-container__select']);
    style.position = 'relative';
    style.height = 'max-content';
    style.width = 'max-content';
    style.padding = '.25em';
    style.margin = '0 .5em';
    style.backgroundColor = 'transparent';
    style.border = 'none';

    let start = 0;
    let end = 10;
    while (start < end) {
      const option = document.createElement('option');
      addClasses(option, ['schedule-it__form--date-selection__select-container__select__option']);
      const style = option.style;
      style.fontFamily = theme.text;
      style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
      option.textContent = DateTime.now().year + start;
      option.value = DateTime.now().year + start;
      insertElement('beforeend', select, option);
      start++;
    }

    select.addEventListener('change', (e) => {
      e.preventDefault();
      const errorContainers = document.querySelectorAll('.error-container');
      const errorContainer = errorContainers[2];
      const day = e.target.closest('.schedule-it__form--date-selection__select-container').firstChild;
      const month = e.target.closest('.schedule-it__form--date-selection__select-container').firstChild.nextSibling.nextSibling;
      const year = e.target.closest('.schedule-it__form--date-selection__select-container').firstChild.nextSibling.nextSibling.nextSibling.nextSibling;

      const dayValue = Number(day.value);

      let dayStart = 0;
      const monthValue = Number(month.value);
      const yearValue = Number(year.value);

      const daysInMonth = DateTime.local(yearValue, monthValue, 1).daysInMonth;
      clearSelect(day);

      while (dayStart < daysInMonth) {
        const option = document.createElement('option');
        addClasses(option, ['schedule-it__form--date-selection__select-container__select__option']);
        const style = option.style;
        style.fontFamily = theme.text;
        style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
        option.textContent =
          `${DateTime.local(yearValue, monthValue, dayStart + 1).day}`.length === 1
            ? `0${DateTime.local(yearValue, monthValue, dayStart + 1).day}`
            : DateTime.local(yearValue, monthValue, dayStart + 1).day;
        option.value = dayStart + 1;
        insertElement('beforeend', day, option);
        dayStart++;
      }

      if (dayValue > daysInMonth) {
        day.selectedIndex = daysInMonth - 1;
      } else {
        day.selectedIndex = dayValue - 1;
      }

      let selectedDate = DateTime.local(yearValue, monthValue, dayValue);

      if (selectedDate < DateTime.now()) {
        addError(info, 'date', 'Please select a date that is either today or in the future.');
        renderErrors(errorContainer, info.errors);
      } else if (selectedDate.day >= DateTime.now().day) {
        selectedDate = selectedDate.set({ hour: 23, minute: 59, second: 59 });
        if (selectedDate >= DateTime.now()) {
          addError(info, 'date', '');
          renderErrors(errorContainer, info.errors);
        }
      }
    });
  } else if (type === 'hour') {
    style.position = 'relative';
    style.height = 'max-content';
    style.width = 'max-content';
    style.padding = '.25em';
    style.margin = '0';
    style.backgroundColor = 'transparent';
    style.border = 'none';
    if (elNum !== undefined && elNum !== null && elNum === 'first') {
      style.margin = '1em 0 0';
      addClasses(select, ['schedule-it__form--date-selection__select-container__select', 'first-hour']);
    } else {
      addClasses(select, ['schedule-it__form--date-selection__select-container__select', 'second-hour']);
      style.margin = '0 0 1em';
    }

    colonNeeded = true;

    let start = 0;
    let end = 24;
    while (start < end) {
      const option = document.createElement('option');
      addClasses(option, ['schedule-it__form--date-selection__select-container__select__option']);
      const style = option.style;
      style.fontFamily = theme.text;
      style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
      option.textContent =
        `${DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, start, 0, 0).hour}`.length === 1 &&
        DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, start, 0, 0).hour === 0
          ? '12'
          : `${DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, start, 0, 0).hour}`.length === 1 &&
            DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, start, 0, 0).hour !== 0
          ? `0${DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, start, 0, 0).hour}`
          : DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, start, 0, 0).hour > 12 &&
            DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, start, 0, 0).hour < 22
          ? `0${DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, start, 0, 0).hour - 12}`
          : DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, start, 0, 0).hour > 12 &&
            DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, start, 0, 0).hour > 21
          ? DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, start, 0, 0).hour - 12
          : DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, start, 0, 0).hour;
      option.value = start;
      if (info.scheduleIsOvernight === false) {
        if (start < info.scheduleStart.hour || start > info.scheduleEnd.hour) {
          option.disabled = true;
          addClasses(option, ['disabled']);
          style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
          style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}80` : `${theme.grayScale.raisinBlack}80`;
        }
      } else if (info.scheduleIsOvernight === true) {
        if (start > info.scheduleEnd.hour && start < info.scheduleStart.hour) {
          option.disabled = true;
          addClasses(option, ['disabled']);
          style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
          style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}80` : `${theme.grayScale.raisinBlack}80`;
        }
      }
      insertElement('beforeend', select, option);
      start++;
    }

    select.addEventListener('change', (e) => {
      e.preventDefault();
      if (select.classList.contains('first-hour')) {
        const meridiem = document.querySelector('.first-meridiem');
        meridiem.textContent = DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, Number(select.value), 0, 0).toFormat('a');
      } else if (select.classList.contains('second-hour')) {
        const meridiem = document.querySelector('.second-meridiem');
        meridiem.textContent = DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, Number(select.value), 0, 0).toFormat('a');

        const secondMinute = document.querySelector('.second-minute');
        if (Number(select.value) === Number(info.scheduleEnd.hour)) {
          [...secondMinute.childNodes].forEach((minute) => {
            console.log(minute);
            if (Number(minute.value) > 0) minute.disabled = true;
          });
        } else if (Number(select.value) !== Number(info.scheduleEnd.hour)) {
          [...secondMinute.childNodes].forEach((minute) => {
            console.log(minute);
            minute.disabled = false;
          });
        }
      }
    });
  } else if (type === 'minute') {
    style.position = 'relative';
    style.height = 'max-content';
    style.width = 'max-content';
    style.padding = '.25em';
    style.margin = '0';
    style.backgroundColor = 'transparent';
    style.border = 'none';

    if (elNum !== undefined && elNum !== null && elNum === 'first') {
      style.margin = '1em 0 0';
      addClasses(select, ['schedule-it__form--date-selection__select-container__select', 'first-minute']);
    } else {
      style.margin = '0 0 1em';
      addClasses(select, ['schedule-it__form--date-selection__select-container__select', 'second-minute']);
    }

    let start = 0;
    let end = 60;
    while (start < end) {
      const option = document.createElement('option');
      addClasses(option, ['schedule-it__form--date-selection__select-container__select__option']);
      const style = option.style;
      style.fontFamily = theme.text;
      style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
      option.textContent =
        `${DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, 0, start, 0).minute}`.length === 1
          ? `0${DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, 0, start, 0).minute}`
          : DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, 0, start, 0).minute;
      option.value = start;
      insertElement('beforeend', select, option);
      start++;
    }
  }
  insertElement('beforeend', container, select);

  if (dividerNeeded === true) {
    if (type === 'day' || type === 'month') {
      const divider = document.createElement('div');
      addClasses(divider, ['schedule-it__form--date-selection__select-container__divider']);
      const style = divider.style;
      style.position = 'relative';
      style.height = '1.4em';
      style.width = 'max-content';
      style.border = `.075em groove ${theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite}cc`;
      insertElement('beforeend', container, divider);
    }
  } else if (colonNeeded === true) {
    const colonDiv = document.createElement('div');
    addClasses(colonDiv, ['schedule-it__form--date-selection__select-container__colon']);
    const style = colonDiv.style;
    style.position = 'relative';
    style.height = '1.4em';
    style.width = 'max-content';
    if (elNum !== undefined && elNum !== null && elNum === 'first') {
      style.margin = '1em 0 0';
    } else {
      style.margin = '0 0 1em';
    }

    const colon = document.createElement('p');
    colon.textContent = ':';
    colon.style.padding = '0 .5em';

    style.fontFamily = theme.text;
    style.fontSize = '1em';
    style.color = theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite;
    insertElement('beforeend', colonDiv, colon);
    insertElement('beforeend', container, colonDiv);
  }

  select.addEventListener('mouseover', (e) => {
    e.preventDefault();
    style.cursor = 'pointer';
  });
}

function textArea(theme, container, info, settings) {
  const textarea = document.createElement('textarea');
  addClasses(textarea, ['schedule-it__form--request-appointment__textarea']);
  textarea.required = true;
  const style = textarea.style;
  style.width = '80%';
  style.resize = 'none';
  style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
  style.border = `.2em solid ${theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`}`;
  style.borderRadius = '.25em';
  style.padding = '1em';
  style.fontFamily = theme.text;
  style.fontSize = '.53em';
  style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`;
  textarea.placeholder = `Enter Your Message For ${info.firstname} ${info.lastname}`;
  let maxLength;

  if (settings.size === 'small') {
    maxLength = 500;
    style.height = '10em';
    style.minHeight = '10em';
    textArea.max = maxLength;
    textArea.maxLength = maxLength;
  } else if (settings.size === 'medium') {
    maxLength = 1000;
    style.height = '13em';
    style.minHeight = '13em';
    textArea.max = maxLength;
    textArea.maxLength = maxLength;
  } else if (settings.size === 'large') {
    maxLength = 2000;
    style.height = '15em';
    style.minHeight = '15em';
    textArea.max = maxLength;
    textArea.maxLength = maxLength;
  } else if (settings.size === 'extra-large') {
    maxLength = 4000;
    style.height = '17em';
    style.minHeight = '17em';
    textArea.max = maxLength;
    textArea.maxLength = maxLength;
  }

  textarea.addEventListener('focus', (e) => {
    e.preventDefault();
    style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}` : `${theme.grayScale.offWhite}`;
    style.borderColor = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}` : `${theme.grayScale.raisinBlack}`;
    style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}` : `${theme.grayScale.raisinBlack}`;
  });

  textarea.addEventListener('blur', (e) => {
    e.preventDefault();
    style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
    style.borderColor = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`;
    style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`;
  });

  textarea.addEventListener('keyup', (e) => {
    e.preventDefault();
    const label = document.querySelector('.schedule-it__form--request-appointment__textarea__label');
    label.textContent = `Characters Left: ${Number(maxLength) - Number(textarea.value.length)}`;
  });

  insertElement('beforeend', container, textarea);
}

export { loginFormInput, formSelect, appointmentRequestInput, textArea };
