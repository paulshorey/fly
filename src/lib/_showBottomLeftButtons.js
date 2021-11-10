export default function (_showBottomLeftButtons) {
  let oldEl = document.querySelector('._showBottomLeftButtons');

  if (!oldEl) {
    let newEl = document.createElement('div');
    newEl.classList.add('_showBottomLeftButtons');
    window.document.body.appendChild(newEl);
  }

  if (!_showBottomLeftButtons) {
    oldEl?.classList.add('_this_is_disabled');
  } else {
    oldEl?.classList.remove('_this_is_disabled');
  }
}
