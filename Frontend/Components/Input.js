import { addClasses, insertElement } from '../Global/Utility';

function loginFormInput(theme, container) {
  const input = document.createElement('input');
  addClasses(input, ['schedule-it__form--login__user-login__input']);
  const style = input.style;
  style.position = 'relative';
  style.height = '30%';
  style.width = '70%';
  style.padding = '.5rem 1rem';
  style.fontFamily = 'Made Tommy Soft';
  style.fontSize = '.6em';
  style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`;
  style.border = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`;
  style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
  style.borderRadius = '.5rem';
  insertElement('beforeend', container, input);
}

export { loginFormInput };
