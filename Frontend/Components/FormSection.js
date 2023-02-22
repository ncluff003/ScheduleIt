import { addClasses, insertElement } from '../Global/Utility';
import { button } from './Button';
import { communicationPreferenceHeader } from './Header';
import { appointmentRequestInput, formSelect, textArea } from './Input';
import { characterCountLabel, communicationPreferenceLabel } from './Label';
import { InvisibleRadio } from './Radio';

function flexSection(sectionstyle, sectionType, theme, container, info, settings) {
  const flex = document.createElement('section');
  addClasses(flex, ['schedule-it__form--request-appointment__flex-section']);
  const style = flex.style;
  style.position = 'relative';
  style.height = 'max-content';
  style.minHeight = settings.minHeight;
  style.width = '100%';
  style.display = 'flex';
  sectionstyle === 'flexing' ? (style.flexFlow = 'row wrap') : sectionstyle === 'column' ? (style.flexFlow = 'column nowrap') : (style.flexFlow = 'row nowrap');
  style.justifyContent = sectionstyle === 'flexing' ? 'space-evenly' : 'center';
  style.alignItems = 'center';
  insertElement('beforeend', container, flex);

  if (sectionstyle === 'flexing' && sectionType === 'names') {
    if (settings.type === 'update-appointment' || settings.type === 'request-appointment') {
      style.marginBottom = '1em';
    }
    appointmentRequestInput('half', 'First Name', theme, flex, info);
    appointmentRequestInput('half', 'Last Name', theme, flex, info);
  } else if (sectionstyle === 'column' && sectionType === 'time') {
    timeFlexSection('time', theme, flex, info, settings.type, 'first');
    timeFlexSection('to', theme, flex, info);
    timeFlexSection('time', theme, flex, info);
  } else if (sectionType === 'email') {
    appointmentRequestInput('full', 'Email Address', theme, flex, info);
  } else if (sectionType === 'phone') {
    appointmentRequestInput('full', 'Phone Number', theme, flex, info);
  } else if (sectionstyle === 'column' && sectionType === 'communication') {
    communicationPreferenceHeader(theme, flex);
    communicationFlexSection(theme, flex, info, settings.type);
  } else if (sectionType === 'message') {
    style.justifyContent = 'flex-start';
    style.paddingTop = '1em';
    style.marginBottom = '4em';
    textArea(theme, flex, info, { size: 'extra-large' });
    characterCountLabel(theme, flex, { size: 'extra-large' });
  } else if (sectionType === 'request') {
    if (settings.type === 'request-appointment') {
      button('Request Appointment', 'Request Appointment', theme, flex, info, '');
    } else if (settings.type === 'update-appointment') {
      button('Update Appointment', 'Request Appointment Update', theme, flex, info, '');
    }
  }
}

function timeFlexSection(type, theme, container, info, elNum) {
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
      formSelect('hour', theme, timeFlex, info, elNum);
    } else {
      formSelect('hour', theme, timeFlex, info);
    }
    if (elNum !== undefined && elNum !== null && elNum === 'first') {
      formSelect('minute', theme, timeFlex, info, elNum);
    } else {
      formSelect('minute', theme, timeFlex, info);
    }
    if (elNum !== undefined && elNum !== null && elNum === 'first') {
      const meridiem = document.createElement('p');
      addClasses(meridiem, ['schedule-it__form--request-appointment__flex-section__time__meridiem', 'first-meridiem']);
      meridiem.style.margin = '1em 0 0';
      insertElement('beforeend', timeFlex, meridiem);
    } else {
      const meridiem = document.createElement('p');
      meridiem.style.margin = '0 0 1em';
      addClasses(meridiem, ['schedule-it__form--request-appointment__flex-section__time__meridiem', 'second-meridiem']);
      insertElement('beforeend', timeFlex, meridiem);
    }

    // meridiem.textContent = DateTime.local();
    style.fontFamily = theme.text;
    style.fontSize = '.75em';
  } else if (type === 'to') {
    const to = document.createElement('p');
    const style = to.style;
    to.textContent = 'To';
    style.fontFamily = theme.text;
    style.fontSize = '.75em';
    style.color = theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.raisinBlack;
    style.fontVariant = 'small-caps';
    insertElement('beforeend', timeFlex, to);
  }
  insertElement('beforeend', container, timeFlex);
}

function communicationFlexSection(theme, container, info, type) {
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
