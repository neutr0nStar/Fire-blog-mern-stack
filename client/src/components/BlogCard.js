/*
Card component to show blogs on homepage
*/
import React from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
  },
  image: {
    width: theme.spacing(20),
    flexShrink: 0,
  },
  btn: {
    color: theme.palette.warning.main,
  },
  chevron: {
    height: "1rem",
    weight: "1rem",
  },
  snippet: {
    color: theme.palette.text.secondary,
  },
}));

export default function BlogCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const blog = props.blog;
  const imgSrc = "https://picsum.photos/seed/" + blog.title + "/400";

  return (
    <Grid item md={6} xs={12}>
      <Card className={classes.card}>
        <CardMedia image={imgSrc} className={classes.image} />
        <div>
          <CardContent>
            <Typography variant="h5">{blog.title}</Typography>
            <Typography variant="subtitle1" className={classes.snippet}>
              {blog.snippet}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              className={classes.btn}
              onClick={() => history.push("/blog/" + blog._id)}
            >
              Read more
            </Button>
          </CardActions>
        </div>
      </Card>
    </Grid>
  );
}
