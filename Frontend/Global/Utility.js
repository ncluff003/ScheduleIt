import { get, getAll, set, remove, useNamespace } from './Cache';

export const resetForm = (theme, schedule, form, errors, errorContainer) => {
  const inputs = form.querySelectorAll('input');
  const selects = form.querySelectorAll('select');
  const textareas = form.querySelectorAll('textarea');

  [...inputs].forEach((input) => {
    if (input['type'] === 'radio') {
      input.checked = false;
      const checkLabel = input.nextSibling;
      const style = checkLabel.style;
      style.backgroundColor = 'transparent';
      style.border = `.1em solid ${theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.raisinBlack}cc` : `${theme.colors.grayScale.raisinBlack}cc`}`;
      style.color = theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.raisinBlack}cc` : `${theme.colors.grayScale.raisinBlack}cc`;
    } else {
      input.value = '';
    }
  });
  [...selects].forEach((select) => {
    select.classList.forEach((c) => {
      if (c.includes('hour')) {
        select.selectedIndex = schedule.start.hour;
      } else if (c.includes('day')) {
        select.selectedIndex = schedule.start.day - 1;
      } else if (c.includes('month')) {
        select.selectedIndex = schedule.start.month - 1;
      } else if (c.includes('year')) {
        select.selectedIndex = 0;
      } else {
        select.selectedIndex = 0;
      }
    });
  });
  [...textareas].forEach((ta) => {
    ta.value = '';
    ta.dispatchEvent(new KeyboardEvent('keyup'));
  });

  for (let key in errors) {
    delete errors[key];
  }

  renderErrors(errorContainer, errors);
};

export const renderErrors = (container, errors) => {
  [...container.childNodes].forEach((child) => child.remove());

  const errorKeys = Object.keys(errors);
  errorKeys.forEach((key, index) => {
    const error = document.createElement('p');
    error.textContent = `${index + 1}: ${errors[key]}`;
    if (errors[key] !== '' && errors[key] !== undefined && errors[key] !== null) {
      insertElement('beforeend', container, error);
    }
  });
};

export const addError = (info, key, error) => {
  info.errors[key] = error;
  return info.errors;
};

export const calculateBuffer = (time) => {
  const quotient = time / 60;
  const hours = Math.floor(quotient);
  const minutes = time - hours * 60;
  const buffer = { hours: hours, minutes: minutes };
  return buffer;
};

export const calculateTime = (limit) => {
  const hours = Math.floor(limit / 60);
  const minutes = limit - hours * 60;
  const time = { hours: hours, minutes: minutes };
  return time;
};

export const replaceClassName = (element, classReplaced, replacementClass) => {
  element.classList.remove(classReplaced);
  element.classList.add(replacementClass);
};

export const insertElement = (position, container, element) => {
  if (container) {
    container.insertAdjacentElement(position, element);
  }
};

export const insertElements = (position, container, elements) => {
  if (container) {
    elements.forEach((element) => insertElement(position, container, element));
  }
};

export const addClasses = (element, classes) => {
  classes.forEach((c) => {
    element.classList.add(c);
  });
};

export const removeClasses = (element, classes) => {
  classes.forEach((c) => {
    element.classList.remove(c);
  });
};

export const toggleClass = (element, className) => {
  return element.classList.toggle(className);
};

export const toggleClasses = (element, classNames) => {
  classNames.forEach((className) => {
    element.classList.toggle(className);
  });
};

export const formatPhoneNumber = (value) => {
  if (!value) return value;
  let number;
  let phoneNumber = value.replace(/[^\d]/g, '');
  let phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength <= 3) {
    return phoneNumber;
  }
  if (phoneNumberLength >= 4 && phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}`;
  }
  number = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)} - ${phoneNumber.slice(6)}`;
  return number;
};

export const multiplyTwo = (numberOne, numberTwo) => {
  return numberOne * numberTwo;
};

export const reloadPage = () => {
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

export const clearIntervalInstigator = (interval) => {
  clearInterval(interval);
};

export const watchScreen = () => {
  window.addEventListener('resize', (e) => {
    e.preventDefault();
    reloadPage();
  });
};

export const build = () => {
  let minuteStart = 0;
  let numberOfMinutes = 60;
  let minutes = [];
  while (minuteStart < numberOfMinutes) {
    if (minuteStart < 10) {
      minutes.push(`0${minuteStart}`);
    } else {
      minutes.push(minuteStart);
    }
    minuteStart++;
  }
  let utility = {
    permissions: {
      admin: false,
      associated: false,
    },
    screen: {
      smallMobilePort: [window.matchMedia(`(max-width: 375px) and (max-height: 800px)`), [`gridMobilePort`, `r__gridMobilePort`]],
      smallMobileLand: [window.matchMedia(`(max-width: 800px) and (max-height: 375px)`), [`gridMobileLand`, `r__gridMobileLand`]],
      largeMobilePort: [window.matchMedia(`(max-width: 425px) and (max-height: 930px)`), [`gridMobilePort`, `r__gridMobilePort`]],
      largeMobileLand: [window.matchMedia(`(max-width: 930px) and (max-height: 425px)`), [`gridMobileLand`, `r__gridMobileLand`]],
      smallTabPort: [window.matchMedia(`(max-width: 800px) and (max-height: 1050px)`), [`gridTabPort`, `r__gridTabPort`]],
      smallTabLand: [window.matchMedia(`(max-width: 1050px) and (max-height: 800px)`), [`gridTabLand`, `r__gridTabLand`]],
      largeTabPort: [window.matchMedia(`(max-width: 1050px) and (max-height: 1400px)`), [`gridTabPort`, `r__gridTabPort`]],
      largeTabLand: [window.matchMedia(`(max-width: 1400px) and (max-height: 1050px)`), [`gridTabLand`, `r__gridTabLand`]],
      desktopQuery: [window.matchMedia(`(min-width: 1401px) and (min-height: 1051px)`), [`gridDesktop`, `r__gridDesktop`]],
      tvQuery: [window.matchMedia(`(min-width: 2500px)`), [`gridTV`, `r__gridTV`]],
    },
    theme: {
      'blue-and-white': 'blue-and-white',
      'blue-and-black': 'blue-and-black',
      'green-and-white': 'green-and-white',
      'green-and-black': 'green-and-black',
      'gold-and-white': 'gold-and-white',
      'gold-and-black': 'gold-and-black',
    },
    minutes: minutes,
  };
  set(`utility`, utility);
};
