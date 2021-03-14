/*
Footer 
*/
import { Box, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(10),
    padding: theme.spacing(3),
    position: "relative",
    bottom: 0,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h6">Footer</Typography>
      <Typography variant="subtitle1">
        This is a site made by Sneharsh Belsare©
      </Typography>
    </Box>
  );
}
