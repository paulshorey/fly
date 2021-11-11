export default function ({ _smodifyHost, host }) {
  let oldEl = document.querySelector('.modifyHost');

  if (!oldEl) {
    let newEl = document.createElement('div');
    newEl.classList.add('_modifyHost');
    newEl.innerHTML = `https:// ? ${host}`;
    window.document.body.appendChild(newEl);
  }

  if (!_modifyHost) {
    oldEl?.classList.add('_this_is_disabled');
  } else {
    oldEl?.classList.remove('_this_is_disabled');
  }
}
