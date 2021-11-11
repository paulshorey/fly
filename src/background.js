import { chromeStorageLocalGet } from './lib/chromeStorageLocal';

/*
 * Starts on browser launch or on extension install.
 * Runs in background.
 * Syncs messages between popup and content.
 *    message.key = site domain
 *    message.value = site settings (for now it's just true/false, to modify the site or not to)
 */

const _hosts = {};

const saveHosts = async (message) => {
  _hosts[message.key] = message.value;
  syncMessage({ key: '_hosts', value: _hosts });
};

const syncMessage = async (message = {}) => {
  if (!message.value) {
    // get value
    let value = await chromeStorageLocalGet(message.key);
    if (value) {
      message.value = JSON.parse(value);
    }
  } else {
    // set value
    chrome.storage.local.set({
      key: message.key,
      value: JSON.stringify(message.value),
    });
  }
  // if host
  if (message.key[0] === '_' && message.key.includes('.')) {
    saveHosts(message);
  }
  // to popup
  chrome.runtime.sendMessage(message);
  // to content
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  });
};

chrome.runtime.onMessage.addListener((message) => {
  syncMessage(message);
});
