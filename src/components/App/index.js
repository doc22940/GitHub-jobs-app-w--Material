import React, { Fragment, useState, useEffect, useReducer } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useInput from "@hooks/useInput";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

const PATH_BASE = "https://jobs.github.com/positions.json";
const PARAM_DESCRIPTION = "description=";
const PARAM_LOCATION = "location=";
const PARAM_PAGE = "page=";

/* const urlReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_URL":

    default:
      throw new Error();
  }
}; */

const App = () => {
  const [positions, setPositions] = useState([]);
  const [description, bindDescription] = useInput("Description", "");
  const [location, bindLocation] = useInput("Location", "");
  const [url, setUrl] = useState(
    `https://cors-anywhere.herokuapp.com/${PATH_BASE}?${PARAM_DESCRIPTION}&${PARAM_LOCATION}`
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      setPositions(data);
      setIsLoading(false);
    };
    // Fetch latest jobs posted by default
    fetchData();
  }, [url]);

  const handleSubmit = event => {
    setUrl(
      `https://cors-anywhere.herokuapp.com/${PATH_BASE}?${PARAM_DESCRIPTION}${description}&${PARAM_LOCATION}${location}`
    );
    event.preventDefault();
  };

  const fetchPositions = url => {
    setIsLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(result => setPositions(result))
      .catch(error => error);
    setIsLoading(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <form onSubmit={handleSubmit}>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12} sm={5}>
            <Input {...bindDescription} fullWidth />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Input {...bindLocation} fullWidth />
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
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <ul>
          {positions.map(({ id, company, title }) => (
            <li key={id}>
              {company} *** {title}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default App;
