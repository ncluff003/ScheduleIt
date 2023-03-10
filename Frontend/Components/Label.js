import { addClasses, insertElement } from '../Global/Utility';

function loginFormLabel(theme, container) {
  // Parent Font Size: 3rem
  const label = document.createElement('label');
  addClasses(label, ['schedule-it__form--login__user-login__label']);
  const style = label.style;
  style.position = 'relative';
  style.height = 'max-content';
  style.width = '70%';
  style.left = '1em';
  style.margin = '.25em 0';
  style.fontFamily = theme.font;
  style.fontSize = '.6em'; // 1.8rem
  insertElement('beforeend', container, label);
}

function communicationPreferenceLabel(value, theme, container, info) {
  // Parent Font Size: 3rem
  const label = document.createElement('label');
  addClasses(label, ['schedule-it__form--request-appointment__flex-section__radio__label']);
  const style = label.style;
  style.position = 'relative';
  style.height = '3em';
  style.width = '40%';
  style.border = `.15em solid ${theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.raisinBlack}cc` : `${theme.colors.grayScale.raisinBlack}cc`}`;
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  style.fontFamily = theme.font;
  style.fontSize = '.7em'; // 2.1rem
  style.transition = 'background-color .5s, color .5s, border .5s';

  if (value.split(' ').join('').toLowerCase() === 'videochat' || value.split(' ').join('').toLowerCase() === 'videochat--update') {
    style.borderRadius = '.5em 0 0 .5em';
  } else if (value.split(' ').join('').toLowerCase() === 'phonecall' || value.split(' ').join('').toLowerCase() === 'phonecall--update') {
    style.borderRadius = '0 .5em .5em 0';
  }

  label.textContent = value;
  if (value === `Video Chat-- Update` || value === 'Phone Call-- Update') {
    label.textContent = value.replace('-- Update', '');
  }

  label.htmlFor = value.split(' ').join('').toLowerCase();

  label.addEventListener('mouseover', (e) => {
    e.preventDefault();
    style.cursor = 'pointer';
  });

  label.addEventListener('click', (e) => {
    e.preventDefault();
    const labels = document.querySelectorAll('.schedule-it__form--request-appointment__flex-section__radio__label');
    const radioFor = document.querySelector(`#${value.split(' ').join('').toLowerCase()}`);
    radioFor.checked = !radioFor.checked;

    labels.forEach((l) => {
      const style = l.style;
      style.backgroundColor = 'transparent';
      style.border = `.15em solid ${theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.raisinBlack}cc` : `${theme.colors.grayScale.raisinBlack}cc`}`;
      style.color = theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.raisinBlack}cc` : `${theme.colors.grayScale.raisinBlack}cc`;
    });

    if (radioFor.checked === true) {
      style.backgroundColor = theme.timeOfDay.setting === 'Day' ? theme.colors.tertiary : theme.colors.tertiary;
      style.borderColor = theme.timeOfDay.setting === 'Day' ? theme.colors.tertiary : theme.colors.tertiary;
      style.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.offWhite;
    }
  });

  insertElement('beforeend', container, label);
}

function characterCountLabel(theme, container, settings) {
  const label = document.createElement('label');
  addClasses(label, ['schedule-it__form--request-appointment__textarea__label']);
  const style = label.style;
  style.position = 'absolute';
  style.bottom = '-7em';
  style.right = '4.5em';
  style.fontFamily = theme.font;
  style.fontSize = '.53em';
  style.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.offWhite : theme.colors.grayScale.raisinBlack;
  style.backgroundColor = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.offWhite;
  style.borderRadius = '.5em';
  style.padding = '.5em';

  label.textContent = `Characters Left: ${
    settings.size === 'small' ? 500 : settings.size === 'medium' ? 1000 : settings.size === 'large' ? 2000 : settings.size === 'extra-large' ? 4000 : 'unknown'
  }`;

  insertElement('beforeend', container, label);
}

export { loginFormLabel, communicationPreferenceLabel, characterCountLabel };
