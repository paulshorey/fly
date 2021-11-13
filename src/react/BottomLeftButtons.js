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
    chrome.runtime.onMessage.addListener(handleNewMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleNewMessage);
    };
  }, []);

  // edit messages
  const onClick = ({}) => {};
  return <div>...</div>;
};

export default Popup;
