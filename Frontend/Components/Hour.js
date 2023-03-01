import chroma from 'chroma-js';
import { DateTime } from 'luxon';
import { addClasses, insertElement } from '../Global/Utility';

function hour(theme, container, details, schedule, info, index) {
  // Parent Font Size: 3rem
  const hour = document.createElement('section');
  addClasses(hour, ['schedule-it__display__schedule__planner__hour']);
  if ((schedule.overnight === false && schedule.start.hour > index) || (schedule.overnight === false && schedule.end.hour <= index)) {
    addClasses(hour, ['disabled']);
  } else if (schedule.overnight === true && index >= schedule.end.hour && index < schedule.start.hour) {
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
  style.border = `.05em solid ${chroma(theme.colors.grayScale.raisinBlack).brighten(0.2)}80`;

  insertElement('beforeend', container, hour);

  const label = document.createElement('label');
  addClasses(label, ['schedule-it__display__schedule__planner__hour__label']);
  label.style.position = 'absolute';
  label.style.height = 'max-content';
  label.style.width = 'max-content';
  label.style.top = '.5em';
  label.style.left = '.5em';
  label.style.fontFamily = theme.font;
  label.style.fontSize = '.53em'; // 1.59rem
  label.style.color = theme.colors.tertiary;
  if (hour.classList.contains('disabled')) {
    label.style.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.offWhite : theme.colors.grayScale.offWhite;
    label.style.backgroundColor = theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.darkCharcoal}` : `${theme.colors.grayScale.sonicSilver}`;
  } else if (!hour.classList.contains('disabled')) {
    label.style.color = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.raisinBlack : theme.colors.grayScale.offWhite;
    label.style.backgroundColor = theme.timeOfDay.setting === 'Day' ? `${theme.colors.grayScale.offWhite}` : `${theme.colors.grayScale.darkCharcoal}`;
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
    style.backgroundColor = theme.timeOfDay.setting === 'Day' ? theme.colors.grayScale.darkCharcoal : theme.colors.grayScale.sonicSilver;
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
  style.borderLeft = `.1em solid ${chroma(theme.colors.grayScale.raisinBlack).brighten(0.2)}80`;
  style.borderRight = `.05em solid ${chroma(theme.colors.grayScale.raisinBlack).brighten(0.2)}80`;
  style.borderTop = `.05em solid ${chroma(theme.colors.grayScale.raisinBlack).brighten(0.2)}80`;
  style.borderBottom = `.1em solid ${chroma(theme.colors.grayScale.raisinBlack).brighten(0.2)}80`;

  if (theme.intervals === 15 || theme.intervals === 30) {
    insertElement('beforeend', container, interval);
  }
}

export { hour };
