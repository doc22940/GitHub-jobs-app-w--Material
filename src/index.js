import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import regeneratorRuntime from "regenerator-runtime";
import { BrowserRouter } from "react-router-dom";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: true
  });
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
