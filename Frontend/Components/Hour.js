import chroma from 'chroma-js';
import { DateTime } from 'luxon';
import { addClasses, insertElement } from '../Global/Utility';

function hour(theme, container, info, index) {
  const hour = document.createElement('section');
  addClasses(hour, ['schedule-it__display__schedule__planner__hour']);
  if ((info.scheduleIsOvernight === false && info.scheduleStart.hour > index) || (info.scheduleIsOvernight === false && info.scheduleEnd.hour <= index)) {
    addClasses(hour, ['disabled']);
  } else if (info.scheduleIsOvernight === true && index >= info.scheduleEnd.hour && index < info.scheduleStart.hour) {
    addClasses(hour, ['disabled']);
  }
  const style = hour.style;
  style.position = 'relative';
  style.height = '3em';
  style.minHeight = '3em';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'row wrap';
  style.justifyContent = 'flex-start';
  style.alignItems = 'flex-start';
  style.border = `.2rem solid ${chroma(theme.grayScale.raisinBlack).brighten(0.2)}80`;

  insertElement('beforeend', container, hour);

  const label = document.createElement('label');
  addClasses(label, ['schedule-it__display__schedule__planner__hour__label']);
  label.style.position = 'absolute';
  label.style.height = 'max-content';
  label.style.width = 'max-content';
  label.style.top = '1rem';
  label.style.left = '1rem';
  label.style.fontFamily = theme.text;
  label.style.fontSize = '.53em';
  // label.style.color = theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite;
  label.style.color = theme.tertiary;
  if (hour.classList.contains('disabled')) {
    label.style.color = theme.timeOfDay === 'day' ? theme.grayScale.offWhite : theme.grayScale.offWhite;
    label.style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.darkCharcoal}` : `${theme.grayScale.sonicSilver}`;
  } else if (!hour.classList.contains('disabled')) {
    label.style.color = theme.timeOfDay === 'day' ? theme.grayScale.raisinBlack : theme.grayScale.offWhite;
    label.style.backgroundColor = theme.timeOfDay === 'day' ? `${theme.grayScale.offWhite}` : `${theme.grayScale.darkCharcoal}`;
  }
  label.style.zIndex = 5;
  label.textContent = DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day, index, 0, 0).toLocaleString(DateTime.TIME_SIMPLE);
  insertElement('beforeend', hour, label);

  let start = 0;
  let numOfIntervals;
  if (theme.intervals === 15) {
    numOfIntervals = 4;
    while (start < numOfIntervals) {
      interval(theme, hour);
      start++;
    }
  } else if (theme.intervals === 30) {
    numOfIntervals = 2;
    while (start < numOfIntervals) {
      interval(theme, hour);
      start++;
    }
  }

  if (hour.classList.contains('disabled')) {
    style.backgroundColor = theme.timeOfDay === 'day' ? theme.grayScale.darkCharcoal : theme.grayScale.sonicSilver;
  }
}

function interval(theme, container) {
  const interval = document.createElement('div');
  addClasses(interval, ['schedule-it__display__schedule__planner__hour__interval']);
  const style = interval.style;
  style.position = 'relative';
  if (theme.intervals === 15) {
    style.height = '25%';
  } else if (theme.intervals === 30) {
    style.height = '50%';
  }
  style.width = '100%';
  style.borderLeft = `.2rem solid ${chroma(theme.grayScale.raisinBlack).brighten(0.2)}80`;
  style.borderRight = `.2rem solid ${chroma(theme.grayScale.raisinBlack).brighten(0.2)}80`;
  style.borderTop = `.1rem solid ${chroma(theme.grayScale.raisinBlack).brighten(0.2)}80`;
  style.borderBottom = `.1rem solid ${chroma(theme.grayScale.raisinBlack).brighten(0.2)}80`;

  if (theme.intervals === 15 || theme.intervals === 30) {
    insertElement('beforeend', container, interval);
  }
}

export { hour };
