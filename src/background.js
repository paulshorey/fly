/*
 * Starts on browser launch or on extension install.
 * Runs in background.
 * Relays messages between popup and content.
 *    message.key = site domain
 *    message.value = site settings (for now it's just true/false, to modify the site or not to)
 */
import * as Types from './types';

const saveMessage = (message) => {
  if (!message.value) {
    // get value
    let msg = chrome.storage.local.get(message);
    if (msg) {
      message.value = JSON.parse(msg.value);
    }
  } else {
    // set value
    chrome.storage.local.set({
      key: message.key,
      value: JSON.stringify(message.value),
    });
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
  saveMessage(message);
});
