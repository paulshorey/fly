import showBottomLeftButton from './showBottomLeftButton';
const key = '_googleNewTab';
const label = 'newTab';

export default function (enabledGlobally) {
  let enabled = true;
  let host = window.location.host.replace('www.', '');

  if (!enabledGlobally || host !== 'google.com') {
    showBottomLeftButton({ key, disabledGlobally: true });
    return;
  }

  // do not run
  if (!enabled) {
    showBottomLeftButton({ key, enabled: false, label, host });
    return;
  }

  // run
  showBottomLeftButton({ key, enabled: true, label, host });
  _googleNewTab();
}

/*
 * Lib
 */
function _googleNewTab() {
  // open external links in new tab
  let links = Array.from(window.document.body.querySelectorAll('#search a'));
  for (let link of links) {
    if (!link.dataset.ved) continue;
    link.dataset.ved = '';
    link.removeAttribute('data-ved', '');
    link.removeAttribute('ping', '');
    link.setAttribute('target', '_blank');
  }
}
