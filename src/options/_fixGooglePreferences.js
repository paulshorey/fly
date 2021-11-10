import showBottomLeftButton from '../lib/showBottomLeftButton';
const key = '_fixGooglePreferences';
const label = 'G';

export default function (enabledGlobally) {
  if (!enabledGlobally) {
    showBottomLeftButton({ key, disabledGlobally: true });
    return;
  }

  let enabled = true;
  let host = window.location.host.replace('www.', '');

  if (enabled) {
    let local = window.localStorage.getItem(key + '-disable-' + host);
    if (typeof local === 'string') {
      enabled = !JSON.parse(local);
    } else {
      if (host.split('.').length > 2) {
        enabled = false;
      }
    }
  }

  // do not run
  if (!enabled) {
    showBottomLeftButton({ key, enabled: false, label, host });
    return;
  }

  // run
  showBottomLeftButton({ key, enabled: true, label, host });
  _fixGooglePreferences();
}

/*
 * Lib
 */
function _fixGooglePreferences() {
  // let buttons = window.document.querySelector('#form-buttons');
  // if (buttons) {
  //   buttons.style.position = 'fixed';
  //   buttons.style.top = '78px';
  // }
}
