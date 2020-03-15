import React from "react";
import "./index.css";
import dog from "@images/dog.jpg";
import Button from "@material-ui/core/Button";

const App = () => {
  return (
    <main className="App">
      <h1>Hello World!</h1>
      <img src={dog} alt="" />
      <Button variant="contained">Default</Button>
    </main>
  );
};

export default App;
