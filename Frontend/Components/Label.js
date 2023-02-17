import { addClasses, insertElement } from '../Global/Utility';

function loginFormLabel(theme, container) {
  const label = document.createElement('label');
  addClasses(label, ['schedule-it__form--login__user-login__label']);
  const style = label.style;
  style.position = 'relative';
  style.height = 'max-content';
  style.width = '70%';
  style.left = '1rem';
  style.margin = '.25rem 0';
  style.fontFamily = theme.text;
  style.fontSize = '.6em';
  insertElement('beforeend', container, label);
}

export { loginFormLabel };
