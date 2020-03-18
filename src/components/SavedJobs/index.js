import React from "react";
import JobList from "../JobList";
import Container from "@material-ui/core/Container";

const SavedJobs = ({ savedPositions }) => {
  return (
    <Container component="main" maxWidth="md" m={2}>
      <JobList
        positions={savedPositions}
        isLoading={false}
        isError={false}
      ></JobList>
    </Container>
  );
};

export default SavedJobs;
