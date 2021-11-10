export default function showBottomLeftButton({ key, enabled, label, host, disabledGlobally }) {
  let oldEl = window.document.querySelector('.' + key);
  oldEl?.parentNode?.removeChild(oldEl);
  if (!disabledGlobally) {
    let newEl = document.createElement('div');
    newEl.classList.add(key);
    if (!enabled) {
      newEl.classList.add('_this_is_disabled');
    }
    // newEl.innerHTML = `
    //     <img src="${chrome.runtime.getURL(
    //       `images/icons/flyswatter-${enabled ? 'on' : 'off'}.svg`
    //     )}" height="12px" />
    //   `;
    newEl.innerHTML = label;
    newEl.onclick = function () {
      window.localStorage.setItem(key + '-disable-' + host, enabled); // NOTE: disabled === !enabled
      if (!enabled) {
        // if enabling, no need to reload, because will run now immediately
        // just need to tell the browser extension to execute this module again
        chrome.runtime.sendMessage({ action: 'get', key });
      } else {
        // if disabling, need to reload page because page content (ads, popups) was lost when enabled
        window.location.reload();
      }
    };
    window.document.querySelector('._showBottomLeftButtons')?.appendChild(newEl);
  }
}
