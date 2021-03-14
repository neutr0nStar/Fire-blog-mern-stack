/*
Then navbar of the app, made using appbar from mui
*/

// imports
import React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  Container,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory, useLocation } from "react-router-dom";

// styles
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.text.primary,
  },
  title: {
    flexGrow: 1,
    fontFamily: "Nunito",
  },
  titleLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function Navbar() {
  const classes = useStyles(); // using styles
  const location = useLocation(); // to avoid going to the same page again
  const history = useHistory(); // for navigation

  // this function makes sure that we are not summoning new blog pages if are already on one
  const handleCreate = () => {
    if (location.pathname !== "/create") {
      history.push("/create");
    }
  };

  return (
    // Appbar
    // Contains name and a button to create new blogs
    <AppBar className={classes.appBar} position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              Fire Blog
            </Link>
          </Typography>
          <Button onClick={handleCreate}>New Blog</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
