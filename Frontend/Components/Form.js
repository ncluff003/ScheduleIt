import { addClasses, insertElement } from '../Global/Utility';

function form(user, theme, container) {
  // Parent font size = 3rem or 30px.
  const form = document.createElement('form');
  addClasses(form, ['schedule-it__form--login']);
  const style = form.style;
  style.position = 'absolute';
  style.height = '100%';
  style.width = '100%';
  style.display = 'flex'; // This will be changed later on to aid the functionality of the scheduling application.  It will start as 'none'.
  style.flexFlow = 'column nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  style.zIndex = 5;
  style.backgroundColor = `${theme.primary}f2`;

  // Building The Owner Login Form.
  const ownerLoginContainer = document.createElement('section');
  addClasses(ownerLoginContainer, ['schedule-it__form--login__user-login']);
  const ownerStyle = ownerLoginContainer.style;
  ownerStyle.position = 'relative';
  ownerStyle.height = '6em';
  ownerStyle.width = '100%';
  ownerStyle.display = 'flex';
  ownerStyle.flexFlow = 'column nowrap';
  ownerStyle.justifyContent = 'space-evenly';
  ownerStyle.alignItems = 'center';
  insertElement('beforeend', form, ownerLoginContainer);

  const heading = document.createElement('header');
  addClasses(heading, ['schedule-it__form--login__user-login__heading']);
  const headingStyle = heading.style;
  headingStyle.height = '33%';
  headingStyle.width = '100%';
  headingStyle.display = 'flex';
  headingStyle.flexFlow = 'row nowrap';
  headingStyle.justifyContent = 'center';
  headingStyle.alignItems = 'center';
  headingStyle.fontFamily = 'MADE Tommy Soft';
  headingStyle.fontSize = '1em';
  const headingText = document.createElement('h4');
  headingText.textContent = 'Owner Login';
  insertElement('beforeend', heading, headingText);
  insertElement('beforeend', ownerLoginContainer, heading);

  // Building The Client Login Form.
  const clientLoginContainer = document.createElement('section');
  addClasses(clientLoginContainer, ['schedule-it__form--login__user-login']);
  const clientStyle = clientLoginContainer.style;
  clientStyle.position = 'relative';
  clientStyle.height = '6em';
  clientStyle.width = '100%';
  clientStyle.display = 'flex';
  clientStyle.flexFlow = 'column nowrap';
  clientStyle.justifyContent = 'space-evenly';
  clientStyle.alignItems = 'center';
  insertElement('beforeend', form, clientLoginContainer);

  const headingTwo = document.createElement('header');
  addClasses(headingTwo, ['schedule-it__form--login__user-login__heading']);
  const headingTwoStyle = headingTwo.style;
  headingTwoStyle.height = '33%';
  headingTwoStyle.width = '100%';
  headingTwoStyle.display = 'flex';
  headingTwoStyle.flexFlow = 'row nowrap';
  headingTwoStyle.justifyContent = 'center';
  headingTwoStyle.alignItems = 'center';
  headingTwoStyle.fontFamily = 'MADE Tommy Soft';
  headingTwoStyle.fontSize = '1em';
  const headingTwoText = document.createElement('h4');
  headingTwoText.textContent = 'Client Login';
  insertElement('beforeend', headingTwo, headingTwoText);
  insertElement('beforeend', clientLoginContainer, headingTwo);

  insertElement('beforeend', container, form);
}

export { form };
