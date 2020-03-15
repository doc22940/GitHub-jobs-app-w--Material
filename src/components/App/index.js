import React, { Fragment, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Input from "@material-ui/core/Input";

const PATH_BASE = "https://jobs.github.com/positions.json?";
const PARAM_DESCRIPTION = "description=";
const PARAM_LOCATION = "location=";
const PARAM_PAGE = "page=";

const App = () => {
  const [lastPositions, setLastPositions] = useState([]);

  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/${PATH_BASE}${PARAM_DESCRIPTION}&${PARAM_PAGE}`
    )
      .then(response => response.json())
      .then(result => setLastPositions(result));
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <form>
        <Input placeholder="role"></Input>
        <Button variant="contained">Default</Button>
      </form>
      <ul>
        {lastPositions.map(({ company }) => (
          <li key={company}>{company}</li>
        ))}
      </ul>
    </Fragment>
  );
};

export default App;
