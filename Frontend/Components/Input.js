import { DateTime, Info } from 'luxon';
import chroma from 'chroma-js';
import { addClasses, insertElement } from '../Global/Utility';

function clearSelect(select) {
  [...select.childNodes].forEach((child) => child.remove());
}

function loginFormInput(theme, container) {
  const input = document.createElement('input');
  addClasses(input, ['schedule-it__form--login__user-login__input']);
  const style = input.style;
  style.position = 'relative';
  style.height = '30%';
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
      insertElement('beforeend', select, option);
      start++;
    }
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

export { loginFormInput, formSelect, appointmentRequestInput };
