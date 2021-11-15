import { chromeStorageLocalGet, chromeStorageLocalSet } from './lib/chromeStorageLocalAsync';

/*
 * Starts on browser launch or on extension install.
 * Runs in background.
 * Syncs messages between popup and content.
 * Types of messages:
 * 1. Controls:
 *    { key: _botomLeftButtons, value: true }
 *    { key: _hosts, value: {"paulshorey.com":{"_popups":true}} }
 * 2. Host:
 *    (on each site, specify which features to run. By default, all available features will be run)
 *    { key: "spiral.us", value: {"_popups":false} }
 *    { key: "independent.co.uk", value: {"_popups":true} }
 *    { key: "google.com", value: {"_ui":true, "_search":true} }
 *    { key: "amazon.com", value: {"_ads":true, "_search":true} }
 *    { key: "bing.com", value: {"_search":true} }
 */
const data = {
  get time() {
    return new Date().getHours() - 12 + ':' + new Date().getMinutes();
  },
};

const defaults = {
  _version: data.time,
  _hosts: null,
  _bottomLeftButtons: true,
  _ui: true,
  _popups: false,
  _search: true,
  _ads: true,
};

const updateControlsValue = (message) => {
  if (!('value' in message)) {
    message.status = 'updateControlsValue !value';
    if (message.key in defaults) {
      message.status = 'updateControlsValue default found ' + defaults[message.key];
      message.value = controls[message.key];
      return;
    }
  }
};
const updateHostValue = (host) => {
  host.status = 'updateHostValue';
  if (!host.value) {
    host.value = {};
  }
  /*
   * TODO - AUTOMATE THESE DOMAINS - GET FROM FILESYSTEM
   */
  switch (host.key) {
    case 'google.com':
      host.value = {
        ...{
          _ads: controls['_ads'],
          _search: controls['_search'],
          _ui: controls['_ui'],
        },
        ...host.value,
      };
      break;
    case 'amazon.com':
      host.value = {
        ...{
          _ads: controls['_ads'],
          _search: controls['_search'],
        },
        ...host.value,
      };
      break;
    case 'bing.com':
      host.value = {
        ...{
          _search: controls['_search'],
        },
        ...host.value,
      };
      break;
    default:
      host.value = {
        ...{
          _popups: controls['_popups'],
        },
        ...host.value,
      };
      break;
  }
};

const syncMessage = async (message = {}) => {
  alert(JSON.stringify(message));
  if (!message.key) {
    return;
  }
  if (message.key === '__reset') {
    chrome.storage.local.clear();
    controls = { ...defaults };
    for (let key in controls) {
      syncMessage({ key });
    }
    return;
  }
  if (!'value' in message) {
    await chromeStorageLocalGet(message);
  }
  // renew the message with new codebase stuff after getting from local storage
  if (message.key[0] === '_' && !message.key.includes('.')) {
    // type: control
    message.status = 'readMessage before updateControlsValue';
    updateControlsValue(message);
  } else {
    // type: host
    message.status = 'readMessage before updateHostValue';
    updateHostValue(message);
  }
  // save to local
  chromeStorageLocalSet({
    key: message.key,
    value: JSON.stringify(message.value),
  });
  // save to aggregate local (for popup)
  if (message.key[0] === '_' && !message.key.includes('.')) {
    saveToControls(message);
  } else {
    saveToHosts(message);
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
chrome.runtime.onMessage.addListener(syncMessage);

// This will be used by popup to read all controls and hosts - sendMessage({key: '_controls'})
const controls = {
  ...defaults,
};

const saveToHosts = async (host) => {
  if (!host || !host.key || !host.value) return;
  if (!controls._hosts) controls._hosts = {};
  controls._hosts[host.key] = host.value;
  syncMessage({ key: '_hosts', value: controls._hosts });
};

const saveToControls = async (message) => {
  if (!message || !message.key || !message.value) return;
  controls[message.key] = message.value;
};
