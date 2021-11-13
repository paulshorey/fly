import * as React from 'react';

export const Popup = ({}) => {
  // each message
  const [messages, setMessages] = React.useState({});
  const handleNewMessage = (message) => {
    messages[message.key] = message.value;
    setMessages({ ...messages });
  };
  React.useEffect(() => {
    chrome.runtime.sendMessage({ action: 'get', key: '_bottomLeftButtons' });
    chrome.runtime.sendMessage({ action: 'get', key: '_hosts' });
    chrome.runtime.onMessage.addListener(handleNewMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleNewMessage);
    };
  }, []);

  // edit messages
  const onClick = ({}) => {
    console.log('onClick ' + key + ' messages in popup', {
      action: 'set',
      key,
      value: !value,
    });
    chrome.runtime.sendMessage({ action: 'set', key, value: !value });
  };
  return (
    <div>
      {/* <h3>host = {JSON.stringify(host)}</h3> */}
      <h3>messages = {JSON.stringify(messages)}</h3>
      {Object.entries(messages).map(([key, value]) => (
        <button
          onClick={() => {
            onClick(key, value);
          }}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default Popup;
