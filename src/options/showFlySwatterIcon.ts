import * as Types from "../types";

const showFlySwatterIcon = function (options:Types.options) {
  const { HIDE_POPUPS_AND_ADS, SHOW_FLYSWATTER_ICON } = options;
  let oldEl = document.getElementById('toggleFlySwatter');
  if (oldEl) {
    oldEl?.parentNode?.removeChild(oldEl);
  }
  if (SHOW_FLYSWATTER_ICON) {
    let newEl = document.createElement('div');
    newEl.id = 'toggleFlySwatter';
    newEl.innerHTML = `
      <img src="${chrome.runtime.getURL(
        `images/icons/flyswatter-${!!HIDE_POPUPS_AND_ADS ? 'on' : 'off'}.svg`
      )}" height="12px" class="${!!!HIDE_POPUPS_AND_ADS ? 'toggleFlySwatter-is-disabled' : ''}" />
    `;
    newEl.onclick = function () {
      chrome.runtime.sendMessage({
        action: 'set',
        key: 'HIDE_POPUPS_AND_ADS',
        value: !HIDE_POPUPS_AND_ADS,
      });
      if (!!HIDE_POPUPS_AND_ADS) {
        window.location.reload();
      }
      console.log('toggleFlySwatter onclick', !!HIDE_POPUPS_AND_ADS);
      return false;
    };
    window.document.body.appendChild(newEl);
  }
};
export default showFlySwatterIcon;
