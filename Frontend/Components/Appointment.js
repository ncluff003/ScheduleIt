import axios from 'axios';
import { DateTime, Duration } from 'luxon';
import { addClasses, calculateBuffer, insertElement } from '../Global/Utility';
import { appointmentButtons } from './Container';

function appointment(theme, container, details, schedule, info, appointment) {
  const currentDateISO = document.querySelector('.schedule-it__display__schedule__header__date__text').dataset.date;
  const currentDate = DateTime.fromISO(currentDateISO);
  const dayStart = DateTime.local(currentDate.year, currentDate.month, currentDate.day, 0, 0, 0);
  const dayEnd = DateTime.local(currentDate.year, currentDate.month, currentDate.day, 23, 59, 59);

  const buffer = calculateBuffer(schedule.appointmentBuffer);
  console.log(buffer);

  const originalStart = DateTime.fromISO(appointment.appointmentStart);
  const originalEnd = DateTime.fromISO(appointment.appointmentEnd);

  appointment.appointmentStart = DateTime.fromISO(appointment.appointmentStart).minus({ hours: buffer.hours, minutes: buffer.minutes }).toISO();
  appointment.appointmentEnd = DateTime.fromISO(appointment.appointmentEnd).plus({ hours: buffer.hours, minutes: buffer.minutes }).toISO();

  const start = DateTime.fromISO(appointment.appointmentStart);
  const end = DateTime.fromISO(appointment.appointmentEnd);

  const exampleHour = document.querySelectorAll('.schedule-it__display__schedule__planner__hour')[0];
  const hourHeight = exampleHour.getBoundingClientRect().height;
  const minuteHeight = exampleHour.getBoundingClientRect().height / 60;
  const appointmentContainer = document.createElement('div');
  addClasses(appointmentContainer, ['schedule-it__display__schedule__planner__appointment']);
  const style = appointmentContainer.style;
  appointmentContainer.dataset.appointment = appointment._id;
  appointmentContainer.dataset.start = appointment.appointmentStart;
  appointmentContainer.dataset.end = appointment.appointmentEnd;
  style.position = 'absolute';
  let difference, totalHeight;
  if (start > dayStart && end < dayEnd) {
    difference = end.diff(start, ['days', 'hours', 'minutes']).toObject();
    totalHeight = difference.hours * hourHeight + difference.minutes * minuteHeight;
    style.top = `${hourHeight * start.hour + start.minute * minuteHeight}px`;
  } else if (start < dayStart && end < dayEnd) {
    difference = end.diff(dayStart, ['days', 'hours', 'minutes']).toObject();
    totalHeight = difference.hours * hourHeight + difference.minutes * minuteHeight;
    style.top = `0px`;
  } else if (start > dayStart && end > dayEnd) {
    difference = dayEnd.diff(start, ['days', 'hours', 'minutes']).toObject();
    totalHeight = difference.hours * hourHeight + difference.minutes * minuteHeight;
    style.top = `${hourHeight * start.hour + start.minute * minuteHeight}px`;
  }
  style.height = `${totalHeight}px`;
  style.width = '100%';
  style.backgroundColor = `${theme.colors.primary}f2`;
  style.display = 'flex';
  style.flexFlow = 'row wrap';
  style.justifyContent = 'flex-start';
  style.alignItems = 'flex-start';
  style.padding = '1em .25em .25em 3em';
  style.borderBottom = `.075em groove ${
    theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.raisinBlack}cc` : `${theme.colors.grayScale.offWhite}cc`
  }`;
  style.overflowY = 'auto';

  const appointmentLabel = document.createElement('label');
  addClasses(appointmentLabel, ['schedule-it__display__schedule__planner__appointment__label']);
  const labelStyle = appointmentLabel.style;
  labelStyle.fontFamily = theme.font;
  labelStyle.fontSize = '.425em';
  labelStyle.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack;

  if (info.userType === 'Owners') {
    appointmentLabel.textContent = `${appointment.appointmentType.split(' ')[0]} ${appointment.appointmentType.split(' ')[1].toLowerCase()} with ${
      appointment.attendees[1].attendeeFirstname
    } ${appointment.attendees[1].attendeeLastname} from ${originalStart.toLocaleString(DateTime.TIME_SIMPLE)} to ${originalEnd.toLocaleString(
      DateTime.TIME_SIMPLE,
    )}.`;
  } else if (info.userType === 'Client') {
    appointmentLabel.textContent = `${appointment.appointmentType.split(' ')[0]} ${appointment.appointmentType
      .split(' ')[1]
      .toLowerCase()} from ${originalStart.toLocaleString(DateTime.TIME_SIMPLE)} to ${originalEnd.toLocaleString(DateTime.TIME_SIMPLE)}.`;
    appointment.attendees.forEach((person) => {
      if (person.attendeeEmail === info.clientEmail) {
        appointmentLabel.textContent = `${appointment.appointmentType.split(' ')[0]} ${appointment.appointmentType.split(' ')[1].toLowerCase()} with ${
          appointment.attendees[0].attendeeFirstname
        } ${appointment.attendees[0].attendeeLastname} from ${originalStart.toLocaleString(DateTime.TIME_SIMPLE)} to ${originalEnd.toLocaleString(
          DateTime.TIME_SIMPLE,
        )}.`;
      }
    });
  }

  insertElement('beforeend', appointmentContainer, appointmentLabel);

  appointmentButtons(theme, appointmentContainer, details, schedule, info, appointment);

  /*
  If there are appointments on the screen will have a variability of showing text.  If it is an `Owner` viewing them, it will show the name of the person they are chatting with in the form of 'Video chat with [name] @ start time to end time'.  If it is an appointment the `Client` has nothing to do with, it will just say 'Video chat @ start time to end time.'  If they do have something to do with it, it will say 'Video Chat With `Owner` @ start time to end time.'
  
  */

  insertElement('beforeend', container, appointmentContainer);
}

export { appointment };
