import { addClasses, insertElement } from '../Global/Utility';
import { button } from './Button';
import { dateSelectContainer, errorContainer, loginContainer } from './Container';
import { formCloser } from './FormCloser';
import { flexSection } from './FormSection';
import { selectDateFormHeader } from './Header';

function form(formType, user, theme, container, details, schedule, info) {
  const form = document.createElement('form');
  if (formType === 'login') {
    // Parent Font Size: 3rem
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
    style.backgroundColor = `${theme.colors.primary}f2`;

    loginContainer(user, theme, form, details, schedule, info);
    loginContainer(user, theme, form, details, schedule, info);
  } else if (formType === 'select-date') {
    // Parent Font Size: 3rem
    addClasses(form, ['schedule-it__form--date-selection']);
    errorContainer(theme, form, details, schedule, info.errors);
    const style = form.style;
    style.position = 'absolute';
    style.top = 0;
    style.left = 0;
    style.height = '100%';
    style.width = '100%';
    style.display = 'none';
    style.flexFlow = 'column nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.zIndex = 5;
    style.backgroundColor = `${theme.colors.primary}f2`;
    formCloser('select-date', theme, form);

    selectDateFormHeader('select-date', theme, form);
    dateSelectContainer(theme, form, details, schedule, info);
    button('Date Selection', 'Select Date', theme, form, details, schedule, info, '');
  } else if (formType === 'request-appointment' || formType === 'update-appointment') {
    if (formType === 'request-appointment') {
      addClasses(form, ['schedule-it__form--request-appointment']);
    } else if (formType === 'update-appointment') {
      addClasses(form, ['schedule-it__form--update-appointment']);
    }
    errorContainer(theme, form, formType);
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
    style.backgroundColor = `${theme.colors.primary}f2`;
    style.overflowY = 'auto';
    if (formType === 'request-appointment') {
      formCloser('request-appointment', theme, form);
      selectDateFormHeader('request-appointment', theme, form);
    } else if (formType === 'update-appointment') {
      formCloser('update-appointment', theme, form);
      selectDateFormHeader('update-appointment', theme, form);
      dateSelectContainer(theme, form, details, schedule, info, formType);
    }
    flexSection(theme, form, details, schedule, info, { sectionStyle: 'flexing', sectionType: 'names', type: formType, minHeight: '2em' });
    flexSection(theme, form, details, schedule, info, { sectionStyle: 'column', sectionType: 'time', type: formType, minHeight: '4em' });
    flexSection(theme, form, details, schedule, info, { sectionStyle: 'column', sectionType: 'email', type: formType, minHeight: '3em' });
    flexSection(theme, form, details, schedule, info, { sectionStyle: 'column', sectionType: 'phone', type: formType, minHeight: '3em' });
    flexSection(theme, form, details, schedule, info, { sectionStyle: 'column', sectionType: 'communication', type: formType, minHeight: '4em' });
    flexSection(theme, form, details, schedule, info, { sectionStyle: 'column', sectionType: 'message', type: formType, minHeight: '6em' });
    flexSection(theme, form, details, schedule, info, { sectionStyle: 'column', sectionType: 'request', type: formType, minHeight: '3em' });
  } else if (formType === 'appointment-requests') {
    addClasses(form, ['schedule-it__form--appointment-requests']);
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
    style.backgroundColor = `${theme.colors.primary}f2`;
    style.overflowY = 'auto';

    formCloser('appointment-requests', theme, form);
    selectDateFormHeader('appointment-requests', theme, form);
  }

  insertElement('beforeend', container, form);
}

export { form };
