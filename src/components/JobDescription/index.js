import React, { Fragment } from "react";
import { CORS_PROXY } from "../../constants";
import { useParams } from "react-router-dom";
import useGitHubApi from "@hooks/useGitHubApi";
import ReactHtmlParser from "react-html-parser";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorSnackbar from "../JobList/ErrorSnackbar";

const JobDescription = () => {
  const { id } = useParams();
  const [{ data: position, isLoading, isError }] = useGitHubApi(
    `${CORS_PROXY}https://jobs.github.com/positions/${id}.json`,
    {}
  );

  return (
    <Fragment>
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
        <Container component="main" maxWidth="md" m={2}>
          {ReactHtmlParser(position.description)}
        </Container>
      )}
    </Fragment>
  );
};

export default JobDescription;
