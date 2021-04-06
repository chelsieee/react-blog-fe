import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import ReactMarkdownWithHTML from 'react-markdown/with-html'
import {render} from 'react-dom'



import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.44)), url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1450&q=80')`,
    height: "330px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 200,
      fontSize: "3em",
    },
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: "100%",
  },
  image: {
    height: 240,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  cardActions: {
    display: "flex",
    margin: "0 10px 10px 10px",
    justifyContent: "space-between",
  },
  button: {
    margin: "0 0 20px 30px",
  },
  author: {
    display: "flex",
  },
}));

export const PrivateList = (props) => {
  const classes = useStyles();
  if (props.login.isLoggin) {
    return (
      <div>
        <Box className={classes.hero}>
          <Box>Archive My Day</Box>
        </Box>
        <Container maxWidth="lg" className={classes.blogscontainer}>
          <Typography variant="h4" className={classes.blogTitle}>
            Personal Blogs
          </Typography>
          <Grid container spacing={3}>
            {props.blogs.map((el, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      key={index}
                      image={`https://source.unsplash.com/random/${index}`}
                      className={classes.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {el.title}
                      </Typography>
                      <div>
                      { <div dangerouslySetInnerHTML={{ __html: el.content}} /> }
                      </div>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className={classes.cardActions}>
                    <Box className={classes.author}>
                      <Avatar className={classes.purple}>
                        {el.author.substring(0, 1).toUpperCase()}
                      </Avatar>
                      <Box ml={2}>
                        <Typography variant="subtitle2" component="p">
                          Category: {el.category}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          component="p"
                        >
                        CreateAt: {moment(el.createdAt).format("DD-MM-YYYY h:mm:ss")}
                        </Typography>
                      </Box>
                    </Box>
                  </CardActions>
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      onClick={() => props.handleDelete(el)}
                    >
                      Delete
                    </Button>
                    <Link to="/blog/edit">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={() => props.handleClick(el)}
                      >
                        Edit
                      </Button>
                    </Link>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Box className={classes.hero}>
        <Box>Please login first !</Box>
      </Box>
    </div>
  );
};
