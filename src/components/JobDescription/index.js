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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  summary: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular
  },
  expansionPanel: {
    marginBottom: theme.spacing(2)
  }
}));

const JobDescription = ({ handleSave, handleDelete, savedJobs }) => {
  const classes = useStyles();
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

          <ExpansionPanel elevation={3} className={classes.expansionPanel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.summary}
            >
              <Typography className={classes.heading}>How to apply</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {ReactHtmlParser(position.how_to_apply)}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {savedJobs.some(({ id }) => id == position.id) ? (
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              startIcon={<DeleteIcon />}
              onClick={handleDelete(position)}
            >
              Delete
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              startIcon={<FavoriteIcon />}
              onClick={handleSave(position)}
            >
              Save
            </Button>
          )}

          {ReactHtmlParser(position.description)}
        </Container>
      )}
    </Fragment>
  );
};

export default JobDescription;
