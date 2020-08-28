import React from "react";
import ReactDOM from "react-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  IconButton,
  Grid,
  Typography,
  TableContainer,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { comments, posts } from '../data.json'
import { reducer } from "../lib";
import { useStyles } from "../hooks";

import { Delete, AddComment, Edit } from "@material-ui/icons";

function PostNumber({ num }) {
  return (
    <span
      style={{
        marginRight: "5px",
        padding: "5px",
        borderRadius: "4px",
        backgroundColor: grey[300]
      }}
    >
      {num + 1}
    </span>
  );
}

function App({ children }) {
  return (
    <Grid
      style={{ height: "100%", width: "100%", overflow: "hidden" }}
      container
      direction="row"
    >
      {children}
    </Grid>
  );
}

function Posts({ children }) {
  const { scrollContainer, scrollArea } = useStyles();

  return (
    <Grid className={scrollContainer} item xs={8}>
      <Grid className={scrollArea} container direction="row">
        {children}
      </Grid>
    </Grid>
  );
}

function Comments({ children }) {
  const { tabContainer, fill, scrollContainer, scrollArea } = useStyles();

  return (
    <Grid className={tabContainer} item xs={4}>
      <Card className={fill}>
        <TableContainer className={scrollContainer}>
          <TableBody className={scrollArea} style={{ padding: "3px" }}>
            {children}
          </TableBody>
        </TableContainer>
      </Card>
    </Grid>
  );
}

function Post({ id, text, src, selected, onClick, onDelete }) {
  const classes = useStyles({ selected });

  return (
    <Grid item xs={4}>
      <div className={classes.cardWrapper}>
        <Card className={classes.card}>
          <CardActionArea onClick={onClick}>
            <CardMedia height="240" component="img" src={src} />
            <CardContent>
              <Typography variant="body1" component="p">
                <PostNumber num={id} />
                {text}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton aria-label="edit">
              <Edit />
            </IconButton>
            <IconButton aria-label="add comment">
              <AddComment />
            </IconButton>
            <IconButton aria-label="delete">
              <Delete />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    </Grid>
  );
}

function Comment({ author, text, selected, created, post, onClick }) {
  const classes = useStyles({ selected });

  return (
    <TableRow>
      <CardActionArea
        className={classes.comment}
        onClick={onClick}
        component={TableCell}
      >
        <Grid container justify="space-between">
          <Grid item>
            <Avatar>{author}</Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography paragraph variant="body1" component="p">
              {text}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                {created}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {`Post ${post}`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardActionArea>
    </TableRow>
  );
}

export default function PhotoApp() {
  const [state, dispatch] = React.useReducer(reducer, {
    selectedIndex: null,
    selectComment: null
  });

  const selectPost = (i) => dispatch({ type: "selectPost", selectedIndex: i });
  const selectComment = (comment) =>
    dispatch({ type: "selectComment", comment });

  return (
    <App>
      <Posts>
        {posts.map((post) => (
          <Post
            key={post.id}
            {...post}
            selected={state.selectedIndex === post.id}
            onClick={() => selectPost(post.id)}
          />
        ))}
      </Posts>
      <Comments>
        {comments.map((comment) => (
          <Comment
            {...comment}
            selected={state.selectedComment === comment.id}
            onClick={() => selectComment(comment)}
          />
        ))}
      </Comments>
    </App>
  );
}
