/*
Shows the blog
*/
import { Box, Paper, Typography, Button } from "@material-ui/core";
import React from "react";
import { useParams, useHistory } from "react-router";
import useFetch from "../hooks/useFetch";
import { makeStyles } from "@material-ui/core/styles";

// styles
const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(10),
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
      padding: theme.spacing(1),
    },
  },
  blogImg: {
    width: "100%",
    height: "50vh",
    objectFit: "cover",
    borderRadius: 5,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
}));

export default function ViewBlog() {
  const { id } = useParams(); // id from the url using react-router-dom useParams hook
  const classes = useStyles();
  const imgSrc = "https://picsum.photos/seed/" + id + "/1000"; // random image using Lorem picsum api
  const history = useHistory(); // for navigation

  // handle routing to the edit page
  const handleEdit = () => {
    history.push("/edit/" + id);
  };
  // send DELETE request to backend
  const handleDelete = () => {
    fetch("http://localhost:3001/api/blog/" + id, {
      method: "DELETE",
    }).then(() => history.push("/", { msg: "Blog deleted" }));
  };

  const blogFetch = useFetch("/api/blog/" + id);

  return (
    <Paper className={classes.container}>
      {!blogFetch.loading && (
        <Box>
          <Typography variant="h3">{blogFetch.data.title}</Typography>
          <br />
          <img src={imgSrc} alt="blog" className={classes.blogImg} />
          <br />
          <br />
          <Typography variant="subtitle1" paragraph style={{ fontSize: 20 }}>
            {blogFetch.data.content}
          </Typography>
          <Box className={classes.actions}>
            <Button
              style={{ backgroundColor: "#ff9800", padding: 8, marginRight: 8 }}
              variant="contained"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              style={{ backgroundColor: "#f44336", padding: 8 }}
              variant="contained"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
}
