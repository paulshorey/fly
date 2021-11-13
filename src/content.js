/*
 * Run on every page load. Gets value for the current host.
 * Uses that value to modify the site, and to build bottom/left buttons.
 * When click on bottom left button, it will update the message value and propagate that to popup and other tabs.
 * Types of messages:
 * 1. Controls:
 *    { key: _botomLeftButtons, value: true }
 *    { key: _hosts, value: {"paulshorey.com":{"popupBanners":true}} }
 * 2. Host:
 *    (on each site, specify which features to run. By default, all available features will be run)
 *    { key: "spiral.us", value: {"popupBanners":false} }
 *    { key: "independent.co.uk", value: {"popupBanners":true} }
 *    { key: "google.com", value: {"newTab":true, "moreResults":true} }
 *    { key: "amazon.com", value: {"productAds":true, "andSearch":true} }
 *    { key: "bing.com", value: {"andSearch":true} }
 */
import './content.scss';
import _bottomLeftButtons from './options/_bottomLeftButtons';

let host = {};
host.key = window.location.host.replace('www.', '');

chrome.runtime.sendMessage({ action: 'get', key: '_bottomLeftButtons' });
console.log('sendMessage get _bottomLeftButtons');

setTimeout(function () {
  chrome.runtime.sendMessage({ action: 'get', key: host.key });
  console.log('sendMessage get ' + host.key);
}, 500);

chrome.runtime.onMessage.addListener((message) => {
  console.log(`content message received: ${JSON.stringify(message)}`);
  /*
   * Control message:
   */
  if (message.key === '_bottomLeftButtons') {
    _bottomLeftButtons({ message });
    return;
  } else if (message.key[0] === '_') {
    return;
  }
  /*
   * Host message:
   */
  // only concerned about current site, ignore all other messages
  if (message.key !== host.key) return;
  // perform actions
  if (message.value) {
  }
  // // reload the page when value changes from TRUEthy to FALSEy
  // // because things on the page have been modified, need to be reset
  // if (host.value && message.value === null) {
  //   window.location.reload();
  //   return;
  // }
  // compare next time around
  host.value = message.value;
});
