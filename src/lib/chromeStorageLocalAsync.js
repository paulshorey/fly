/**
 * Retrieve
 * @param {string} key
 */
export const chromeStorageLocalGet = async function (message) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(message, function (messageFromStorage) {
        message = { ...messageFromStorage, ...message };
        try {
          message.value = JSON.parse(message.value);
        } catch (e) {}
        if (
          typeof message.value === 'string' &&
          message.value[0] === '"' &&
          message.value[message.value.length - 1] === '"'
        ) {
          message.value = message.value.slice(1, -1);
        }
        if (message.value === 'undefined') delete message.value;
        if (message.value === 'null') message.value = null;
        if (message.value === 'true') message.value = true;
        if (message.value === 'false') message.value = false;
        resolve(message);
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

/**
 * Save
 * @param {*} obj
 */
export const chromeStorageLocalSet = async function (obj) {
  return new Promise((resolve, reject) => {
    try {
      if (typeof obj.value !== 'undefined' && typeof obj.value !== 'string') {
        obj.value = JSON.stringify(obj.value);
      }
      chrome.storage.local.set(obj, function () {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

/**
 * Removes
 * @param {string or array of string keys} keys
 */
export const chromeStorageLocalRemove = async function (keys) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.remove(keys, function () {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

export default {
  chromeStorageLocalGet,
  chromeStorageLocalSet,
  chromeStorageLocalRemove,
};
