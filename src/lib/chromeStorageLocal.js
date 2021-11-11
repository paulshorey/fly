/**
 * Retrieve object from Chrome's Local StorageArea
 * @param {string} key
 */
export const chromeStorageLocalGet = async function (key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(key, function (value) {
        resolve(value[key]);
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

/**
 * Save Object in Chrome's Local StorageArea
 * @param {*} obj
 */
export const chromeStorageLocalSet = async function (obj) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set(obj, function () {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

/**
 * Removes Object from Chrome Local StorageArea.
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
