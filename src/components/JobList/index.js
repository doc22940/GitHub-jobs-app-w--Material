import React, { Fragment } from "react";
import ErrorSnackbar from "./ErrorSnackbar";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const JobList = ({ positions, isError, isLoading }) => {
  return (
    <Fragment>
      {isError && <ErrorSnackbar />}

      {!isLoading && positions.length == 0 && (
        <Typography variant="h3">No jobs found.</Typography>
      )}

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
        <List>
          {positions.map(({ id, company, title, location, created_at }) => (
            <Fragment key={id}>
              <ListItem button component={Link} to={`/position/${id}`}>
                <Grid
                  container
                  alignItems="center"
                  justify="space-between"
                  spacing={2}
                >
                  <Grid item xs={8}>
                    <ListItemText primary={title} secondary={company} />
                  </Grid>
                  <Grid item xs={4}>
                    <ListItemText
                      primary={location}
                      secondary={`${formatDistanceToNow(
                        new Date(created_at)
                      )} ago`}
                      style={{ textAlign: "right" }}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <Divider component="li" />
            </Fragment>
          ))}
        </List>
      )}
    </Fragment>
  );
};

export default JobList;
