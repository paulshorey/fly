export default function (_showBottomLeftButtons) {
  let oldEl = document.querySelector('._showBottomLeftButtons');

  if (!_showBottomLeftButtons) {
    if (oldEl) {
      oldEl?.parentElement?.removeChild(oldEl);
    }
    return;
  }

  if (!oldEl) {
    let newEl = document.createElement('div');
    newEl.classList.add('_showBottomLeftButtons');
    window.document.body.appendChild(newEl);
  }
}
