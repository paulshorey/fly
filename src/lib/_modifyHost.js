export default function (_modifyHost) {
  let oldEl = document.querySelector('._modifyHost');

  if (!oldEl) {
    let newEl = document.createElement('div');
    newEl.classList.add('_modifyHost');
    window.document.body.appendChild(newEl);
  }

  if (!_modifyHost) {
    oldEl?.classList.add('_this_is_disabled');
  } else {
    oldEl?.classList.remove('_this_is_disabled');
  }
}
