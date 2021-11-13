/*
 * Run every time the extension button is clicked (top right in browser) and options popup is opened
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import EditOptions from './react/EditOptions';

ReactDOM.render(<EditOptions />, document.getElementById('saveTheWeb_extensionPopup'));
