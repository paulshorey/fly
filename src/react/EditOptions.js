import * as React from 'react';

export const Popup = ({}) => {
  // each message
  const [messages, setMessages] = React.useState({});
  const handleNewMessage = (message) => {
    messages[message.key] = message.value;
    setMessages({ ...messages });
  };
  const triggerMessages = () => {
    chrome.runtime.sendMessage({ key: '_bottomLeftButtons' });
    chrome.runtime.sendMessage({ key: '_hosts' });
    chrome.runtime.onMessage.addListener(handleNewMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleNewMessage);
    };
  };
  React.useEffect(triggerMessages, []);

  // edit messages
  const onClick = ({ key, value }) => {
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
            onClick({ key, value });
          }}
        >
          {key}
        </button>
      ))}
      <hr />
      <button
        onClick={() => {
          chrome.runtime.sendMessage({ key: '__reset' });
        }}
      >
        Clear local options
      </button>
    </div>
  );
};

export default Popup;
