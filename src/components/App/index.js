import {
  PATH_BASE,
  PARAM_DESCRIPTION,
  PARAM_LOCATION,
  CORS_PROXY
} from "../../constants";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import useGitHubApi from "@hooks/useGitHubApi";
import SearchForm from "../SearchForm";
import JobList from "../JobList";

const App = () => {
  const [{ data: positions, isLoading, isError }, doFetch] = useGitHubApi(
    `${CORS_PROXY}${PATH_BASE}`,
    []
  );

  const handleSubmit = (description, location) => event => {
    doFetch(
      `${CORS_PROXY}${PATH_BASE}?${PARAM_DESCRIPTION}${description}&${PARAM_LOCATION}${location}`
    );
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <SearchForm handleSubmit={handleSubmit} />

      <JobList positions={positions} isError={isError} isLoading={isLoading} />
    </Container>
  );
};
export default App;
