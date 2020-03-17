import {
  PATH_BASE,
  PARAM_DESCRIPTION,
  PARAM_LOCATION,
  CORS_PROXY
} from "../../constants";
import React, { Fragment } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import useGitHubApi from "@hooks/useGitHubApi";
import SearchForm from "../SearchForm";
import JobList from "../JobList";
import Header from "../Header";
import JobDescription from "../JobDescription";

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
    <Fragment>
      <CssBaseline />
      <Header />
      <Switch>
        <Route exact path="/">
          <Container component="main" maxWidth="md" m={2}>
            <SearchForm handleSubmit={handleSubmit} />

            <JobList
              positions={positions}
              isError={isError}
              isLoading={isLoading}
            />
          </Container>
        </Route>

        <Route path="/position/:id" component={JobDescription} />
      </Switch>
    </Fragment>
  );
};
export default App;
