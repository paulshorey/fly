import "./content.scss";
import * as Types from "./types";
import hidePopupsAndAds from "./options/hidePopupsAndAds"
import showFlySwatterIcon from "./options/showFlySwatterIcon"

console.log(`\n\n\nContent.ts file ran\n\n\n`);
const DEBUG1 = false; // which stuff to hide/show
const DEBUG2 = false; // localStorage/indexDB
const DEBUG3 = false; // buttons inside cookie banner
const DEBUG4 = false; // buttons inside cookie banner - advanced
const body = document.getElementsByTagName("body");

const options: Types.options = Types.defaultOptions;
chrome.runtime.sendMessage({ action: "get", key: "SHOW_FLYSWATTER_ICON" });
chrome.runtime.sendMessage({ action: "get", key: "HIDE_POPUPS_AND_ADS" });

chrome.runtime.onMessage.addListener((message) => {
  console.log(`\n\n\nContent.ts: message received: ${JSON.stringify(message)}`);
  options[message.key] = message.value;
  showFlySwatterIcon(options);
  
  switch (message.key) {
    case "HIDE_POPUPS_AND_ADS":
      if (message.value) {
        setTimeout(hidePopupsAndAds, 1000)
        setTimeout(hidePopupsAndAds, 2000)
        setTimeout(hidePopupsAndAds, 4000)
      } else {
        // window.location.reload();
      }
    break;
    default:
    break;
  }
});

