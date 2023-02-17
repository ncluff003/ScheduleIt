import { addClasses, insertElement } from '../Global/Utility';

function loginFormInput(theme, container) {
  const input = document.createElement('input');
  addClasses(input, ['schedule-it__form--login__user-login__input']);
  const style = input.style;
  style.position = 'relative';
  style.height = '30%';
  style.width = '70%';
  style.padding = '.5rem 1rem';
  style.fontFamily = theme.text;
  style.fontSize = '.6em';
  style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`;
  style.border = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`;
  style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
  style.borderRadius = '.5rem';
  input.addEventListener('focus', (e) => {
    e.preventDefault();
    style.outline = 'none';
    style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}` : `${theme.grayScale.raisinBlack}`;
    style.border = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}` : `${theme.grayScale.raisinBlack}`;
    style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}` : `${theme.grayScale.offWhite}`;
  });
  input.addEventListener('blur', (e) => {
    e.preventDefault();
    style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`;
    style.border = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}cc` : `${theme.grayScale.raisinBlack}cc`;
    style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
  });
  insertElement('beforeend', container, input);
}

export { loginFormInput };
