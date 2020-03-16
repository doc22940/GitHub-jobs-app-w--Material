import {
  PATH_BASE,
  PARAM_DESCRIPTION,
  PARAM_LOCATION,
  CORS_PROXY
} from "../../constants";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import useInput from "@hooks/useInput";
import useGitHubApi from "@hooks/useGitHubApi";
import SearchForm from "../SearchForm";
import JobList from "../JobList";

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

      <JobList positions={positions} isError={isError} isLoading={isLoading} />
    </Container>
  );
};

export default App;
