import axios from 'axios';
import qs from 'qs';
import { addClasses, insertElement } from '../Global/Utility';

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
    style.fontFamily = 'MADE Tommy Soft';
    style.fontSize = '.53em';
    theme.timeOfDay === 'day' ? (style.color = theme.grayScale.raisinBlack) : (style.color = theme.grayScale.offWhite);
    style.margin = '1rem 0';
    button.textContent = text;

    if (text === 'Owner Login') {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        user = 'Owner';
        const form = document.querySelector('.schedule-it__form--login');
        const loginHeading = document.querySelectorAll('.schedule-it__form--login__heading')[0];
        const loginLabel = document.querySelectorAll('.schedule-it__form--login__user-login__label')[0];
        const loginInput = document.querySelectorAll('.schedule-it__form--login__user-login__input')[0];
        loginHeading.firstChild.textContent = 'Owner Login';
        loginLabel.textContent = 'Enter Token';
        loginInput.placeholder = 'Enter Token';
        form.style.display = 'flex';

        const response = await axios({
          method: 'POST',
          url: `/ScheduleIt/Owners/${info.email}`,
          // data: qs.stringify(info),
          data: info,
        });
        console.log(response);
      });
    } else if (text === 'Client Login') {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        user = 'Client';
        const form = document.querySelector('.schedule-it__form--login');
        const loginHeading = document.querySelectorAll('.schedule-it__form--login__heading')[1];
        const loginLabel = document.querySelectorAll('.schedule-it__form--login__user-login__label')[1];
        const loginInput = document.querySelectorAll('.schedule-it__form--login__user-login__input')[1];
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
    style.fontFamily = 'MADE Tommy Soft';
    style.fontSize = '.53em';
    theme.timeOfDay === 'day' ? (style.color = theme.grayScale.raisinBlack) : (style.color = theme.grayScale.offWhite);
    style.margin = '0.3em';
    button.textContent = text;

    if (text === 'Close') {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const form = e.target.closest('.schedule-it__form--login');
        const style = form.style;
        style.display = 'none';
      });
    }
  }

  button.addEventListener('mouseover', (e) => {
    e.preventDefault();
    style.cursor = 'pointer';
    style.color = theme.timeOfDay === 'day' ? theme.grayScale.offWhite : theme.grayScale.raisinBlack;
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
