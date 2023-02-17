import { addClasses, insertElement } from '../Global/Utility';
import { button } from './Button';
import { loginContainer } from './Container';

function form(formType, user, theme, container, info) {
  // Parent font size = 3rem or 30px.
  const form = document.createElement('form');
  if (formType === 'login') {
    addClasses(form, ['schedule-it__form--login']);
    const style = form.style;
    style.position = 'absolute';
    style.height = '100%';
    style.width = '100%';
    style.display = 'none'; // This will be changed later on to aid the functionality of the scheduling application.  It will start as 'none'.
    style.flexFlow = 'column nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.zIndex = 5;
    style.backgroundColor = `${theme.primary}f2`;

    // Building The Login Forms.
    loginContainer(user, theme, form, info);
    loginContainer(user, theme, form, info);
    insertElement('beforeend', container, form);
  }
}

export { form };
