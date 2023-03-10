import { addClasses, insertElement } from '../Global/Utility';
import { button } from './Button';
import { communicationPreferenceHeader } from './Header';
import { appointmentRequestInput, formSelect, textArea } from './Input';
import { characterCountLabel, communicationPreferenceLabel } from './Label';
import { InvisibleRadio } from './Radio';

function flexSection(theme, container, details, schedule, info, settings) {
  // Parent Font Size: 3rem
  const flex = document.createElement('section');
  addClasses(flex, ['schedule-it__form--request-appointment__flex-section']);
  const style = flex.style;
  style.position = 'relative';
  style.height = 'max-content';
  style.minHeight = settings.minHeight;
  style.width = '100%';
  style.display = 'flex';
  settings.sectionStyle === 'flexing'
    ? (style.flexFlow = 'row wrap')
    : settings.sectionStyle === 'column'
    ? (style.flexFlow = 'column nowrap')
    : (style.flexFlow = 'row nowrap');
  style.justifyContent = settings.sectionStyle === 'flexing' ? 'space-evenly' : 'center';
  style.alignItems = 'center';
  insertElement('beforeend', container, flex);

  if (settings.sectionStyle === 'flexing' && settings.sectionType === 'names') {
    if (settings.type === 'update-appointment' || settings.type === 'request-appointment') {
      style.marginBottom = '1em';
    }
    appointmentRequestInput('half', 'First Name', theme, flex, info);
    appointmentRequestInput('half', 'Last Name', theme, flex, info);
  } else if (settings.sectionStyle === 'column' && settings.sectionType === 'time') {
    timeFlexSection('time', theme, flex, details, schedule, info, settings.type, 'first');
    timeFlexSection('to', theme, flex, details, schedule, info);
    timeFlexSection('time', theme, flex, details, schedule, info, settings.type, 'second');
  } else if (settings.sectionType === 'email') {
    appointmentRequestInput('full', 'Email Address', theme, flex, info);
  } else if (settings.sectionType === 'phone') {
    appointmentRequestInput('full', 'Phone Number', theme, flex, info);
  } else if (settings.sectionStyle === 'column' && settings.sectionType === 'communication') {
    communicationPreferenceHeader(theme, flex);
    communicationFlexSection(theme, flex, info, settings.type);
  } else if (settings.sectionType === 'message') {
    style.justifyContent = 'flex-start';
    style.paddingTop = '1em';
    style.marginBottom = '4em';
    textArea(theme, flex, details, schedule, info, { type: settings.type, size: 'extra-large' });
    characterCountLabel(theme, flex, { size: 'extra-large' });
  } else if (settings.sectionType === 'request') {
    if (settings.type === 'request-appointment') {
      button('Request Appointment', 'Request Appointment', theme, flex, details, schedule, info, '');
    } else if (settings.type === 'update-appointment') {
      button('Update Appointment', 'Request Appointment Update', theme, flex, details, schedule, info, '');
    }
  }
}

function timeFlexSection(type, theme, container, details, schedule, info, formType, elNum) {
  // Parent Font Size: 3rem
  const timeFlex = document.createElement('section');
  addClasses(timeFlex, ['schedule-it__form--request-appointment__flex-section__time']);
  const style = timeFlex.style;
  style.position = 'relative';
  style.height = '100%';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  if (type === 'time') {
    if (elNum !== undefined && elNum !== null && elNum === 'first') {
      formSelect('hour', theme, timeFlex, details, schedule, info, formType, elNum);
    } else {
      formSelect('hour', theme, timeFlex, details, schedule, info, formType, 'second');
    }
    if (elNum !== undefined && elNum !== null && elNum === 'first') {
      formSelect('minute', theme, timeFlex, details, schedule, info, formType, elNum);
    } else {
      formSelect('minute', theme, timeFlex, details, schedule, info, formType, 'second');
    }
    if (elNum !== undefined && elNum !== null && elNum === 'first' && formType === 'request-appointment') {
      const meridiem = document.createElement('p');
      addClasses(meridiem, ['schedule-it__form--request-appointment__flex-section__time__meridiem', 'first-meridiem']);
      meridiem.style.margin = '1em 0 0';
      insertElement('beforeend', timeFlex, meridiem);
    } else if (elNum !== undefined && elNum !== null && elNum === 'second' && formType === 'request-appointment') {
      const meridiem = document.createElement('p');
      meridiem.style.margin = '0 0 1em';
      addClasses(meridiem, ['schedule-it__form--request-appointment__flex-section__time__meridiem', 'second-meridiem']);
      insertElement('beforeend', timeFlex, meridiem);
    } else if (elNum !== undefined && elNum !== null && elNum === 'first' && formType === 'update-appointment') {
      const meridiem = document.createElement('p');
      meridiem.style.margin = '1em 0 0';
      addClasses(meridiem, ['schedule-it__form--request-appointment__flex-section__time__meridiem', 'third-meridiem']);
      insertElement('beforeend', timeFlex, meridiem);
    } else if (elNum !== undefined && elNum !== null && elNum === 'second' && formType === 'update-appointment') {
      const meridiem = document.createElement('p');
      meridiem.style.margin = '0 0 1em';
      addClasses(meridiem, ['schedule-it__form--request-appointment__flex-section__time__meridiem', 'fourth-meridiem']);
      insertElement('beforeend', timeFlex, meridiem);
    }

    style.fontFamily = theme.font;
    style.fontSize = '.75em'; // 2.25rem
  } else if (type === 'to') {
    const to = document.createElement('p');
    const style = to.style;
    to.textContent = 'To';
    style.fontFamily = theme.font;
    style.fontSize = '.75em'; // 2.25rem
    style.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack;
    style.fontVariant = 'small-caps';
    insertElement('beforeend', timeFlex, to);
  }
  insertElement('beforeend', container, timeFlex);
}

function communicationFlexSection(theme, container, info, type) {
  // Parent Font Size: 3rem
  const flex = document.createElement('section');
  addClasses(flex, ['schedule-it__form--request-appointment__flex-section__communication']);
  const style = flex.style;
  style.position = 'relative';
  style.height = '3em';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  InvisibleRadio(`Video Chat${type && type === 'update-appointment' ? '-- Update' : ''}`, theme, flex, info);
  communicationPreferenceLabel(`Video Chat${type && type === 'update-appointment' ? '-- Update' : ''}`, theme, flex, info);
  InvisibleRadio(`Phone Call${type && type === 'update-appointment' ? '-- Update' : ''}`, theme, flex, info);
  communicationPreferenceLabel(`Phone Call${type && type === 'update-appointment' ? '-- Update' : ''}`, theme, flex, info);
  insertElement('beforeend', container, flex);
}

export { flexSection };
