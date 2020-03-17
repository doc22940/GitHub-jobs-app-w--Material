import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import useInput from "@hooks/useInput";

const SearchForm = ({ handleSubmit }) => {
  const [description, bindDescription] = useInput("Description", "");
  const [location, bindLocation] = useInput("Location", "");

  return (
    <form onSubmit={handleSubmit(description, location)}>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} sm={5}>
          <Input {...bindDescription} fullWidth />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Input {...bindLocation} fullWidth />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            size="small"
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
SearchForm.whyDidYouRender = true;
export default SearchForm;
