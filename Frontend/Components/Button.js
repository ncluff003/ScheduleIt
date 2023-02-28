import axios from 'axios';
import { DateTime } from 'luxon';
import { addClasses, insertElement, addError, renderErrors, calculateBuffer, calculateTime, resetForm } from '../Global/Utility';
import { renderSchedule } from './Schedule';
import { closeForm } from './FormCloser';
import { appointment } from './Appointment';
import { potentialAppointment } from './AppointmentRequest';

function button(buttonType, text, theme, container, details, schedule, info, user) {
  const button = document.createElement('button');
  const style = button.style;
  addClasses(button, ['schedule-it__button']);

  if (buttonType === 'primary--overlay') {
    // Parent Font Size: 3rem
    style.position = 'relative';
    style.height = '5rem';
    style.width = '20rem';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack}`;
    style.borderRadius = '1rem';
    style.fontFamily = theme.font;
    style.fontSize = '.53em'; // 1.59rem
    theme.timeOfDay.setting === 'Day' ? (style.color = theme.colors.grayScale.raisinBlack) : (style.color = theme.colors.grayScale.raisinBlack);
    style.margin = '1rem 0';
    button.textContent = text;

    if (text === 'Owner Login') {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        user = 'Owner';
        info.userType = `${user}s`;

        // FIRST THING IS TO FIND THE OWNER IF THEY EXIST
        try {
          const response = await axios({
            method: 'POST',
            url: `/ScheduleIt/Owners/${details.email}`,
            data: {
              details: details,
              schedule: schedule,
            },
          });
        } catch (error) {
          console.error(error);
        }

        // SECOND THING AFTER CLICKING THE BUTTON IS TO DELETE PAST APPOINTMENTS
        try {
          const response = await axios({
            method: 'DELETE',
            url: `/ScheduleIt/${info.userType}/${details.email}`,
          });
          info.userType = response.data.data.userType;
        } catch (error) {
          console.error(error);
        }

        // AFTER DELETING PAST APPOINTMENTS -- SETUP THE LOGIN FORM

        // Get each of the necessary elements.
        const form = document.querySelector('.schedule-it__form--login');
        const loginContainer = document.querySelectorAll('.schedule-it__form--login__user-login')[0];
        const loginHeading = document.querySelectorAll('.schedule-it__form--login__heading')[0];
        const loginLabel = document.querySelectorAll('.schedule-it__form--login__user-login__label')[0];
        const loginInput = document.querySelectorAll('.schedule-it__form--login__user-login__input')[0];
        const errorContainer = document.querySelectorAll('.error-container')[0];

        // Give essential styling to each element.
        loginContainer.style.display = 'flex';
        loginHeading.firstChild.textContent = 'Owner Login';
        loginLabel.textContent = 'Enter Token';
        loginInput.placeholder = 'Enter Token';
        form.style.display = 'flex';

        loginInput.setAttribute('minLength', 8);
        loginInput.setAttribute('pattern', '[A-Za-z0-9]');

        // Listen for each keyup event on the token input.
        loginInput.addEventListener('keyup', (e) => {
          e.preventDefault();
          if (loginInput.value.length !== 8) {
            info.errors = addError(info, 'token', 'Token given is not the correct length.');
            renderErrors(errorContainer, info.errors);
            if (loginInput.value.length === 0) {
              info.errors = addError(info, 'token', '');
              renderErrors(errorContainer, info.errors);
              delete info.errors.token;
            }
          } else if (/[A-Za-z0-9]+$/.test(loginInput.value) === true || loginInput.value === '') {
            info.errors = addError(info, 'token', '');
            renderErrors(errorContainer, info.errors);
            delete info.errors.token;
          } else if (/[A-Za-z0-9]+$/.test(loginInput.value) === false) {
            info.errors = addError(info, 'token', 'Tokens should only be numbers and letters.');
            renderErrors(errorContainer, info.errors);
          }
        });
      });
    } else if (text === 'Client Login') {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        user = 'Client';
        info.userType = user;

        // FIRST THING AFTER CLICKING THE BUTTON IS TO DELETE PAST APPOINTMENTS
        try {
          const response = await axios({
            method: 'DELETE',
            url: `/ScheduleIt/${info.userType}/${details.email}`,
          });
          info.userType = response.data.data.userType;
        } catch (error) {
          console.error(error);
        }

        // AFTER DELETING PAST APPOINTMENTS -- SETUP THE LOGIN FORM

        // Get each of the necessary elements.
        const form = document.querySelector('.schedule-it__form--login');
        const loginContainer = document.querySelectorAll('.schedule-it__form--login__user-login')[1];
        const loginHeading = document.querySelectorAll('.schedule-it__form--login__heading')[1];
        const loginLabel = document.querySelectorAll('.schedule-it__form--login__user-login__label')[1];
        const loginInput = document.querySelectorAll('.schedule-it__form--login__user-login__input')[1];
        const errorContainer = document.querySelectorAll('.error-container')[1];

        // Give essential styling to each element.
        form.style.display = 'flex';
        loginContainer.style.display = 'flex';
        loginHeading.firstChild.textContent = 'Client Login';
        loginLabel.textContent = 'Enter Email Address';
        loginInput.placeholder = 'Enter Email Address';
        loginInput.setAttribute('pattern', '[^@]+@[^@]+[.]+(com|net|org|io|edu|(co.uk)|me|tech|money|gov)+$');

        // Listen for each keyup event on the email input.
        loginInput.addEventListener('keyup', (e) => {
          e.preventDefault();
          if (/[^@]+@[^@]+[\.]+(com|net|org|io|edu|(co.uk)|me|tech|money|gov)+$/.test(loginInput.value) === true || loginInput.value === '') {
            info.errors = addError(info, 'email', '');
            renderErrors(errorContainer, info.errors);
            delete info.errors.email;
          } else if (/[^@]+@[^@]+[\.]+(com|net|org|io|edu|(co.uk)|me|tech|money|gov)+$/.test(loginInput.value) === false) {
            info.errors = addError(info, 'email', 'Please Provide A Valid Email Address');
            renderErrors(errorContainer, info.errors);
          }
        });
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
    style.border = `.2rem solid ${theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack}`;
    style.borderRadius = '1rem';
    style.fontFamily = theme.font;
    style.fontSize = '.53em'; // 1.59rem
    theme.timeOfDay.setting === 'Day' ? (style.color = theme.colors.grayScale.raisinBlack) : (style.color = theme.colors.grayScale.raisinBlack);
    style.margin = '0.3em';
    button.textContent = text;

    if (text === 'Login') {
      // Listen to login button for a click.
      button.addEventListener('click', async (e) => {
        e.preventDefault();

        // GET THE HEADERS FOR EACH LOGIN FORM.
        let header = e.target.closest('.schedule-it__form--login').firstChild.firstChild.nextSibling.firstChild;
        let headerTwo = e.target.closest('.schedule-it__form--login').firstChild.nextSibling.firstChild.nextSibling.firstChild;

        // IF HEADER'S TEXT CONTENT IS NOT AN EMPTY STRING AND IS OWNER LOGIN
        if (header.textContent !== '' && header.textContent === 'Owner Login') {
          // SELECT TOKEN INPUT AND GET TOKEN VALUE.
          const token = document.querySelectorAll('.schedule-it__form--login__user-login__input')[0].value;

          // RETURN IF TOKEN VALUE DOES NOT HAVE A LENGTH OF EIGHT.
          if (token.length !== 8) return;

          // IF TOKEN IS EXACTLY EIGHT CHARACTERS IN LENGTH, VERIFY IF IT IS THE ONE SENT TO THE OWNER.
          try {
            const response = await axios({
              method: 'POST',
              url: '/ScheduleIt/Token',
              data: {
                token: token,
                email: details.email,
              },
            });

            // GET THE REQUIRED DATA FOR THE OWNER TO BE ABLE TO MOVE ON.
            const status = response.data.status;
            const verified = response.data.data.tokenVerified;

            // IF EVERYTHING CHECKS OUT -- MOVE THE OWNER ON.
            if (status === 'Success' && verified === true) {
              // Get all of the essential elements.
              const form = document.querySelector('.schedule-it__form--login');
              const loginContainers = document.querySelectorAll('.schedule-it__form--login__user-login');
              const overlay = document.querySelector('.schedule-it__display__overlay--login');

              // Give essential styling to each element.
              form.style.display = 'none';
              loginContainers.forEach((container) => (container.style.display = 'none'));
              overlay.style.display = 'none';

              // Set the schedule's current appointments.
              schedule.appointments = response.data.data.currentAppointments;
              schedule.currentAppointments = response.data.data.currentAppointments;
              schedule.potentialAppointments = response.data.data.potentialAppointments;

              // RENDER SCHEDULE
              renderSchedule(info.userType, theme, details, schedule, info);

              // SELECT THE SCHEDULE NOW THAT IT IS RENDERED
              const planner = document.querySelector('.schedule-it__display__schedule__planner');

              // ADD THE APPOINTMENTS TO THE SCHEDULE
              schedule.currentAppointments.forEach((app) => {
                appointment(theme, planner, details, schedule, info, app);
              });
            }
          } catch (error) {
            console.error(error);
          }
        }

        // IF HEADER TWO'S TEXT CONTENT IS NOT AN EMPTY STRING AND IS CLIENT LOGIN
        if (headerTwo.textContent !== '' && headerTwo.textContent === 'Client Login') {
          // GET ESSENTIAL ELEMENTS
          const errorContainer = document.querySelectorAll('.error-container')[0];

          // GET THE EMAIL ELEMENT AND STORE IT'S VALUE
          const email = document.querySelectorAll('.schedule-it__form--login__user-login__input')[1].value;

          // IF EMAIL IS NOT IN CORRECT FORMAT SHOW AN ERROR.
          if (/[^@]+@[^@]+[\.]+(com|net|org|io|edu|(co.uk)|me|tech|money|gov)+$/.test(email) === false) {
            info.errors = addError(info, 'email', 'Please provide a valid email address.');
            return renderErrors(errorContainer, info.errors);
          } else {
            // IF EMAIL IS IN CORRECT FORMAT ERASE THE ERRORS.
            info.errors = addError(info, 'email', '');
            renderErrors(errorContainer, info.errors);

            // SET THE EMAIL AS THE CLIENT EMAIL
            info.clientEmail = email;

            // GET THE CURRENT DAY'S APPOINTMENTS
            try {
              const response = await axios({
                method: 'POST',
                url: `/ScheduleIt/Client/${details.email}/Appointments/Date`,
                data: {
                  ownerEmail: details.email,
                  selectedDate: DateTime.now().toISO(),
                  userType: 'Client',
                },
              });

              // SET ESSENTIAL DATA IF RESPONSE IS SUCCESSFUL
              schedule.currentAppointments = response.data.data.currentAppointments;

              // GET ESSENTIAL ELEMENTS
              const form = document.querySelector('.schedule-it__form--login');
              const loginContainers = document.querySelectorAll('.schedule-it__form--login__user-login');
              const overlay = document.querySelector('.schedule-it__display__overlay--login');

              // GIVE EACH ELEMENT IT'S STYLING
              form.style.display = 'none';
              loginContainers.forEach((container) => (container.style.display = 'none'));
              overlay.style.display = 'none';

              // RENDER SCHEDULE
              renderSchedule(info.userType, theme, details, schedule, info);

              // SELECT THE SCHEDULE NOW THAT IT IS RENDERED
              const planner = document.querySelector('.schedule-it__display__schedule__planner');

              // ADD APPOINTMENTS TO THE SCHEDULE
              schedule.currentAppointments.forEach((app) => {
                appointment(theme, planner, details, schedule, info, app);
              });
            } catch (error) {
              console.error(error);
            }
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
    // Parent Font Size: 3rem
    addClasses(button, ['in-app']);
    style.position = 'relative';
    style.height = '4rem';
    style.width = 'max-content';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.padding = '.5em 1em';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.offWhite}`;
    style.borderRadius = '2rem';
    style.fontFamily = theme.font;
    style.fontSize = '.53em'; // 1.59rem
    theme.timeOfDay.setting === 'Day' ? (style.color = theme.colors.grayScale.raisinBlack) : (style.color = theme.colors.grayScale.offWhite);
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
      });
    } else if (text === 'Appointment Requests') {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const form = document.querySelector('.schedule-it__form--appointment-requests');
        const style = form.style;
        style.display = 'flex';
        const header = document.querySelector('.schedule-it__form--appointment-requests__heading');
        header.textContent = `Potential Appointments`;

        const potentialAppointments = [...document.querySelectorAll('.potential-appointment')];
        potentialAppointments.forEach((child) => {
          child.remove();
        });

        schedule.potentialAppointments.forEach((appointment) => {
          potentialAppointment(theme, form, details, schedule, appointment, info, info.userType);
        });
      });
    }
  } else if (buttonType === 'Date Selection') {
    // Parent Font Size: 3rem
    style.position = 'relative';
    style.height = '5rem';
    style.width = 'max-content';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.padding = '.5em 1em';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack}`;
    style.borderRadius = '2rem';
    style.fontFamily = theme.font;
    style.fontSize = '.53em'; // 1.59rem
    theme.timeOfDay.setting === 'Day' ? (style.color = theme.colors.grayScale.raisinBlack) : (style.color = theme.colors.grayScale.raisinBlack);
    style.margin = '0.3em';
    button.textContent = text;

    button.addEventListener('click', async (e) => {
      e.preventDefault();

      // GET ALL ESSENTIAL ELEMENTS.
      const date = document.querySelector('.schedule-it__display__schedule__header__date__text');
      const dateSelects = document.querySelectorAll('.schedule-it__form--date-selection__select-container__select');

      // GET ALL ESSENTIAL VALUES.
      const year = Number(dateSelects[2].value);
      const month = Number(dateSelects[1].value);
      const day = Number(dateSelects[0].value);
      const selectedDate = DateTime.local(year, month, day, 23, 59, 59);

      // IF SELECTED DATE IS IN THE PAST RETURN ERROR.
      if (selectedDate < DateTime.now()) return console.error('You need to select today or a day in the future.');

      // GO GET THE SELECTED DATE'S APPOINTMENTS
      try {
        const response = await axios({
          method: 'POST',
          url: `/ScheduleIt/${info.userType}/${details.email}/Appointments/Date`,
          data: {
            userType: info.userType,
            ownerEmail: details.email,
            // clientEmail: info.clientEmail,
            selectedDate: selectedDate.toISO(),
          },
        });

        // GIVE ELEMENTS THE DATE DATA IN A SPECIFIC FORMAT
        date.textContent = selectedDate.toLocaleString(DateTime.DATE_HUGE);
        date.dataset.date = selectedDate.toISO();

        // SELECT ALL OF THE APPOINTMENTS ON THE PAGE CURRENTLY
        const appointments = document.querySelectorAll('.schedule-it__display__schedule__planner__appointment');
        const planner = document.querySelector('.schedule-it__display__schedule__planner');

        // REMOVE ALL OF THE EXISTING APPOINTMENT INFO ON THE DOM
        appointments.forEach((child) => child.remove());

        // STORE ARRAY OF SELECTED DATE'S APPOINTMENTS.
        const currentAppointments = response.data.data.currentAppointments;

        // RENDER APPOINTMENTS TO THE SCHEDULE
        currentAppointments.forEach((app) => {
          appointment(theme, planner, details, schedule, info, app);
        });
      } catch (error) {
        console.error(error);
      }

      // CLOSE THE FORM WHEN DONE.
      closeForm(document.querySelector('.schedule-it__form__close'), 'select-date');
    });
  } else if (buttonType === 'Request Appointment') {
    // Parent Font Size: 3rem
    style.position = 'relative';
    style.height = '5rem';
    style.width = 'max-content';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.padding = '.5em 1em';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack}`;
    style.borderRadius = '2rem';
    style.fontFamily = theme.font;
    style.fontSize = '.53em'; // 1.59rem
    theme.timeOfDay.setting === 'Day' ? (style.color = theme.colors.grayScale.raisinBlack) : (style.color = theme.colors.grayScale.raisinBlack);
    style.margin = '0.6em 0.3em';
    button.textContent = text;

    button.addEventListener('click', async (e) => {
      e.preventDefault();

      // GET ESSENTIAL ELEMENTS
      const appointments = document.querySelectorAll('.schedule-it__display__schedule__planner__appointment');
      const inputs = document.querySelectorAll('.schedule-it__form--request-appointment__input');
      const textareas = document.querySelectorAll('.schedule-it__form--request-appointment__textarea');
      const selects = document.querySelectorAll('.schedule-it__form--date-selection__select-container__select');
      const radios = document.querySelectorAll('.schedule-it__form--request-appointment__flex-section__radio');
      const requestRadios = [radios[0], radios[1]];

      // GET VALUES FROM THOSE ELEMENTS
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

      // GET USABLE MINIMUM AND MAXIMUM APPOINTMENT LENGTHS.
      const minTime = calculateTime(schedule.minimumAppointmentLength);
      const maxTime = calculateTime(schedule.maximumAppointmentLength);

      // GET THE POTENTIAL CLIENT'S COMMUNICATION PREFERENCE.
      requestRadios.forEach((radio) => {
        if (radio.checked === true) {
          communicationPreference = radio.value;
        }
      });

      // IF NO FIRST NAME RETURN ERROR
      if (!firstname || firstname === '') {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'Please provide your first name.');
        return renderErrors(errorContainer, info.errors);
      }

      // IF NO LAST NAME RETURN ERROR
      if (!lastname || lastname === '') {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'Please provide last name.');
        return renderErrors(errorContainer, info.errors);
      }

      // IF NO EMAIL RETURN ERROR
      if (!email || email === '') {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'Please provide email address.');
        return renderErrors(errorContainer, info.errors);
      }

      // IF NO PHONE NUMBER RETURN ERROR
      if (!phone || phone === '') {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'Please provide your phone number.');
        return renderErrors(errorContainer, info.errors);
      }

      // IF NO COMMUNICATION PREFERENCE RETURN ERROR
      if (!communicationPreference || communicationPreference === '') {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'Please provide your preference for communications.');
        return renderErrors(errorContainer, info.errors);
      }

      // IF NO MESSAGE RETURN ERROR
      if (!message || message === '') {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'Please send a message or put N/A if nothing to say.');
        return renderErrors(errorContainer, info.errors);
      }

      // GET THE APPOINTMENT'S POTENTIAL START AND END TIMES.
      let appointmentStart = DateTime.local(DateTime.fromISO(date).year, DateTime.fromISO(date).month, DateTime.fromISO(date).day, startHour, startMinute, 0);
      let appointmentEnd = DateTime.local(DateTime.fromISO(date).year, DateTime.fromISO(date).month, DateTime.fromISO(date).day, endHour, endMinute, 0);

      // GET THE REQUESTED APPOINTMENT'S LENGTH.
      const difference = appointmentEnd.diff(appointmentStart, ['days', 'hours', 'minutes']).toObject();

      // IF THE SCHEDULE IS AN OVERNIGHT SCHEDULE -- CHECK IF REQUESTED APPOINTMENT IS ONE.
      // IF APPOINTMENT IS OVERNIGHT, ADD ONE DAY TO THE END DATE.
      if (schedule.overnight === true && Number(appointmentEnd.hour) < Number(appointmentStart.hour)) {
        appointmentEnd = appointmentEnd.plus({ days: 1 });
      }

      // IF DIFFERENCE MINUTES ARE LESS THAN THE MINIMUM APPOINTMENT LENGTH OF MINUTES DIG DEEPER
      if (difference.minutes < minTime.minutes) {
        // IF DIFFERENCE HOURS ARE LESS THAN MINIMUM APPOINTMENT LENGTH OF HOURS AND THE DIFFERENCE OF DAYS IS ZERO RETURN ERROR.
        if (difference.hours < minTime.hours && difference.days === 0) {
          const errorContainer = document.querySelectorAll('.error-container')[3];
          info.errors = addError(
            info,
            'appointment',
            `Appointments must be at least ${minTime.hours} hour${minTime.hours > 1 ? 's' : ''} and ${minTime.minutes} in length.`,
          );
          return renderErrors(errorContainer, info.errors);
        }
      }

      // IF DIFFERENCE HOURS ARE EQUAL TO THE MAXIMUM APPOINTMENT'S LENGTH OF HOURS DIG DEEPER
      if (difference.hours === maxTime.hours) {
        // IF THE DIFFERENCE MINUTES ARE ALSO ABOVE THE MAXIMUM APPOINTMENT'S LENGTH OF MINUTES RETURN ERROR.
        if (difference.minutes > maxTime.minutes) {
          const errorContainer = document.querySelectorAll('.error-container')[3];
          info.errors = addError(
            info,
            'appointment',
            `Appointments must not be longer than ${maxTime.hours} hour${maxTime.hours > 1 ? 's' : ''} and ${maxTime.minutes} in length.`,
          );
          return renderErrors(errorContainer, info.errors);
        }
        // IF DIFFERENCE HOURS ARE MORE THAN THE MAXIMUM APPOINTMENT'S LENGTH OF HOURS RETURN ERROR.
      } else if (difference.hours > maxTime.hours) {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(
          info,
          'appointment',
          `Appointments must not be longer than ${maxTime.hours} hour${maxTime.hours > 1 ? 's' : ''} and ${maxTime.minutes} in length.`,
        );
        return renderErrors(errorContainer, info.errors);
      }

      // FILTER THE DAY'S APPOINTMENTS TO SEE IF THERE ARE ANY CONFLICTS.
      const conflictingAppointments = [...appointments].filter((appointment) => {
        if (
          (appointmentStart >= DateTime.fromISO(appointment.dataset.start) && appointmentStart < DateTime.fromISO(appointment.dataset.end)) ||
          (appointmentEnd > DateTime.fromISO(appointment.dataset.start) && appointmentEnd <= DateTime.fromISO(appointment.dataset.end))
        ) {
          return appointment;
        }
      });

      // IF THERE ARE CONFLICTING APPOINTMENTS RETURN ERROR
      if (conflictingAppointments.length > 0) {
        const errorContainer = document.querySelectorAll('.error-container')[3];
        info.errors = addError(info, 'appointment', 'There is a conflict with the time of an existing appointment.');
        return renderErrors(errorContainer, info.errors);
      }

      // IF THERE ARE NO CONFLICTS FORMAT THE REQUEST.
      const request = {
        ownerEmail: details.email,
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

      // MAKE THE REQUEST
      try {
        const response = await axios({
          method: 'POST',
          url: `/ScheduleIt/Client/${details.email}/Appointments`,
          data: request,
        });
        response;
      } catch (error) {
        console.error(error);
      }
      const errorContainer = document.querySelectorAll('.error-container')[3];
      resetForm(theme, schedule, document.querySelector('.schedule-it__form--request-appointment'), info.errors, errorContainer);
    });
  } else if (buttonType === 'Request Appointment Update') {
    // Parent Font Size: 3rem
    style.position = 'relative';
    style.height = '2.5em';
    style.width = 'max-content';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.padding = '.5em 1em';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack}`;
    style.borderRadius = '1rem';
    style.fontFamily = theme.font;
    style.fontSize = '.45em'; // 1.35rem
    theme.timeOfDay === 'day' ? (style.color = theme.colors.grayScale.raisinBlack) : (style.color = theme.colors.grayScale.raisinBlack);
    style.margin = '0.6em 0.3em';
    button.textContent = text;

    button.addEventListener('click', async (e) => {
      e.preventDefault();

      const appointment = e.target.closest('.schedule-it__display__schedule__planner__appointment');
      info.appointment = appointment.dataset.appointment;
      const form = document.querySelector('.schedule-it__form--update-appointment');
      form.style.display = 'flex';

      const startHourValue = Number(document.querySelector('.third-hour').value);
      const endHourValue = Number(document.querySelector('.fourth-hour').value);
      const startMinuteValue = Number(document.querySelector('.third-minute').value);
      const endMinuteValue = Number(document.querySelector('.fourth-minute').value);
      const startMeridiemValue = document.querySelector('.third-meridiem');
      const endMeridiemValue = document.querySelector('.fourth-meridiem');

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

      const formHeaders = document.querySelectorAll('.schedule-it__form--request-appointment__heading');
      const formHeader = formHeaders[1].firstChild;
      formHeader.textContent = 'Request Appointment Update';
      formHeader.dataset.current = appointment.dataset.appointment;
      formHeader.style.textAlign = 'center';
      formHeader.style.marginBottom = '1em';
    });
  } else if (buttonType === 'Update Appointment') {
    // Parent Font Size: 3rem
    style.position = 'relative';
    style.height = '3.5em';
    style.width = 'max-content';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.padding = '.5em 1em';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack}`;
    style.borderRadius = '1rem';
    style.fontFamily = theme.font;
    style.fontSize = '.45em'; // 1.35rem
    theme.timeOfDay.setting === 'Day' ? (style.color = theme.colors.grayScale.raisinBlack) : (style.color = theme.colors.grayScale.raisinBlack);
    style.margin = '0.6em 0.3em';
    button.textContent = text;

    button.addEventListener('click', async (e) => {
      e.preventDefault();

      // GET ESSENTIAL ELEMENTS
      const formHeading = document.querySelectorAll('.schedule-it__form--request-appointment__heading');
      const inputs = document.querySelectorAll('.schedule-it__form--request-appointment__input');
      const textareas = document.querySelectorAll('.schedule-it__form--request-appointment__textarea');
      const selects = document.querySelectorAll('.schedule-it__form--date-selection__select-container__select');
      const radios = document.querySelectorAll('.schedule-it__form--request-appointment__flex-section__radio');
      const updateRadios = [radios[2], radios[3]];

      // GET THE VALUES FROM THOSE ELEMENTS
      const date = document.querySelector('.schedule-it__display__schedule__header__date__text').dataset.date;
      const day = Number(selects[7].value);
      const month = Number(selects[8].value);
      const year = Number(selects[9].value);
      const firstname = inputs[4].value;
      const lastname = inputs[5].value;
      const startHour = Number(selects[10].value);
      const startMinute = Number(selects[11].value);
      const endHour = Number(selects[12].value);
      const endMinute = Number(selects[13].value);
      const email = inputs[6].value;
      const phone = inputs[7].value;
      let communicationPreference;
      const message = textareas[1].value;

      updateRadios.forEach((radio) => {
        if (radio.checked === true) {
          communicationPreference = radio.value;
        }
      });

      // GET THE DATE THAT THE CLIENT SELECTED
      const selectedDate = DateTime.local(year, month, day);

      // GET USABLE MINIMUM AND MAXIMUM APPOINTMENT LENGTHS.
      const minTime = calculateTime(schedule.minimumAppointmentLength);
      const maxTime = calculateTime(schedule.maximumAppointmentLength);

      // DOUBLE CHECK THE SELECTED DATE FOR THE UPDATE IS NOT IN THE PAST
      if (DateTime.now().day === selectedDate.day) {
        if (selectedDate.day < DateTime.now().day) {
          const errorContainer = document.querySelectorAll('.error-container')[4];
          info.errors = addError(info, 'appointment', 'Please do not select a date in the past.');
          return renderErrors(errorContainer, info.errors);
        }
      } else if (DateTime.now().day === selectedDate.day) {
        if (selectedDate < DateTime.now()) {
          const errorContainer = document.querySelectorAll('.error-container')[4];
          info.errors = addError(info, 'appointment', 'Please do not select a date in the past.');
          return renderErrors(errorContainer, info.errors);
        }
      }

      // GETTING THE SELECTED DATE'S CURRENT APPOINTMENTS
      try {
        const response = await axios({
          method: 'POST',
          url: `/ScheduleIt/${info.userType}/${details.email}/Appointments/Date`,
          data: {
            userType: info.userType,
            ownerEmail: details.email,
            selectedDate: selectedDate.toISO(),
          },
        });

        // STORE THE CURRENT APPOINTMENTS IN A VARIABLE
        const currentAppointments = response.data.data.currentAppointments;

        // IF NO FIRST NAME RETURN ERROR
        if (!firstname || firstname === '') {
          const errorContainer = document.querySelectorAll('.error-container')[4];
          info.errors = addError(info, 'appointment', 'Please provide your first name.');
          return renderErrors(errorContainer, info.errors);
        }

        // IF NO LAST NAME RETURN ERROR
        if (!lastname || lastname === '') {
          const errorContainer = document.querySelectorAll('.error-container')[4];
          info.errors = addError(info, 'appointment', 'Please provide last name.');
          return renderErrors(errorContainer, info.errors);
        }

        // IF NO EMAIL RETURN ERROR
        if (!email || email === '') {
          const errorContainer = document.querySelectorAll('.error-container')[4];
          info.errors = addError(info, 'appointment', 'Please provide email address.');
          return renderErrors(errorContainer, info.errors);
        }

        // IF NO PHONE NUMBER RETURN ERROR
        if (!phone || phone === '') {
          const errorContainer = document.querySelectorAll('.error-container')[4];
          info.errors = addError(info, 'appointment', 'Please provide your phone number.');
          return renderErrors(errorContainer, info.errors);
        }

        // IF NO COMMUNICATION PREFERENCE RETURN ERROR
        if (!communicationPreference || communicationPreference === '') {
          const errorContainer = document.querySelectorAll('.error-container')[4];
          info.errors = addError(info, 'appointment', 'Please provide your preference for communications.');
          return renderErrors(errorContainer, info.errors);
        }

        // IF NO MESSAGE RETURN ERROR
        if (!message || message === '') {
          const errorContainer = document.querySelectorAll('.error-container')[4];
          info.errors = addError(info, 'appointment', 'Please send a message or put N/A if nothing to say.');
          return renderErrors(errorContainer, info.errors);
        }

        // GET THE APPOINTMENT'S POTENTIAL START AND END TIMES.
        let appointmentStart = DateTime.local(year, month, day, startHour, startMinute, 0);
        let appointmentEnd = DateTime.local(year, month, day, endHour, endMinute, 0);

        // GET THE REQUESTED APPOINTMENT'S LENGTH.
        const difference = appointmentEnd.diff(appointmentStart, ['days', 'hours', 'minutes']).toObject();

        // IF THE SCHEDULE IS AN OVERNIGHT SCHEDULE -- CHECK IF REQUESTED APPOINTMENT IS ONE.
        // IF APPOINTMENT IS OVERNIGHT, ADD ONE DAY TO THE END DATE.
        if (schedule.overnight === true && Number(appointmentEnd.hour) < Number(appointmentStart.hour)) {
          appointmentEnd = appointmentEnd.plus({ days: 1 });
        }

        // IF DIFFERENCE MINUTES ARE LESS THAN THE MINIMUM APPOINTMENT LENGTH OF MINUTES DIG DEEPER
        if (difference.minutes < minTime.minutes) {
          // IF DIFFERENCE HOURS ARE LESS THAN MINIMUM APPOINTMENT LENGTH OF HOURS AND THE DIFFERENCE OF DAYS IS ZERO RETURN ERROR.
          if (difference.hours < minTime.hours && difference.days === 0) {
            const errorContainer = document.querySelectorAll('.error-container')[3];
            info.errors = addError(
              info,
              'appointment',
              `Appointments must be at least ${minTime.hours} hour${minTime.hours > 1 ? 's' : ''} and ${minTime.minutes} in length.`,
            );
            return renderErrors(errorContainer, info.errors);
          }
        }

        // IF DIFFERENCE HOURS ARE EQUAL TO THE MAXIMUM APPOINTMENT'S LENGTH OF HOURS DIG DEEPER
        if (difference.hours === maxTime.hours) {
          // IF THE DIFFERENCE MINUTES ARE ALSO ABOVE THE MAXIMUM APPOINTMENT'S LENGTH OF MINUTES RETURN ERROR.
          if (difference.minutes > maxTime.minutes) {
            const errorContainer = document.querySelectorAll('.error-container')[3];
            info.errors = addError(
              info,
              'appointment',
              `Appointments must not be longer than ${maxTime.hours} hour${maxTime.hours > 1 ? 's' : ''} and ${maxTime.minutes} in length.`,
            );
            return renderErrors(errorContainer, info.errors);
          }
          // IF DIFFERENCE HOURS ARE MORE THAN THE MAXIMUM APPOINTMENT'S LENGTH OF HOURS RETURN ERROR.
        } else if (difference.hours > maxTime.hours) {
          const errorContainer = document.querySelectorAll('.error-container')[3];
          info.errors = addError(
            info,
            'appointment',
            `Appointments must not be longer than ${maxTime.hours} hour${maxTime.hours > 1 ? 's' : ''} and ${maxTime.minutes} in length.`,
          );
          return renderErrors(errorContainer, info.errors);
        }

        const appointmentId = formHeading[1].firstChild.dataset.current;

        const conflictingAppointments = [...currentAppointments].filter((appointment) => {
          const buffer = calculateBuffer(schedule.appointmentBuffer);
          const bufferAdjustedStart = DateTime.fromISO(appointment.appointmentStart).minus({ hours: buffer.hours, minutes: buffer.minutes }).toISO();
          const bufferAdjustedEnd = DateTime.fromISO(appointment.appointmentEnd).plus({ hours: buffer.hours, minutes: buffer.minutes }).toISO();

          if (String(appointment._id) !== appointmentId) {
            if (
              (appointmentStart >= DateTime.fromISO(bufferAdjustedStart) && appointmentStart < DateTime.fromISO(bufferAdjustedEnd)) ||
              (appointmentEnd > DateTime.fromISO(bufferAdjustedStart) && appointmentEnd < DateTime.fromISO(bufferAdjustedEnd)) ||
              appointmentStart === DateTime.fromISO(bufferAdjustedStart && appointmentEnd === DateTime.fromISO(bufferAdjustedEnd)) ||
              (appointmentStart >= DateTime.fromISO(appointment.appointmentEnd) && appointmentStart < DateTime.fromISO(bufferAdjustedEnd)) ||
              (appointmentEnd > DateTime.fromISO(bufferAdjustedStart) && appointmentEnd <= DateTime.fromISO(appointment.appointmentStart))
            ) {
              return appointment;
            }
          }
        });

        if (conflictingAppointments.length > 0) {
          const errorContainer = document.querySelectorAll('.error-container')[4];
          info.errors = addError(info, 'appointment', 'There is a conflict with the time of an existing appointment.');
          return renderErrors(errorContainer, info.errors);
        } else if (conflictingAppointments.length === 0) {
          const request = {
            ownerEmail: details.email,
            firstname: firstname,
            lastname: lastname,
            clientEmail: email,
            clientPhone: phone,
            appointment: {
              appointmentType: communicationPreference.replace('-- Update', ''),
              dateRequested: DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now(date).day, 0, 0, 0).toISO(),
              appointmentStart: appointmentStart.toISO(),
              appointmentEnd: appointmentEnd.toISO(),
            },
            message: message,
          };

          try {
            const response = await axios({
              method: 'POST',
              url: `/ScheduleIt/Client/${details.email}/Appointments/${appointmentId}`,
              data: request,
            });
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
      const errorContainer = document.querySelectorAll('.error-container')[4];
      resetForm(theme, schedule, document.querySelector('.schedule-it__form--update-appointment'), info.errors, errorContainer);
    });
  } else if (buttonType === 'Delete Appointment') {
    style.position = 'relative';
    style.height = '2.5em';
    style.width = 'max-content';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.padding = '.5em 1em';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack}`;
    style.borderRadius = '1rem';
    style.fontFamily = theme.font;
    style.fontSize = '.45em';
    theme.timeOfDay.setting === 'Day' ? (style.color = theme.colors.grayScale.raisinBlack) : (style.color = theme.colors.grayScale.raisinBlack);
    style.margin = '0.6em 0.3em';
    button.textContent = text;

    if (text === 'Delete') {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        const appointment = e.target.closest('.schedule-it__display__schedule__planner__appointment');
        const appointmentId = appointment.dataset.appointment;

        try {
          const response = await axios({
            method: 'DELETE',
            url: `/ScheduleIt/${info.userType}/${details.email}/Appointments/${appointmentId}/${details.email}`,
          });

          appointment.remove();
        } catch (error) {
          console.error(error);
        }
      });
    }
  } else if (buttonType === 'potential-appointment') {
    style.position = 'relative';
    style.height = '2.5em';
    style.width = 'max-content';
    style.display = 'flex';
    style.flexFlow = 'row nowrap';
    style.justifyContent = 'center';
    style.alignItems = 'center';
    style.padding = '.5em 1em';
    style.backgroundColor = 'transparent';
    style.border = `.2rem solid ${theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack}`;
    style.borderRadius = '1rem';
    style.fontFamily = theme.font;
    style.fontSize = '.45em';
    theme.timeOfDay.setting === 'Day' ? (style.color = theme.colors.grayScale.raisinBlack) : (style.color = theme.colors.grayScale.raisinBlack);
    style.margin = '0.6em 0.3em';
    button.textContent = text;

    if (text === 'Accept') {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        const potentialApp = e.target.closest('.potential-appointment');
        try {
          const response = await axios({
            method: 'PATCH',
            url: `/ScheduleIt/${info.userType}/${details.info}/Appointments/${potentialApp.dataset.appointment}`,
            data: {
              email: details.email,
              appointmentId: potentialApp.dataset.appointment,
            },
          });

          const form = document.querySelector('.schedule-it__form--appointment-requests');

          const potentialAppointments = [...document.querySelectorAll('.potential-appointment')];
          potentialAppointments.forEach((child) => {
            child.remove();
          });

          const appointments = [...document.querySelectorAll('.schedule-it__display__schedule__planner__appointment')];
          appointments.forEach((child) => child.remove());

          schedule.potentialAppointments = response.data.data.potentialAppointments;
          schedule.potentialAppointments.forEach((appointment) => {
            potentialAppointment(theme, form, details, schedule, appointment, info, info.userType);
          });

          const planner = document.querySelector('.schedule-it__display__schedule__planner');
          schedule.currentAppointments = response.data.data.currentAppointments;
          schedule.currentAppointments.forEach((app) => {
            appointment(theme, planner, details, schedule, info, app);
          });
        } catch (error) {
          console.error(error);
        }
      });
    } else if (text === 'Decline') {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        const potentialApp = e.target.closest('.potential-appointment');
        try {
          const response = await axios({
            method: 'POST',
            url: `/ScheduleIt/${info.userType}/${details.info}/Appointments/${potentialApp.dataset.appointment}/Decline`,
            data: {
              email: details.email,
              appointmentId: potentialApp.dataset.appointment,
            },
          });

          const form = document.querySelector('.schedule-it__form--appointment-requests');

          const potentialAppointments = [...document.querySelectorAll('.potential-appointment')];
          potentialAppointments.forEach((child) => {
            child.remove();
          });

          schedule.potentialAppointments = response.data.data.potentialAppointments;
          schedule.potentialAppointments.forEach((appointment) => {
            potentialAppointment(theme, form, details, schedule, appointment, info, info.userType);
          });
        } catch (error) {
          console.error(error);
        }
      });
    } else if (text === 'Accept Update') {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        const potentialApp = e.target.closest('.potential-appointment');

        try {
          const response = await axios({
            method: 'POST',
            url: `/ScheduleIt/${info.userType}/${details.info}/Appointments/${potentialApp.dataset.appointment}/Update`,
            data: {
              email: details.email,
              appointmentId: potentialApp.dataset.appointment,
            },
          });

          const form = document.querySelector('.schedule-it__form--appointment-requests');

          const potentialAppointments = [...document.querySelectorAll('.potential-appointment')];
          potentialAppointments.forEach((child) => {
            child.remove();
          });

          const appointments = [...document.querySelectorAll('.schedule-it__display__schedule__planner__appointment')];
          appointments.forEach((child) => child.remove());

          schedule.potentialAppointments = response.data.data.potentialAppointments;
          schedule.potentialAppointments.forEach((appointment) => {
            potentialAppointment(theme, form, details, schedule, appointment, info, info.userType);
          });

          const planner = document.querySelector('.schedule-it__display__schedule__planner');
          schedule.currentAppointments = response.data.data.currentAppointments;
          schedule.currentAppointments.forEach((app) => {
            appointment(theme, planner, details, schedule, info, app);
          });
        } catch (error) {
          console.error(error);
        }
      });
    } else if (text === 'Decline Update') {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        const potentialApp = e.target.closest('.potential-appointment');
        try {
          const response = await axios({
            method: 'PATCH',
            url: `/ScheduleIt/${info.userType}/${details.info}/Appointments/${potentialApp.dataset.appointment}/Decline`,
            data: {
              email: details.email,
              appointmentId: potentialApp.dataset.appointment,
            },
          });

          const form = document.querySelector('.schedule-it__form--appointment-requests');

          const potentialAppointments = [...document.querySelectorAll('.potential-appointment')];
          potentialAppointments.forEach((child) => {
            child.remove();
          });

          schedule.potentialAppointments = response.data.data.potentialAppointments;
          schedule.potentialAppointments.forEach((appointment) => {
            potentialAppointment(theme, form, details, schedule, appointment, info, info.userType);
          });
        } catch (error) {
          console.error(error);
        }
      });
    }
  }

  button.addEventListener('mouseover', (e) => {
    e.preventDefault();
    style.cursor = 'pointer';
    style.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.offWhite;
    style.backgroundColor = theme.colors.secondary;
    style.borderColor = theme.colors.secondary;
    style.transition = 'background-color .5s, color .5s, border .5s';
  });

  button.addEventListener('mouseout', (e) => {
    e.preventDefault();
    style.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack;
    style.backgroundColor = 'transparent';
    style.borderColor = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.raisinBlack;
    if (button.classList.contains('in-app')) {
      style.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.offWhite;
      style.borderColor = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.offWhite;
    }
    style.transition = 'background-color .5s, color .5s, border .5s';
  });

  insertElement('beforeend', container, button);
}

export { button };
