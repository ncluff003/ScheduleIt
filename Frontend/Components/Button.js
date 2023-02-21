import axios from 'axios';
import qs from 'qs';
import { DateTime } from 'luxon';
import { addClasses, insertElement, addError, renderErrors } from '../Global/Utility';
import { renderSchedule } from './Schedule';
import { closeForm } from './FormCloser';
import { getTodaysAppointments } from '../Global/Methods.js/getCurrentAppointments';
import { appointment } from './Appointment';

function button(buttonType, text, theme, container, info, user) {
  const button = document.createElement('button');
  const style = button.style;
  addClasses(button, ['schedule-it__button']);

  if (buttonType === 'primary--overlay') {
    style.position = 'relative';
    style.height = '5rem';
    style.width = '20rem';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite}`;
    style.borderRadius = '1rem';
    style.fontFamily = theme.text;
    style.fontSize = '.53em';
    theme.timeOfDay === 'day' ? (style.color = theme.grayScale.raisinBlack) : (style.color = theme.grayScale.offWhite);
    style.margin = '1rem 0';
    button.textContent = text;

    if (text === 'Owner Login') {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        user = 'Owner';
        info.userType = `${user}s`;
        const form = document.querySelector('.schedule-it__form--login');
        const loginContainer = document.querySelectorAll('.schedule-it__form--login__user-login')[0];
        const loginHeading = document.querySelectorAll('.schedule-it__form--login__heading')[0];
        const loginLabel = document.querySelectorAll('.schedule-it__form--login__user-login__label')[0];
        const loginInput = document.querySelectorAll('.schedule-it__form--login__user-login__input')[0];
        loginContainer.style.display = 'flex';
        loginHeading.firstChild.textContent = 'Owner Login';
        loginLabel.textContent = 'Enter Token';
        loginInput.placeholder = 'Enter Token';
        form.style.display = 'flex';

        loginInput.setAttribute('minLength', 8);
        loginInput.setAttribute('pattern', '[A-Za-z0-9]');

        const errorContainer = document.querySelectorAll('.error-container')[0];

        loginInput.addEventListener('keyup', (e) => {
          e.preventDefault();
          if (loginInput.value.length !== 8) {
            info.errors = addError(info, 'token', 'Token given is not the correct length.');
            renderErrors(errorContainer, info.errors);
            if (loginInput.value.length === 0) {
              info.errors = addError(info, 'token', '');
              renderErrors(errorContainer, info.errors);
              delete info.errors['token'];
            }
          } else if (/[A-Za-z0-9]+$/.test(loginInput.value) === true || loginInput.value === '') {
            info.errors = addError(info, 'token', '');
            renderErrors(errorContainer, info.errors);
            delete info.errors['token'];
          } else if (/[A-Za-z0-9]+$/.test(loginInput.value) === false) {
            info.errors = addError(info, 'token', 'Tokens should only be numbers and letters.');
            renderErrors(errorContainer, info.errors);
          }
        });

        const response = await axios({
          method: 'POST',
          url: `/ScheduleIt/Owners/${info.email}`,
          data: info,
        });
        console.log(response);
      });
    } else if (text === 'Client Login') {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        user = 'Client';
        info.userType = user;
        const form = document.querySelector('.schedule-it__form--login');
        const loginContainer = document.querySelectorAll('.schedule-it__form--login__user-login')[1];
        const loginHeading = document.querySelectorAll('.schedule-it__form--login__heading')[1];
        const loginLabel = document.querySelectorAll('.schedule-it__form--login__user-login__label')[1];
        const loginInput = document.querySelectorAll('.schedule-it__form--login__user-login__input')[1];
        loginContainer.style.display = 'flex';
        loginHeading.firstChild.textContent = 'Client Login';
        loginLabel.textContent = 'Enter Email Address';
        loginInput.placeholder = 'Enter Email Address';

        const errorContainer = document.querySelectorAll('.error-container')[1];

        loginInput.addEventListener('keyup', (e) => {
          e.preventDefault();
          if (/[^@]+@[^@]+[\.]+(com|net|org|io|edu|(co.uk)|me|tech|money|gov)+$/.test(loginInput.value) === true || loginInput.value === '') {
            info.errors = addError(info, 'email', '');
            renderErrors(errorContainer, info.errors);
            delete info.errors['email'];
          } else if (/[^@]+@[^@]+[\.]+(com|net|org|io|edu|(co.uk)|me|tech|money|gov)+$/.test(loginInput.value) === false) {
            info.errors = addError(info, 'email', 'Please Provide A Valid Email Address');
            renderErrors(errorContainer, info.errors);
          }
        });

        loginInput.setAttribute('pattern', '[^@]+@[^@]+[.]+(com|net|org|io|edu|(co.uk)|me|tech|money|gov)+$');

        form.style.display = 'flex';
      });
    }
  } else if (buttonType === 'login--overlay') {
    style.position = 'relative';
    style.height = '4rem';
    style.width = '10rem';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite}`;
    style.borderRadius = '1rem';
    style.fontFamily = theme.text;
    style.fontSize = '.53em';
    theme.timeOfDay === 'day' ? (style.color = theme.grayScale.raisinBlack) : (style.color = theme.grayScale.offWhite);
    style.margin = '0.3em';
    button.textContent = text;

    if (text === 'Login') {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        let header = e.target.closest('.schedule-it__form--login').firstChild.nextSibling.firstChild;
        if (header.textContent === 'Owner Login') {
          const token = document.querySelectorAll('.schedule-it__form--login__user-login__input')[0].value;

          if (token.length !== 8) return;

          try {
            const response = await axios({
              method: 'POST',
              url: '/ScheduleIt/Token',
              data: {
                token: token,
                email: info.email,
              },
            });
            if (response.data.status === 'Success') {
              const userType = response.data.data.userType;
              const form = document.querySelector('.schedule-it__form--login');
              form.style.display = 'none';
              const loginContainers = document.querySelectorAll('.schedule-it__form--login__user-login');
              loginContainers.forEach((container) => (container.style.display = 'none'));
              const overlay = document.querySelector('.schedule-it__display__overlay--login');
              overlay.style.display = 'none';
              renderSchedule(userType, theme, info);
              info.appointments = response.data.data.currentAppointments;
              info.currentAppointments = response.data.data.currentAppointments;

              const schedule = document.querySelector('.schedule-it__display__schedule__planner');
              info.currentAppointments.forEach((app) => {
                appointment(theme, schedule, info, app);
              });
            }
          } catch (error) {
            console.error(error);
          }
        }
        let headerTwo = e.target.closest('.schedule-it__form--login').firstChild.nextSibling.firstChild.nextSibling.firstChild;
        if (headerTwo.textContent === 'Client Login') {
          const email = document.querySelectorAll('.schedule-it__form--login__user-login__input')[1].value;
          info.clientEmail = email;

          if (/[^@]+@[^@]+[\.]+(com|net|org|io|edu|(co.uk)|me|tech|money|gov)+$/.test(email) === false) return;

          try {
            const response = await axios({
              method: 'POST',
              url: '/ScheduleIt/Client/Appointments',
              data: {
                email: email,
                ownerEmail: info.email,
              },
            });
            console.log(response);
            if (response.data.status === 'Success') {
              const userType = response.data.data.userType;
              const form = document.querySelector('.schedule-it__form--login');
              form.style.display = 'none';
              const loginContainers = document.querySelectorAll('.schedule-it__form--login__user-login');
              loginContainers.forEach((container) => (container.style.display = 'none'));
              const overlay = document.querySelector('.schedule-it__display__overlay--login');
              overlay.style.display = 'none';
              renderSchedule(userType, theme, info);
              const { results, currentAppointments } = await getTodaysAppointments(info);
              info.appointments = currentAppointments;

              const schedule = document.querySelector('.schedule-it__display__schedule__planner');
              info.currentAppointments.forEach((app) => {
                appointment(theme, schedule, info, app);
              });
            }
          } catch (error) {
            console.error(error);
          }
        }
      });
    }

    if (text === 'Close') {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const form = e.target.closest('.schedule-it__form--login');
        const loginContainers = document.querySelectorAll('.schedule-it__form--login__user-login');
        const style = form.style;
        style.display = 'none';
        loginContainers.forEach((container) => (container.style.display = 'none'));
      });
    }
  } else if (buttonType === 'schedule-outside') {
    style.position = 'relative';
    style.height = '4rem';
    style.width = 'max-content';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.padding = '.5em 1em';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite}`;
    style.borderRadius = '2rem';
    style.fontFamily = theme.text;
    style.fontSize = '.53em';
    theme.timeOfDay === 'day' ? (style.color = theme.grayScale.raisinBlack) : (style.color = theme.grayScale.offWhite);
    style.margin = '0.3em';
    button.textContent = text;

    if (text === 'Select Date') {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const form = document.querySelector('.schedule-it__form--date-selection');
        form.style.display = 'flex';
        const formHeader = document.querySelector('.schedule-it__form--date-selection__heading').firstChild;
        formHeader.textContent = 'Select Date';
      });
    } else if (text === 'Request Appointment') {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const form = document.querySelector('.schedule-it__form--request-appointment');
        form.style.display = 'flex';
        const formHeader = document.querySelector('.schedule-it__form--request-appointment__heading').firstChild;
        formHeader.textContent = 'Request Appointment';

        const startHourValue = Number(document.querySelector('.first-hour').value);
        const endHourValue = Number(document.querySelector('.second-hour').value);
        const startMinuteValue = Number(document.querySelector('.first-minute').value);
        const endMinuteValue = Number(document.querySelector('.second-minute').value);
        const startMeridiemValue = document.querySelector('.first-meridiem');
        const endMeridiemValue = document.querySelector('.second-meridiem');

        startMeridiemValue.textContent = DateTime.local(
          DateTime.now().year,
          DateTime.now().month,
          DateTime.now().day,
          startHourValue,
          startMinuteValue,
          0,
        ).toFormat('a');
        endMeridiemValue.textContent = DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, endHourValue, endMinuteValue, 0).toFormat(
          'a',
        );

        console.log(info.appointments);
      });
    }
  } else if (buttonType === 'Date Selection') {
    style.position = 'relative';
    style.height = '5rem';
    style.width = 'max-content';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.padding = '.5em 1em';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite}`;
    style.borderRadius = '2rem';
    style.fontFamily = theme.text;
    style.fontSize = '.53em';
    theme.timeOfDay === 'day' ? (style.color = theme.grayScale.raisinBlack) : (style.color = theme.grayScale.offWhite);
    style.margin = '0.3em';
    button.textContent = text;

    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const form = document.querySelector('.schedule-it__form--date-selection');
      const date = document.querySelector('.schedule-it__display__schedule__header__date__text');
      const dateSelects = document.querySelectorAll('.schedule-it__form--date-selection__select-container__select');

      const year = Number(dateSelects[2].value);
      const month = Number(dateSelects[1].value);
      const day = Number(dateSelects[0].value);
      const yearIndex = Number(dateSelects[2].selectedIndex);
      const monthIndex = Number(dateSelects[1].selectedIndex);
      const dayIndex = Number(dateSelects[0].selectedIndex);
      console.log(year, month, day, yearIndex, monthIndex, dayIndex);
      const selectedDate = DateTime.local(year, month, day);

      if (selectedDate.day < DateTime.now().day) return console.error('You need to select today or a day in the future.');

      date.textContent = selectedDate.toLocaleString(DateTime.DATE_HUGE);
      date.dataset.date = selectedDate.toISO();

      try {
        const response = await axios({
          method: 'POST',
          url: `/ScheduleIt/${info.userType}/${info.email}/Appointments/Date`,
          data: {
            userType: info.userType,
            ownerEmail: info.email,
            clientEmail: info.clientEmail,
            selectedDate: selectedDate.toISO(),
          },
        });
        console.log(response);
        const appointments = document.querySelectorAll('.schedule-it__display__schedule__planner__appointment');
        appointments.forEach((child) => child.remove());
        const currentAppointments = response.data.data.currentAppointments;
        const schedule = document.querySelector('.schedule-it__display__schedule__planner');
        currentAppointments.forEach((app) => {
          appointment(theme, schedule, info, app);
        });
      } catch (error) {
        console.error(error);
      }

      closeForm(document.querySelector('.schedule-it__form__close'), 'select-date');
    });
  } else if (buttonType === 'Request Appointment') {
    style.position = 'relative';
    style.height = '5rem';
    style.width = 'max-content';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.padding = '.5em 1em';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite}`;
    style.borderRadius = '2rem';
    style.fontFamily = theme.text;
    style.fontSize = '.53em';
    theme.timeOfDay === 'day' ? (style.color = theme.grayScale.raisinBlack) : (style.color = theme.grayScale.offWhite);
    style.margin = '0.6em 0.3em';
    button.textContent = text;

    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const inputs = document.querySelectorAll('.schedule-it__form--request-appointment__input');
      const textareas = document.querySelectorAll('.schedule-it__form--request-appointment__textarea');
      const selects = document.querySelectorAll('.schedule-it__form--date-selection__select-container__select');
      const radios = document.querySelectorAll('.schedule-it__form--request-appointment__flex-section__radio');
      const firstname = inputs[0].value;
      const lastname = inputs[1].value;
      const email = inputs[2].value;
      const phone = inputs[3].value;
      let communicationPreference;
      const message = textareas[0].value;
      const date = document.querySelector('.schedule-it__display__schedule__header__date__text').dataset.date;
      const startHour = Number(selects[3].value);
      const startMinute = Number(selects[4].value);
      const endHour = Number(selects[5].value);
      const endMinute = Number(selects[6].value);

      radios.forEach((radio) => {
        if (radio.checked === true) {
          communicationPreference = radio.value;
        }
      });

      if (!communicationPreference || communicationPreference === '') {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'Please provide your preference for communications.');
        return renderErrors(errorContainer, info.errors);
      }

      if (!firstname || firstname === '') {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'Please provide your first name.');
        return renderErrors(errorContainer, info.errors);
      }

      if (!lastname || lastname === '') {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'Please provide last name.');
        return renderErrors(errorContainer, info.errors);
      }

      if (!email || email === '') {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'Please provide email address.');
        return renderErrors(errorContainer, info.errors);
      }

      if (!phone || phone === '') {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'Please provide your phone number.');
        return renderErrors(errorContainer, info.errors);
      }

      let appointmentStart = DateTime.local(DateTime.fromISO(date).year, DateTime.fromISO(date).month, DateTime.fromISO(date).day, startHour, startMinute, 0);
      let appointmentEnd = DateTime.local(DateTime.fromISO(date).year, DateTime.fromISO(date).month, DateTime.fromISO(date).day, endHour, endMinute, 0);

      const difference = appointmentEnd.diff(appointmentStart, ['days', 'hours', 'minutes']).toObject();

      if (info.scheduleIsOvernight === true && Number(appointmentEnd.hour) < Number(appointmentStart.hour)) {
        appointmentEnd = appointmentEnd.plus({ days: 1 });
      }

      if (difference.hours < 1 || difference.hours < info.minimumAppointmentLength) {
        console.log(info.errors);
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(
          info,
          'appointment',
          `Appointments must be at least ${info.minimumAppointmentLength} hour${info.minimumAppointmentLength > 1 ? 's' : ''} in length.`,
        );
        return renderErrors(errorContainer, info.errors);
      }

      if (difference.hours > info.maxAppointmentLength) {
        console.log(info.errors);
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(
          info,
          'appointment',
          `Appointments must not be longer than ${info.maxAppointmentLength} hour${info.maxAppointmentLength > 1 ? 's' : ''} in length.`,
        );
        return renderErrors(errorContainer, info.errors);
      }

      const appointments = document.querySelectorAll('.schedule-it__display__schedule__planner__appointment');

      console.log(appointments);
      appointments.forEach((appointment) => {
        console.log(appointment, appointment.dataset.start, appointment.dataset.end);
      });

      // const originalStart = DateTime.fromISO(appointment.appointmentStart);
      // const originalEnd = DateTime.fromISO(appointment.appointmentEnd);

      // appointment.appointmentStart = DateTime.fromISO(appointment.appointmentStart).minus({ hours: buffer.hours, minutes: buffer.minutes }).toISO();
      // appointment.appointmentEnd = DateTime.fromISO(appointment.appointmentEnd).plus({ hours: buffer.hours, minutes: buffer.minutes }).toISO();

      // const start = DateTime.fromISO(appointment.appointmentStart);
      // const end = DateTime.fromISO(appointment.appointmentEnd);

      const conflictingAppointments = [...appointments].filter((appointment) => {
        if (
          (appointmentStart > DateTime.fromISO(appointment.dataset.start) && appointmentStart < DateTime.fromISO(appointment.dataset.end)) ||
          (appointmentEnd > DateTime.fromISO(appointment.dataset.start) && appointmentEnd < DateTime.fromISO(appointment.dataset.end))
        ) {
          return appointment;
        }
      });

      console.log(conflictingAppointments);

      if (conflictingAppointments.length > 0) {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'There is a conflict with the time of an existing appointment.');
        return renderErrors(errorContainer, info.errors);
      }

      const request = {
        ownerEmail: info.email,
        firstname: firstname,
        lastname: lastname,
        clientEmail: email,
        clientPhone: phone,
        appointment: {
          appointmentType: communicationPreference,
          dateRequested: DateTime.local(DateTime.fromISO(date).year, DateTime.fromISO(date).month, DateTime.fromISO(date).day, 0, 0, 0).toISO(),
          appointmentStart: appointmentStart.toISO(),
          appointmentEnd: appointmentEnd.toISO(),
        },
        message: message,
      };
      console.log(request);

      try {
        const response = await axios({
          method: 'POST',
          url: `/ScheduleIt/Client/${info.email}/Appointments`,
          data: request,
        });
      } catch (error) {
        console.error(error);
      }
    });
  } else if (buttonType === 'Request Appointment Update') {
    style.position = 'relative';
    style.height = '2.5em';
    style.width = 'max-content';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.padding = '.5em 1em';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite}`;
    style.borderRadius = '1rem';
    style.fontFamily = theme.text;
    style.fontSize = '.45em';
    theme.timeOfDay === 'day' ? (style.color = theme.grayScale.raisinBlack) : (style.color = theme.grayScale.offWhite);
    style.margin = '0.6em 0.3em';
    button.textContent = text;
  } else if ((buttonType = 'Delete Appointment')) {
    style.position = 'relative';
    style.height = '2.5em';
    style.width = 'max-content';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.padding = '.5em 1em';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite}`;
    style.borderRadius = '1rem';
    style.fontFamily = theme.text;
    style.fontSize = '.45em';
    theme.timeOfDay === 'day' ? (style.color = theme.grayScale.raisinBlack) : (style.color = theme.grayScale.offWhite);
    style.margin = '0.6em 0.3em';
    button.textContent = text;
  }

  button.addEventListener('mouseover', (e) => {
    e.preventDefault();
    style.cursor = 'pointer';
    style.color = theme.timeOfDay === 'day' ? theme.primary : theme.primary;
    style.backgroundColor = theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite;
    style.transition = 'background-color .5s, color .5s, border .5s';
  });

  button.addEventListener('mouseout', (e) => {
    e.preventDefault();
    style.color = theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite;
    style.backgroundColor = 'transparent';
    style.transition = 'background-color .5s, color .5s, border .5s';
  });

  insertElement('beforeend', container, button);
}

export { button };
