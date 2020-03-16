import {
  PATH_BASE,
  PARAM_DESCRIPTION,
  PARAM_LOCATION,
  CORS_PROXY
} from "../../constants";
import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useInput from "@hooks/useInput";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import ErrorSnackbar from "../ErrorSnackbar";
import useGitHubApi from "@hooks/useGitHubApi";
import SearchForm from "../SearchForm";

const App = () => {
  const [description, bindDescription] = useInput("Description", "");
  const [location, bindLocation] = useInput("Location", "");
  const [{ data: positions, isLoading, isError }, doFetch] = useGitHubApi(
    `${CORS_PROXY}${PATH_BASE}`,
    []
  );

  const handleSubmit = event => {
    doFetch(
      `${CORS_PROXY}${PATH_BASE}?${PARAM_DESCRIPTION}${description}&${PARAM_LOCATION}${location}`
    );
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <SearchForm
        bindDescription={bindDescription}
        bindLocation={bindLocation}
        handleSubmit={handleSubmit}
      />

      {isError && <ErrorSnackbar />}

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
