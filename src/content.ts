import "./content.scss";
import * as Types from "./types";
import _hidePopupsAndAds from "./options/_hidePopupsAndAds"
import _showBottomLeftButtons from "./lib/_showBottomLeftButtons"
import _fixGooglePreferences from "./options/_fixGooglePreferences"

const DEBUG1 = false; // which stuff to hide/show
const DEBUG2 = false; // localStorage/indexDB
const DEBUG3 = false; // buttons inside cookie banner
const DEBUG4 = false; // buttons inside cookie banner - advanced

const options: Types.options = {};
chrome.runtime.sendMessage({ action: "get", key: "_showBottomLeftButtons" });
setTimeout(function () {
  chrome.runtime.sendMessage({ action: "get", key: "_hidePopupsAndAds" });
  chrome.runtime.sendMessage({ action: "get", key: "_fixGooglePreferences" });
}, 1000);

chrome.runtime.onMessage.addListener((message) => {
  console.log(`content.ts message received: ${JSON.stringify(message)}`);
  
  switch (message.key) {
    case "_showBottomLeftButtons":
      _showBottomLeftButtons(message.value);
      break;
    case "_hidePopupsAndAds":
      if (message.value === false && options._hidePopupsAndAds === true) {
        window.location.reload();
      }
      _hidePopupsAndAds(message.value);
      break;
    case "_fixGooglePreferences":
      _fixGooglePreferences(message.value);
      break;
    default:
      break;
  }
  
  options[message.key] = message.value;
})
