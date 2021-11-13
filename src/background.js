import { chromeStorageLocalGet } from './lib/chromeStorageLocal';

/*
 * Starts on browser launch or on extension install.
 * Runs in background.
 * Syncs messages between popup and content.
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

const defaults = {
  _hosts: {},
  _bottomLeftButtons: true,
  _newTab: true,
  _moreResults: true,
  _popupBanners: true,
  _andSearch: true,
  _productAds: true,
};

const controls = {
  ...defaults,
};

const saveToControls = async (message) => {
  controls[message.key] = message.value;
};

const saveToHosts = async (host) => {
  controls._hosts[host.key] = host.value;
  syncMessage({ key: '_hosts', value: controls._hosts });
};

const syncHostValueKeys = (host) => {
  if (!host.value) {
    host.value = {};
  }
  switch (host.key) {
    case 'google.com':
      host.value = {
        ...{
          newTab: controls['_newTab'],
          moreResults: controls['_moreResults'],
        },
        ...host.value,
      };
      break;
    case 'amazon.com':
      host.value = {
        ...{
          productAds: controls['_productAds'],
          andSearch: controls['_andSearch'],
        },
        ...host.value,
      };
      break;
    case 'bing.com':
      host.value = {
        ...{
          andSearch: controls['_andSearch'],
        },
        ...host.value,
      };
      break;
    default:
      host.value = {
        ...{
          popupBanners: controls['_popupBanners'],
        },
        ...host.value,
      };
      break;
  }
};

const syncMessage = async (message = {}) => {
  if (!message.key) {
    return;
  }
  if (!('value' in message)) {
    // get value
    let value = await chromeStorageLocalGet(message.key);
    if (value === undefined || value === null) {
      value = defaults[message.key];
      if (value === undefined) {
        value = null;
      }
    } else {
      value = JSON.parse(value);
    }
    message.value = value;
  } else {
    // alert('save message value ' + JSON.stringify(message));
    // save value
    chrome.storage.local.set({
      key: message.key,
      value: JSON.stringify(message.value),
    });
  }
  // if host type
  if (message.key[0] !== '_' && message.key.includes('.')) {
    // update value
    syncHostValueKeys(message);
    saveToHosts(message);
  } else {
    // if control type
    saveToControls(message);
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
