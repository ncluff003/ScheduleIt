import { addClasses, insertElement } from '../Global/Utility';

function InvisibleRadio(value, theme, container, info) {
  const radio = document.createElement('input');
  addClasses(radio, ['schedule-it__form--request-appointment__flex-section__radio']);
  const style = radio.style;
  style.display = 'none';
  style.appearance = 'none';
  radio.id = value.split(' ').join('').toLowerCase();
  radio.type = 'radio';
  radio.value = value;
  radio.name = 'communicationPreference';
  insertElement('beforeend', container, radio);
}

export { InvisibleRadio };
