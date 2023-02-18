import { addClasses, insertElement } from '../Global/Utility';

function loginFormLabel(theme, container) {
  const label = document.createElement('label');
  addClasses(label, ['schedule-it__form--login__user-login__label']);
  const style = label.style;
  style.position = 'relative';
  style.height = 'max-content';
  style.width = '70%';
  style.left = '1rem';
  style.margin = '.25rem 0';
  style.fontFamily = theme.text;
  style.fontSize = '.6em';
  insertElement('beforeend', container, label);
}

function communicationPreferenceLabel(value, theme, container, info) {
  const label = document.createElement('label');
  addClasses(label, ['schedule-it__form--request-appointment__flex-section__radio__label']);
  const style = label.style;
  style.position = 'relative';
  style.height = '3em';
  style.width = '40%';
  style.border = `.1em solid ${theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`}`;
  style.display = 'flex';
  style.flexFlow = 'row nowrap';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  style.fontFamily = theme.text;
  style.fontSize = '.7em';

  if (value.split(' ').join('').toLowerCase() === 'videochat') {
    style.borderRadius = '.5em 0 0 .5em';
  } else if (value.split(' ').join('').toLowerCase() === 'phonecall') {
    style.borderRadius = '0 .5em .5em 0';
  }

  label.textContent = value;

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
    console.log(radioFor);

    labels.forEach((l) => {
      const style = l.style;
      style.backgroundColor = 'transparent';
      style.border = `.1em solid ${theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`}`;
      style.color = theme.timeOfDay === 'day' ? `${theme.grayScale.raisinBlack}cc` : `${theme.grayScale.offWhite}cc`;
    });
    if (radioFor.checked === true) {
      style.backgroundColor = theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite;
      style.borderColor = theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite;
      style.color = theme.timeOfDay === 'day' ? theme.primary : theme.grayScale.secondary;
    }
  });

  insertElement('beforeend', container, label);
}

export { loginFormLabel, communicationPreferenceLabel };
