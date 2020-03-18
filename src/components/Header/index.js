import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar disableGutters variant="dense">
            <Typography
              variant="h6"
              style={{ flex: 1, textDecoration: "none", color: "unset" }}
              component={Link}
              to="/"
            >
              GitHub Jobs
            </Typography>

            <Button color="inherit" component={Link} to="/saved">
              Saved Jobs
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
