import axios from 'axios';
import { DateTime, Duration } from 'luxon';
import { addClasses, insertElement } from '../Global/Utility';
import { appointmentButtons } from './Container';

function appointment(theme, container, info, appointment, clientAppointment) {
  const start = DateTime.fromISO(appointment.appointmentStart);
  const end = DateTime.fromISO(appointment.appointmentEnd);
  const difference = end.diff(start, ['days', 'hours', 'minutes']).toObject();

  const exampleHour = document.querySelectorAll('.schedule-it__display__schedule__planner__hour')[0];
  const hourHeight = exampleHour.getBoundingClientRect().height;
  const minuteHeight = exampleHour.getBoundingClientRect().height / 60;
  const totalHeight = difference.hours * hourHeight + difference.minutes * minuteHeight;
  console.log(exampleHour.getBoundingClientRect().height, minuteHeight);
  const appointmentContainer = document.createElement('div');
  addClasses(appointmentContainer, ['schedule-it__display__schedule__planner__appointment']);
  const style = appointmentContainer.style;
  appointmentContainer.dataset.appointment = appointment._id;
  console.log(DateTime.fromISO(appointment.appointmentStart).hour);
  style.position = 'absolute';
  style.top = `${hourHeight * DateTime.fromISO(appointment.appointmentStart).hour}px`;
  style.height = `${totalHeight}px`;
  style.width = '100%';
  style.backgroundColor = `${theme.primary}f2`;
  style.display = 'flex';
  style.flexFlow = 'row wrap';
  style.justifyContent = 'flex-start';
  style.alignItems = 'flex-start';
  style.padding = '.4em .25em .25em 3em';
  style.borderBottom = `.075em groove ${theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`}`;
  style.overflowY = 'auto';

  console.log(info.clientEmail);

  const appointmentLabel = document.createElement('label');
  addClasses(appointmentLabel, ['schedule-it__display__schedule__planner__appointment__label']);
  const labelStyle = appointmentLabel.style;
  labelStyle.fontFamily = theme.text;
  labelStyle.fontSize = '.425em';
  labelStyle.color = theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite;

  if (info.userType === 'Owner') {
    appointmentLabel.textContent = `${appointment.appointmentType.split(' ')[0]} ${appointment.appointmentType.split(' ')[1].toLowerCase()} with ${
      appointment.attendees[1].attendeeFirstname
    } ${appointment.attendees[1].attendeeLastname} from ${start.toLocaleString(DateTime.TIME_SIMPLE)} to ${end.toLocaleString(DateTime.TIME_SIMPLE)}.`;
  } else if (info.userType === 'Client') {
    appointmentLabel.textContent = `${appointment.appointmentType.split(' ')[0]} ${appointment.appointmentType
      .split(' ')[1]
      .toLowerCase()} from ${start.toLocaleString(DateTime.TIME_SIMPLE)} to ${end.toLocaleString(DateTime.TIME_SIMPLE)}.`;
    appointment.attendees.forEach((person) => {
      if (person.attendeeEmail === info.clientEmail) {
        appointmentLabel.textContent = `${appointment.appointmentType.split(' ')[0]} ${appointment.appointmentType.split(' ')[1].toLowerCase()} with ${
          appointment.attendees[0].attendeeFirstname
        } ${appointment.attendees[0].attendeeLastname} from ${start.toLocaleString(DateTime.TIME_SIMPLE)} to ${end.toLocaleString(DateTime.TIME_SIMPLE)}.`;
      }
    });
  }

  insertElement('beforeend', appointmentContainer, appointmentLabel);

  appointmentButtons(theme, appointmentContainer, info, appointment);

  /*
  If there are appointments on the screen will have a variability of showing text.  If it is an `Owner` viewing them, it will show the name of the person they are chatting with in the form of 'Video chat with [name] @ start time to end time'.  If it is an appointment the `Client` has nothing to do with, it will just say 'Video chat @ start time to end time.'  If they do have something to do with it, it will say 'Video Chat With `Owner` @ start time to end time.'
  
  */

  console.log(info.userType);

  console.log(DateTime.fromISO(appointment.appointmentStart));
  console.log(DateTime.fromISO(appointment.appointmentEnd));
  console.log(difference);

  insertElement('beforeend', container, appointmentContainer);
}

export { appointment };
