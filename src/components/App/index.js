import React, { Fragment, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Input from "@material-ui/core/Input";

const PATH_BASE = "https://jobs.github.com/positions.json";
const PARAM_DESCRIPTION = "description=";
const PARAM_LOCATION = "location=";
const PARAM_PAGE = "page=";

const App = () => {
  const [positions, setPositions] = useState([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    // Fetch latest jobs posted by default
    fetchPositions("");
  }, []);

  const handleChange = event => setDescription(event.target.value);

  const handleChangeLocation = event => setLocation(event.target.value);

  const handleSubmit = event => {
    fetchPositions(description, location);
    event.preventDefault();
  };

  const fetchPositions = (description, location = "", page = 0) => {
    fetch(
      `https://cors-anywhere.herokuapp.com/${PATH_BASE}?${PARAM_DESCRIPTION}${description}&${PARAM_LOCATION}${location}&${PARAM_PAGE}${page}`
    )
      .then(response => response.json())
      .then(result => setPositions(result))
      .catch(error => error);
  };

  return (
    <Fragment>
      <CssBaseline />
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="role"
          value={description}
          onChange={handleChange}
        ></Input>
        <Input
          placeholder="location"
          value={location}
          onChange={handleChangeLocation}
        ></Input>
        <Button variant="contained" type="submit">
          Default
        </Button>
      </form>
      <ul>
        {positions.map(({ id, company, title }) => (
          <li key={id}>
            {company} *** {title}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default App;
