import React from "react";
import useInput from "@hooks/useInput";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";

const SearchForm = () => {
  const [description, bindDescription] = useInput("Description", "");
  const [location, bindLocation] = useInput("Location", "");

  return (
    <form onSubmit={handleSubmit}>
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

export default SearchForm;