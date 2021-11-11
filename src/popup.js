/*
 * Run every time the extension button is clicked (top right in browser) and options popup is opened
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './popup/Popup';
import './popup.scss';
alert('popup.js loaded');

var mountNode = document.getElementById('popup');
ReactDOM.render(<Popup />, mountNode);
