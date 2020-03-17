import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import regeneratorRuntime from "regenerator-runtime";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: true
  });
}

render(<App />, document.getElementById("root"));
