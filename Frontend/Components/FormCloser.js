import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
library.add(faWindowClose);
const formCloseIcon = icon({ prefix: 'fas', iconName: 'window-close' });

import { addClasses, insertElement } from '../Global/Utility';

function closeForm(close, formType) {
  if (formType === 'select-date') {
    const form = document.querySelector('.schedule-it__form--date-selection');
    form.style.display = 'none';
  } else if (formType === 'request-appointment') {
    const form = document.querySelector('.schedule-it__form--request-appointment');
    form.style.display = 'none';
  } else if (formType === 'update-appointment') {
    const form = document.querySelector('.schedule-it__form--update-appointment');
    form.style.display = 'none';
  } else if (formType === 'appointment-requests') {
    const form = document.querySelector('.schedule-it__form--appointment-requests');
    form.style.display = 'none';
  }
  close.removeEventListener('click', closeForm);
}

function formCloser(formType, theme, container) {
  const close = document.createElement('i');
  addClasses(close, ['schedule-it__form__close']);
  close.innerHTML = formCloseIcon.html[0];
  const style = close.style;
  style.position = 'absolute';
  style.fontSize = '1.25em'; // 4.5rem
  style.top = '0.5em';
  style.right = '0.6em';
  style.color = theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.raisinBlack}cc` : `${theme.colors.grayScale.raisinBlack}cc`;
  if (formType === 'select-date') {
    close.addEventListener('click', closeForm.bind(this, close, formType));
  } else if (formType === 'request-appointment') {
    close.addEventListener('click', closeForm.bind(this, close, formType));
  } else if (formType === 'update-appointment') {
    close.addEventListener('click', closeForm.bind(this, close, formType));
  } else if (formType === 'appointment-requests') {
    close.addEventListener('click', closeForm.bind(this, close, formType));
  }

  close.addEventListener('mouseover', (e) => {
    e.preventDefault();
    style.cursor = 'pointer';
    style.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack;
    style.transition = 'background-color .5s, color .5s, border .5s';
  });

  close.addEventListener('mouseout', (e) => {
    e.preventDefault();
    style.color = theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.raisinBlack}cc` : `${theme.colors.grayScale.raisinBlack}cc`;
    style.transition = 'background-color .5s, color .5s, border .5s';
  });

  insertElement('beforeend', container, close);
}

export { formCloser, closeForm };
