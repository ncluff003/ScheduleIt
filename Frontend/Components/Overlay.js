import { addClasses, insertElement } from '../Global/Utility';
import { button, Button } from './Button';
import { form } from './Form';

function loginOverlay(theme, container, details, schedule, info) {
  // Parent Font Size: 3rem
  const overlay = document.createElement('section');
  const style = overlay.style;
  const user = '';
  addClasses(overlay, ['schedule-it__display__overlay--login']);
  style.position = 'absolute';
  style.top = 0;
  style.height = '100%';
  style.width = '100%';
  style.borderRadius = '0 0 .5em .5em';
  style.backgroundColor = `${theme.colors.primary}cc`;
  style.display = 'flex';
  style.flexFlow = 'column nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  insertElement('beforeend', container, overlay);

  form('login', user, theme, overlay, details, schedule, info);

  button('primary--overlay', 'Owner Login', theme, overlay, details, schedule, info, user);
  button('primary--overlay', 'Client Login', theme, overlay, details, schedule, info, user);
}

export { loginOverlay };
