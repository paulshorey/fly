import * as React from 'react';

export const Form = () => {
  // read all options
  const [options, setOptions] = React.useState({});
  chrome.runtime.onMessage.addListener((message) => {
    console.log(`popup message received: ${JSON.stringify(message)}`);
    options[message.key] = message.value;
    setOptions({ ...options });
  });

  // edit options
  const onClick = (key, value) => {
    console.log('onClick ' + key + ' options in popup', {
      action: 'set',
      key,
      value: !value,
    });
    chrome.runtime.sendMessage({ action: 'set', key, value: !value });
  };
  return (
    <div className="formContainer">
      {Object.entries(options).map(([key, value]) => (
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

export default Form;
