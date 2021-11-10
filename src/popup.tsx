/*
 * Run every time the extension button is clicked (top right in browser) and options popup is opened
 */
import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./popup/App";
import "./popup.scss";

var mountNode = document.getElementById("popup");
ReactDOM.render(<App />, mountNode);
