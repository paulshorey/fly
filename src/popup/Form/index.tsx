import * as React from "react";
import * as Types from '../../types';
// interface PropsTypes {
//   options: (Types.options)
// }
// : React.FC<PropsTypes>

/*

Get extension data (from database server || from chrome.storage.local )
Get site data ( from database server || from window.localStorage )

*/

export const EnableFlyswatterIcon = () => {

  const [options, setOptions] = React.useState<Types.options>(Types.defaultOptions);
  React.useEffect(() => {
    // initially, get data
    for (let key in options) {
      chrome.storage.local.get(key, (result) => {
        options[key] = result[key];
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
      {"_hidePopupsAndAds" in options && (
        <button onClick={() => { onClick('_hidePopupsAndAds') }}>
          Remove annoying popups and ads = <b>{JSON.stringify(options['_hidePopupsAndAds'])}</b>
        </button>
      )}
      {"_modifyHost" in options && (
        <button onClick={() => { onClick('_modifyHost') }}>
          Ok to show site-specific buttons in bottom left corner = <b>{JSON.stringify(options['_hidePopupsAndAds'])}</b>
        </button>
      )}
      <p>
        {JSON.stringify(options)}
      </p>
    </div>
  );
};

export default EnableFlyswatterIcon;