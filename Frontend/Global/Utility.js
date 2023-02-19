import { get, getAll, set, remove, useNamespace } from './Cache';

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
  console.log(`cleared`);
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
