import React, { Fragment } from "react";
import ErrorSnackbar from "./ErrorSnackbar";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const JobList = ({ positions, isError, isLoading }) => {
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
        <ul>
          {positions.map(({ id, company, title }) => (
            <li key={id}>
              {company} *** {title}
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default JobList;
