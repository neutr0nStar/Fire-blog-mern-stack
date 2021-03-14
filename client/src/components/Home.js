/*
Home page for the blog page
*/
import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Grid,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";

import useFetch from "../hooks/useFetch";

import BloggingSVG from "../Blogging.svg";
import BlogCard from "./BlogCard";

// styles
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainHeading: {
    fontWeight: "bold",
    fontFamily: "Nunito",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(5),
  },
  blogSVG: {
    width: "40rem",
    height: "40rem",
    [theme.breakpoints.down("sm")]: {
      width: "23rem",
      height: "23rem",
      marginBottom: 10,
    },
  },
  loading: {
    margin: "80px auto",
    color: theme.palette.warning.main,
  },
}));

export default function Home() {
  const classes = useStyles();
  const location = useLocation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  useEffect(() => {
    if (location.state) {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        location.state = {};
      }, 2000);
    }
  }, [location]);

  const fetchedBlogs = useFetch("/api/blogs"); // custom hook made to GET data from backend

  return (
    <div>
      <Container className={classes.container}>
        <div>
          <Typography variant="h2" className={classes.mainHeading}>
            Fire Blog
          </Typography>
          <Typography className={classes.subtitle}>
            The best blogging site for devs!
          </Typography>
        </div>
        <img src={BloggingSVG} alt="blogging svg" className={classes.blogSVG} />
      </Container>
      <Container>
        <Typography variant="h4">All blogs</Typography>
        <hr />
        <Grid container spacing={2}>
          {fetchedBlogs.error && (
            <Typography color="error" variant="h5" style={{ margin: 10 }}>
              {fetchedBlogs.error.toString()}
            </Typography>
          )}
          {fetchedBlogs.loading && (
            <CircularProgress className={classes.loading} />
          )}
          {!fetchedBlogs.loading &&
            fetchedBlogs.data.map((blog) => (
              <BlogCard key={blog.title} blog={blog} />
            ))}
        </Grid>
      </Container>
      {showSnackbar && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={showSnackbar}
          autoHideDuration={2000}
          message="Blog deleted"
        />
      )}
    </div>
  );
}
