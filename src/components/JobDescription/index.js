import React, { Fragment } from "react";
import { CORS_PROXY } from "../../constants";
import { useParams } from "react-router-dom";
import useGitHubApi from "@hooks/useGitHubApi";
import ReactHtmlParser from "react-html-parser";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorSnackbar from "../JobList/ErrorSnackbar";
import { Typography } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

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
          <Grid
            container
            spacing={2}
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs={8}>
              <ListItemText
                primary={<Typography variant="h6">{position.title}</Typography>}
                secondary={position.company}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                primary={
                  <Typography variant="h6">{position.location}</Typography>
                }
                secondary={position.type}
                style={{ textAlign: "right" }}
              />
            </Grid>
          </Grid>
          <Divider />
          {ReactHtmlParser(position.description)}
        </Container>
      )}
    </Fragment>
  );
};

export default JobDescription;
