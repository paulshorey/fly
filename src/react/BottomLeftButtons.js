import * as React from 'react';
import EditOptions from './EditOptions';

export const BottomLeftButtons = ({}) => {
  // each message
  const [messages, setMessages] = React.useState({});
  const handleNewMessage = (message) => {
    messages[message.key] = message.value;
    setMessages({ ...messages });
  };
  React.useEffect(() => {
    chrome.runtime.sendMessage({ key: '_bottomLeftButtons' });
    chrome.runtime.onMessage.addListener(handleNewMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleNewMessage);
    };
  }, []);

  // edit messages
  const onClick = ({}) => {
    chrome.runtime.sendMessage({
      action: 'set',
      key: '_bottomLeftButtons',
      value: !messages['_bottomLeftButtons'],
    });
  };
  return (
    <div>
      <button onClick={onClick}>...</button>
      <EditOptions />
    </div>
  );
};

export default BottomLeftButtons;
