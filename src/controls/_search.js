import googleFix from './hosts/google.com/_search';
import amazonFix from './hosts/amazon.com/_search';
import { library } from 'webpack';

/*
 * Module
 */
let wasEnabled;
export default function _search(enabled) {
  console.log('loaded _search');
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
  } else if (host === 'amazon.com') {
    amazonFix();
    return;
  } else {
    lib();
  }
}

/*
 * Lib
 */
function lib() {}
