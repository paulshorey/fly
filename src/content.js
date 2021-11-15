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
import _bottomLeftButtons from './controls/_bottomLeftButtons';
import _ads from './controls/_ads';
import _popups from './controls/_popups';
import _search from './controls/_search';
import _ui from './controls/_ui';
import * as objLib from './lib/obj';

const host = {};
host.key = window.location.host.replace('www.', '');

// trigger message
chrome.runtime.sendMessage({ key: '_version' });
chrome.runtime.sendMessage({ key: '_bottomLeftButtons' });
console.log('content sendMessage get control _bottomLeftButtons');
setTimeout(function () {
  chrome.runtime.sendMessage({ key: host.key });
  console.log('content sendMessage get host = ' + host.key);
}, 500);

// respond to message
chrome.runtime.onMessage.addListener((message) => {
  let consoleAction = 'log';
  if (message.value) {
    consoleAction = 'warn';
  }
  console[consoleAction](`message ${JSON.stringify(message)}`);
  if (message.key === '_bottomLeftButtons') {
    // contorl
    _bottomLeftButtons(!!message.value);
    return;
  } else if (message.key === host.key) {
    // host (loaded 500+ ms after control)
    _ads(objLib.objProp(message.value, '_ads', true));
    _popups(objLib.objProp(message.value, '_popups', true));
    _search(objLib.objProp(message.value, '_search', true));
    _ui(objLib.objProp(message.value, '_ui', true));
    return;
  }
});
