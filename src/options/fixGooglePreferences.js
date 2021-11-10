export default function fixGooglePreferences() {
  let buttons = window.document.querySelector('#form-buttons');
  if (buttons) {
    buttons.style.position = 'fixed';
    buttons.style.top = '78px';
  }
}
