import { addClasses, insertElement } from '../Global/Utility';
import { button } from './Button';
import { dateSelectContainer, loginContainer } from './Container';
import { formCloser } from './FormCloser';
import { flexSection } from './FormSection';
import { selectDateFormHeader } from './Header';

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
  } else if (formType === 'select-date') {
    addClasses(form, ['schedule-it__form--date-selection']);
    const style = form.style;
    style.position = 'absolute';
    style.top = 0;
    style.left = 0;
    style.height = '100%';
    style.width = '100%';
    style.display = 'none'; // This will be changed later on to aid the functionality of the scheduling application.  It will start as 'none'.
    style.flexFlow = 'column nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.zIndex = 5;
    style.backgroundColor = `${theme.primary}f2`;
    formCloser('select-date', theme, form);

    selectDateFormHeader('select-date', theme, form);
    dateSelectContainer(theme, form, info);
    button('Date Selection', 'Select Date', theme, form, info, '');
  } else if (formType === 'request-appointment') {
    addClasses(form, ['schedule-it__form--request-appointment']);
    const style = form.style;
    style.position = 'absolute';
    style.top = 0;
    style.left = 0;
    style.height = '100%';
    style.width = '100%';
    style.display = 'none'; // This will be changed later on to aid the functionality of the scheduling application.  It will start as 'none'.
    style.flexFlow = 'column nowrap';
    style.justifyContent = 'flex-start';
    style.alignItems = 'center';
    style.paddingTop = '2.5em';
    style.zIndex = 5;
    style.backgroundColor = `${theme.primary}f2`;
    style.overflowY = 'auto';
    formCloser('request-appointment', theme, form);
    selectDateFormHeader('request-appointment', theme, form);
    flexSection('flexing', 'names', theme, form, info, { minHeight: '2em' });
    flexSection('column', 'time', theme, form, info, { minHeight: '4em' });
    flexSection('column', 'email', theme, form, info, { minHeight: '3em' });
    flexSection('column', 'phone', theme, form, info, { minHeight: '3em' });
    flexSection('column', 'communication', theme, form, info, { minHeight: '4em' });
    flexSection('column', 'message', theme, form, info, { minHeight: '6em' });
    flexSection('column', 'request', theme, form, info, { minHeight: '2em' });
  }

  insertElement('beforeend', container, form);
}

export { form };
