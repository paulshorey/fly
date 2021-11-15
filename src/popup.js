/*
 * Run every time the extension button is clicked (top right in browser) and options popup is opened
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './react/Popup';

ReactDOM.render(<Popup />, document.getElementById('saveTheWeb_extensionPopup'));
