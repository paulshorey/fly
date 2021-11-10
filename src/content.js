/*
 * Run on every page load
 * Gets message value of { key: host }
 * Uses that value to modify the site, and to build bottom/left buttons.
 * When click on bottom left button, it will update the message value and propagate that to popup and other tabs.
 *    message.key = site domain
 *    message.value = site settings (for now it's just true/false, to modify the site or not to)
 */
import './content.scss';
import _modifyHost from './lib/_modifyHost';

let messages = {};
let host = window.location.host.replace('www.', '');

chrome.runtime.sendMessage({ action: 'get', key: '_enableButtons' });
setTimeout(function () {
  chrome.runtime.sendMessage({ action: 'get', key: host });
}, 500);

chrome.runtime.onMessage.addListener((message) => {
  console.log(`content message received: ${JSON.stringify(message)}`);

  // save all messages, just in case, but especially for "_enableButtons"
  messages[message.key] = message.value;

  // modify host
  if (message.key === host) {
    // reload the page when disabling the plugin, because things on the page were modified, and need to be reset
    if (message.value === false && message.value !== messages[message.key]) {
      window.location.reload();
      return;
    }
    // if enabling the page, or running for the first time, continue to functionality
    _modifyHost({ host, _enableButtons: messages._enableButtons, settings: message.value });
  }
});
