import React, { Fragment, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

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
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <form onSubmit={handleSubmit}>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12} sm={5}>
            <Input
              placeholder="role"
              value={description}
              onChange={handleChange}
              fullWidth
            ></Input>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Input
              placeholder="location"
              value={location}
              onChange={handleChangeLocation}
              fullWidth
            ></Input>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
              size="small"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      <ul>
        {positions.map(({ id, company, title }) => (
          <li key={id}>
            {company} *** {title}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default App;
