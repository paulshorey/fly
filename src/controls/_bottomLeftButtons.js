import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BottomLeftButtons from '../react/BottomLeftButtons';

/**
 * Enable the bottom left buttons
 * @param enabled {boolean} - enable or not
 */
export default function (enabled) {
  let el = document.querySelector('.saveTheWeb_bottomLeftButtons');

  // first run only
  if (!el) {
    el = document.createElement('div');
    el.classList.add('saveTheWeb_bottomLeftButtons');
    el.innerHTML = `X!D`;
    window.document.body.appendChild(el);
    ReactDOM.render(<BottomLeftButtons />, el);
  }

  // every run
  if (enabled) {
    el.classList.remove('saveTheWeb_disabled');
  } else {
    el.classList.add('saveTheWeb_disabled');
  }
}
