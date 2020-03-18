import {
  PATH_BASE,
  PARAM_DESCRIPTION,
  PARAM_LOCATION,
  CORS_PROXY
} from "../../constants";
import React, { Fragment } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { useLocalStorage } from "react-recipes";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import useGitHubApi from "@hooks/useGitHubApi";
import SearchForm from "../SearchForm";
import JobList from "../JobList";
import Header from "../Header";
import JobDescription from "../JobDescription";
import SavedJobs from "../SavedJobs";

const App = () => {
  const [{ data: positions, isLoading, isError }, doFetch] = useGitHubApi(
    `${CORS_PROXY}${PATH_BASE}`,
    []
  );
  const [savedPositions, setSavedPositions] = useLocalStorage(
    "savedPositions",
    []
  );

  const handleSave = position => () => {
    if (!savedPositions.some(({ id }) => id == position.id)) {
      setSavedPositions([...savedPositions, position]);
    }
  };

  const handleDelete = position => () => {
    setSavedPositions(savedPositions.filter(({ id }) => id !== position.id));
  };

  const handleSubmit = (description, location) => event => {
    doFetch(
      `${CORS_PROXY}${PATH_BASE}?${PARAM_DESCRIPTION}${description}&${PARAM_LOCATION}${location}`
    );
    event.preventDefault();
  };

  return (
    <Fragment>
      <CssBaseline />
      <Switch>
        <Header />
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

        <Route path="/position/:id">
          <JobDescription
            handleSave={handleSave}
            handleDelete={handleDelete}
            savedJobs={savedPositions}
          />
        </Route>

        <Route path="/saved">
          <SavedJobs savedPositions={savedPositions} />
        </Route>
      </Switch>
    </Fragment>
  );
};
export default App;
