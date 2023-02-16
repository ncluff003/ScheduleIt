import { addClasses, insertElement } from '../Global/Utility';
import { button, Button } from './Button';
import { form } from './Form';

function loginOverlay(theme, container) {
  // Parent font size = 3rem or 30px.
  const overlay = document.createElement('section');
  const style = overlay.style;
  const user = '';
  addClasses(overlay, ['schedule-it__display__overlay--login']);
  style.position = 'absolute';
  style.top = 0;
  style.height = '100%';
  style.width = '100%';
  style.borderRadius = '0 0 .5rem .5rem';
  style.backgroundColor = `${theme.primary}cc`;
  style.display = 'flex';
  style.flexFlow = 'column nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  insertElement('beforeend', container, overlay);

  form(user, theme, overlay);

  button('primary--overlay', 'Owner Login', theme, overlay);
  button('primary--overlay', 'Client Login', theme, overlay);
}

export { loginOverlay };
