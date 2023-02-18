import { addClasses, insertElement } from '../Global/Utility';
import { appointmentRequestInput, formSelect } from './Input';

function flexSection(sectionstyle, sectionType, theme, container, info) {
  const flex = document.createElement('section');
  addClasses(flex, ['schedule-it__form--request-appointment__flex-section']);
  const style = flex.style;
  style.position = 'relative';
  style.height = 'max-content';
  style.minHeight = '2em';
  style.width = '100%';
  style.paddingRight = '1em';
  style.display = 'flex';
  sectionstyle === 'flexing' ? (style.flexFlow = 'row wrap') : sectionstyle === 'column' ? (style.flexFlow = 'column nowrap') : (style.flexFlow = 'row nowrap');
  style.justifyContent = sectionstyle === 'flexing' ? 'space-evenly' : 'center';
  style.alignItems = 'center';
  insertElement('beforeend', container, flex);

  if (sectionstyle === 'flexing' && sectionType === 'names') {
    appointmentRequestInput('half', 'First Name', theme, flex, info);
    appointmentRequestInput('half', 'Last Name', theme, flex, info);
  } else if (sectionstyle === 'column' && sectionType === 'time') {
    timeFlexSection('time', theme, flex, info, 'first');
    timeFlexSection('to', theme, flex, info);
    timeFlexSection('time', theme, flex, info);
  } else if (sectionType === 'email') {
    appointmentRequestInput('full', 'Email Address', theme, flex, info);
  } else if (sectionType === 'phone') {
    appointmentRequestInput('full', 'Phone Number', theme, flex, info);
  } else if (sectionstyle === 'column' && sectionType === 'communication') {
  } else if (sectionType === 'request') {
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
    style.color = theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite;
    style.fontVariant = 'small-caps';
    insertElement('beforeend', timeFlex, to);
  }
  insertElement('beforeend', container, timeFlex);
}

export { flexSection };
