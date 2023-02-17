import chroma from 'chroma-js';
import { addClasses, insertElement } from '../Global/Utility';

function hour(theme, container, info) {
  const hour = document.createElement('section');
  addClasses(hour, ['schedule-it__display__schedule__planner__hour']);
  const style = hour.style;
  style.position = 'relative';
  style.height = '3em';
  style.minHeight = '3em';
  style.width = '100%';
  style.display = 'flex';
  style.flexFlow = 'row wrap';
  style.justifyContent = 'flex-start';
  style.alignItems = 'flex-start';
  style.padding = '1rem';
  style.border = `.2rem solid ${chroma(theme.grayScale.raisinBlack).brighten(0.2)}80`;

  insertElement('beforeend', container, hour);
}

export { hour };
