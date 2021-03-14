/*
Create blog
*/
import React, { useState } from "react";
import { Typography, Box, Paper, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formPaper: {
    margin: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(10),
    },
    padding: theme.spacing(8),
  },
  form: {
    margin: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(5),
    },
  },
  inputField: {
    margin: theme.spacing(1),
    width: "100%",
  },
  btnBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(5),
  },
}));

export default function CreateBlog() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    fetch("http://localhost:3001/api/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title, snippet, content }),
    }).then(() => history.push("/"));
  };

  return (
    <Box>
      <Paper className={classes.formPaper}>
        <Typography variant="h3">Create New Blog</Typography>
        <hr />
        <form className={classes.form}>
          <TextField
            required
            label="Title"
            variant="outlined"
            helperText="Title of blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={classes.inputField}
          />
          <TextField
            required
            label="Snippet"
            variant="outlined"
            helperText="A sentence to describe your blog"
            value={snippet}
            onChange={(e) => setSnippet(e.target.value)}
            className={classes.inputField}
          />
          <TextField
            required
            label="Content"
            multiline
            fullWidth
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className={classes.inputField}
          />
          <Box className={classes.btnBox}>
            <Button
              variant="contained"
              style={{ padding: 8, backgroundColor: "#ff9800" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              style={{ backgroundColor: "#ffb74d", padding: 8, marginLeft: 8 }}
              variant="contained"
              onClick={() => history.go(-1)}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
