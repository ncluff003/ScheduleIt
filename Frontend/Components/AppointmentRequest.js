import { addClasses, insertElement } from '../Global/Utility';
import { button } from './Button';

function potentialAppointment(theme, container, details, schedule, appointment) {
  const potentialAppointment = document.createElement('section');
  addClasses(potentialAppointment, [`potential-appointment`]);
  const style = potentialAppointment.style;
  style.position = 'relative';
  style.height = 'max-content';
  style.minHeight = '4em';
  style.width = `90%`;
  style.border = `.1em solid ${theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.raisinBlack}cc` : `${theme.colors.grayScale.offWhite}cc`}`;
  style.borderRadius = '.5em';
  style.padding = `.25em`;
  style.margin = `.25em 0`;
  style.display = 'flex';
  style.flexFlow = `column nowrap`;
  style.justifyContent = `space-evenly`;
  style.alignItems = `center`;

  insertElement('beforeend', container, potentialAppointment);

  const top = document.createElement('section');
  addClasses(top, [`potential-appointment__top`]);
  top.style.position = 'relative';
  top.style.height = '50%';
  top.style.width = '100%';
  top.style.display = 'flex';
  top.style.flexFlow = 'row nowrap';
  top.style.justifyContent = 'flex-start';
  top.style.alignItems = 'center';
  insertElement('beforeend', potentialAppointment, top);

  const bottom = document.createElement('section');
  addClasses(bottom, [`potential-appointment__bottom`]);
  bottom.style.position = 'relative';
  bottom.style.height = '50%';
  bottom.style.width = '100%';
  bottom.style.display = 'flex';
  bottom.style.flexFlow = 'row nowrap';
  bottom.style.justifyContent = 'flex-end';
  bottom.style.alignItems = 'center';
  insertElement('beforeend', potentialAppointment, bottom);
}

export { potentialAppointment };
