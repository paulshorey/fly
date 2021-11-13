import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BottomLeftButtons from '../react/BottomLeftButtons';

export default function (enabled) {
  let el = document.querySelector('.saveTheWeb_bottomLeftButtons');

  if (!el) {
    el = document.createElement('div');
    el.classList.add('saveTheWeb_bottomLeftButtons');
    el.innerHTML = `X!D`;
    window.document.body.appendChild(el);
  }

  if (enabled) {
    el.classList.remove('saveTheWeb_disabled');
  } else {
    el.classList.add('saveTheWeb_disabled');
  }

  ReactDOM.render(<BottomLeftButtons />, el);
}
