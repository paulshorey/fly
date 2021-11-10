export default function fixGoogleSearch() {
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
