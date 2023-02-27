import { DateTime } from 'luxon';
import { addClasses, insertElement } from '../Global/Utility';
import { button } from './Button';

function potentialAppointment(theme, container, details, schedule, appointment, info, user) {
  const potentialAppointment = document.createElement('section');
  addClasses(potentialAppointment, [`potential-appointment`]);
  potentialAppointment.dataset.appointment = appointment._id;
  const style = potentialAppointment.style;
  style.position = 'relative';
  style.height = 'max-content';
  style.minHeight = '4em';
  style.width = `90%`;
  style.border = `.1em solid ${theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.raisinBlack}cc` : `${theme.colors.grayScale.offWhite}cc`}`;
  style.borderRadius = '.5em';
  style.padding = `.25em .5em`;
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
  top.style.paddingBottom = '.25em';
  top.style.borderBottom = `.1em solid ${
    theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.raisinBlack}cc` : `${theme.colors.grayScale.offWhite}cc`
  }`;
  insertElement('beforeend', potentialAppointment, top);

  const appointmentDetails = document.createElement('h4');
  addClasses(appointmentDetails, [`potential-appointment__top__appointment-details`]);
  appointmentDetails.textContent = `${appointment.appointmentType.split(' ')[0]} ${appointment.appointmentType.split(' ')[1].toLowerCase()} with ${
    appointment.attendees[1].attendeeFirstname
  } ${appointment.attendees[1].attendeeLastname} on ${DateTime.fromISO(appointment.appointmentDate).toLocaleString(
    DateTime.DATE_HUGE,
  )} between ${DateTime.fromISO(appointment.appointmentStart).toLocaleString(DateTime.TIME_SIMPLE)} and ${DateTime.fromISO(
    appointment.appointmentEnd,
  ).toLocaleString(DateTime.TIME_SIMPLE)}`;
  appointmentDetails.style.position = 'relative';
  appointmentDetails.style.fontFamily = theme.font;
  appointmentDetails.style.fontSize = '.53em';
  appointmentDetails.style.textAlign = 'center';

  insertElement('beforeend', top, appointmentDetails);

  const bottom = document.createElement('section');
  addClasses(bottom, [`potential-appointment__bottom`]);
  bottom.style.position = 'relative';
  bottom.style.height = '50%';
  bottom.style.width = '100%';
  bottom.style.display = 'flex';
  bottom.style.flexFlow = 'row nowrap';
  bottom.style.justifyContent = 'flex-end';
  bottom.style.alignItems = 'center';
  bottom.style.paddingTop = '.25em';
  insertElement('beforeend', potentialAppointment, bottom);

  if (appointment.update === false) {
    button('potential-appointment', 'Accept', theme, bottom, details, schedule, info, user);
    button('potential-appointment', 'Decline', theme, bottom, details, schedule, info, user);
  } else if (appointment.update === true) {
    button('potential-appointment', 'Accept Update', theme, bottom, details, schedule, info, user);
    button('potential-appointment', 'Decline Update', theme, bottom, details, schedule, info, user);
  }
}

export { potentialAppointment };
