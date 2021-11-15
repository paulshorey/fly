import googleFix from './hosts/google.com/_ui';

/*
 * Module
 */
let wasEnabled;
export default function _ui(enabled) {
  console.log('loaded _ui');
  // reload the page
  // when value changes from TRUEthy to FALSEy because things on the page have been modified
  if (wasEnabled === true && enabled === false) {
    window.location.reload();
    return;
  }
  wasEnabled = enabled;

  // do the things
  let host = window.location.host.replace('www.', '');
  if (host === 'google.com') {
    googleFix();
    return;
  } else {
    lib();
  }
}

/*
 * Lib
 */
function lib() {}
