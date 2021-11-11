/*
 * Run on every page load
 * Gets message value of { key: host }
 * Uses that value to modify the site, and to build bottom/left buttons.
 * When click on bottom left button, it will update the message value and propagate that to popup and other tabs.
 *    message.key = site domain
 *    message.value = site hostSettings (for now it's just true/false, to modify the site or not to)
 */
import './content.scss';
import _hosts from './lib/_hosts';
console.log('content.js loaded');

chrome.runtime.sendMessage({ action: 'get', key: '_hosts' });
console.log('sendMessage get _hosts');
setTimeout(function () {
  if (typeof window !== 'object') return;
  let host = window.location.host.replace('www.', '');
  chrome.runtime.sendMessage({ action: 'get', key: host });
}, 500);

chrome.runtime.onMessage.addListener((message) => {
  console.log(`content message received: ${JSON.stringify(message)}`);

  // save all options, just in case, but especially for "_hosts"
  options[message.key] = message.value;

  // modify host
  if (message.key === host) {
    // reload the page when disabling the plugin, because things on the page were modified, and need to be reset
    if (message.value === false && message.value !== options[message.key]) {
      window.location.reload();
      return;
    }
    // if enabling the page, or running for the first time, continue to functionality
    _hosts({ host, _hosts: options._hosts, hostSettings: message.value });
  }
});
