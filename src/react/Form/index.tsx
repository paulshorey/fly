import * as React from "react";
import * as Types from '../../types';

// interface PropsTypes {
//   options: (Types.options)
// }
// : React.FC<PropsTypes>

export const EnableFlyswatterIcon = () => {

  const [options, setOptions] = React.useState<Types.options>(Types.defaultOptions);
  React.useEffect(() => {
    // initially, get data
    for (let key in options) {
      chrome.storage.local.get(key, (result) => {
        options[key] = result[key] || options[key];
      });
    }
    setOptions({ ...options });
    // on update, set data
    chrome.runtime.onMessage.addListener((message) => {
      options[message.key] = message.value;
      setOptions({ ...options });
    });
  }, []);

  const onClick = (key: string) => {
    console.log('onClick ' + key + ' options in popup', { action: "set", key, value: !options[key] })
    chrome.runtime.sendMessage({ action: "set", key, value: !options[key] });
  };

  return (
    <div className="buttonContainer">
      <button className="snowButton" onClick={() => { onClick('_hidePopupsAndAds') }}>
        {options._hidePopupsAndAds ? "Remove annoying popups and ads" : "Ignore (ok to show) popups and ads"}
      </button>
      <button className="snowButton" onClick={() => { onClick('_showBottomLeftButtons') }}>
        {options._showBottomLeftButtons ? "Disable flyswatter icon" : "Enable flyswatter icon"}
      </button>
    </div>
  );
};

export default EnableFlyswatterIcon;