import { addClasses, insertElement } from '../Global/Utility';
import { loginFormHeader } from './Header';
import { loginFormInput } from './Input';
import { loginFormLabel } from './Label';
import { button } from './Button';

function loginContainer(user, theme, container) {
  const loginContainer = document.createElement('section');
  addClasses(loginContainer, ['schedule-it__form--login__user-login']);
  const style = loginContainer.style;
  style.position = 'relative';
  style.height = '6em';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'column nowrap';
  style.justifyContent = 'space-evenly';
  style.alignItems = 'center';
  insertElement('beforeend', container, loginContainer);

  loginFormHeader(theme, loginContainer);
  loginFormLabel(theme, loginContainer);
  loginFormInput(theme, loginContainer);
  loginButtonContainer(user, theme, loginContainer);
}

function loginButtonContainer(user, theme, container) {
  const buttonContainer = document.createElement('section');
  addClasses(buttonContainer, ['schedule-it__form--login__user-login__buttons']);
  const style = buttonContainer.style;
  style.position = 'relative';
  style.height = 'max-content';
  style.width = '70%';
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'flex-end';
  style.alignItems = 'center';

  insertElement('beforeend', container, buttonContainer);
  button('login--overlay', 'Login', theme, buttonContainer);
  button('login--overlay', 'Close', theme, buttonContainer);
}

export { loginContainer, loginButtonContainer };
