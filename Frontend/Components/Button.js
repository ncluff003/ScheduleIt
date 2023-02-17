import axios from 'axios';
import qs from 'qs';
import { addClasses, insertElement } from '../Global/Utility';
import { renderSchedule } from './Schedule';

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
        const form = document.querySelector('.schedule-it__form--login');
        const loginContainer = document.querySelectorAll('.schedule-it__form--login__user-login')[1];
        const loginHeading = document.querySelectorAll('.schedule-it__form--login__heading')[1];
        const loginLabel = document.querySelectorAll('.schedule-it__form--login__user-login__label')[1];
        const loginInput = document.querySelectorAll('.schedule-it__form--login__user-login__input')[1];
        loginContainer.style.display = 'flex';
        loginHeading.firstChild.textContent = 'Client Login';
        loginLabel.textContent = 'Enter Email Address';
        loginInput.placeholder = 'Enter Email Address';
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
        console.log(info);
        let header = e.target.closest('.schedule-it__form--login').firstChild.firstChild;
        console.log(header.textContent);
        if (header.textContent === 'Owner Login') {
          console.log(document.querySelectorAll('.schedule-it__form--login__user-login__input')[0]);
          console.log(document.querySelectorAll('.schedule-it__form--login__user-login__input')[0].value);
          const token = document.querySelectorAll('.schedule-it__form--login__user-login__input')[0].value;
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
              console.log('Token Is Verified! 😄');
              renderSchedule(userType, theme, info);
            }
          } catch (error) {
            console.error(error);
          }

          /*
            * As soon as the token is verified, the following must be available.
            @ 1. Login Form goes away.
            @ 2. A login variable is stored in Local Storage with an expiration date. -- This is an eventuality, but for now, they will have to login in each time they navigate away.
            @ 3. The current day's schedule appears with the right elements available.
              ~ For Owners:
                ~ No Requesting Appointment Button
                ~ ALL appointments can be deleted, but NOT updated from the application.
              
              ~ For Clients
                ~ Only appointments that the client is a part of can be updated or deleted.

          */
        }
        let headerTwo = e.target.closest('.schedule-it__form--login').firstChild.nextSibling.firstChild;
        console.log(headerTwo.textContent);
        if (headerTwo.textContent === 'Client Login') {
          const email = document.querySelectorAll('.schedule-it__form--login__user-login__input')[1].value;
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
              console.log('Appointments Have Been Verified! 😄');
              renderSchedule(userType, theme, info);
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
    }
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
