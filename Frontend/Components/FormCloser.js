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
  }
  close.removeEventListener('click', closeForm);
}

function formCloser(formType, theme, container) {
  const close = document.createElement('i');
  addClasses(close, ['fas', 'fa-window-close', 'schedule-it__form__close']);
  const style = close.style;
  style.position = 'absolute';
  style.fontSize = '1.5em';
  style.top = '0.5em';
  style.right = '0.6em';
  style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
  if (formType === 'select-date') {
    close.addEventListener('click', closeForm.bind(this, close, formType));
  } else if (formType === 'request-appointment') {
    close.addEventListener('click', closeForm.bind(this, close, formType));
  } else if (formType === 'update-appointment') {
    close.addEventListener('click', closeForm.bind(this, close, formType));
  }

  close.addEventListener('mouseover', (e) => {
    e.preventDefault();
    style.cursor = 'pointer';
    style.color = theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite;
    style.transition = 'background-color .5s, color .5s, border .5s';
  });

  close.addEventListener('mouseout', (e) => {
    e.preventDefault();
    style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
    style.transition = 'background-color .5s, color .5s, border .5s';
  });

  insertElement('beforeend', container, close);
}

export { formCloser, closeForm };
