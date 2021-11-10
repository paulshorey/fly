import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./popup/App";
import "./popup.scss";

var mountNode = document.getElementById("popup");
ReactDOM.render(<App />, mountNode);
