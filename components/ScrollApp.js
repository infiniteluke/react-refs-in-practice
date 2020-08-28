import React from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Grid,
  Typography,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Box,
} from "@material-ui/core";
import { Delete, AddComment, Edit, Feedback } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

import { comments, posts } from "../data.json";
import { reducer, relatedComment, relatedPost } from "../lib";
import { useStyles } from "../hooks";

function PostNumber({ num }) {
  return (
    <span
      style={{
        marginRight: "5px",
        padding: "5px",
        borderRadius: "4px",
        backgroundColor: grey[300],
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

const Comments = React.forwardRef(({ children }, ref) => {
  const { tabContainer, fill, scrollContainer, scrollArea } = useStyles();

  return (
    <Grid ref={ref} className={tabContainer} item xs={4}>
      <Card className={fill}>
        <TableContainer className={scrollContainer}>
          <TableBody className={scrollArea} style={{ padding: "3px" }}>
            {children}
          </TableBody>
        </TableContainer>
      </Card>
    </Grid>
  );
});

const Post = React.forwardRef(
  ({ id, text, src, selected, hasComments, onClick, onDelete }, ref) => {
    const classes = useStyles({ selected });

    return (
      <Grid ref={ref} item xs={4}>
        <div className={classes.cardWrapper}>
          <Card className={classes.card}>
            <CardActionArea style={{ position: "relative" }} onClick={onClick}>
              <CardMedia height="240" component="img" src={src} />
              {hasComments && (
                <Feedback
                  style={{
                    position: "absolute",
                    top: "10",
                    right: "10",
                    color: "white",
                  }}
                />
              )}
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
              <IconButton onClick={onDelete} aria-label="delete">
                <Delete />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      </Grid>
    );
  }
);

const Comment = React.forwardRef(
  ({ author, text, selected, created, post, onClick }, ref) => {
    const classes = useStyles({ selected });

    return (
      <TableRow className={classes.comment} ref={ref}>
        <CardActionArea onClick={onClick} component={TableCell}>
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
);

const DeleteConfirm = ({ open, handleClose }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this post?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Dismiss
      </Button>
      <Button
        autoFocus
        onClick={handleClose}
        variant="contained"
        color="secondary"
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default function PhotoApp() {
  const [state, dispatch] = React.useReducer(reducer, {
    selectedIndex: null,
    selectComment: null,
  });
  const [open, setOpen] = React.useState(false);
  const commentsRef = React.useRef({});
  const postsRef = React.useRef({});

  const selectPost = (i) => {
    const firstComment = relatedComment(i);
    if (firstComment) {
      dispatch({ type: "selectPost", selectedIndex: i });
      commentsRef.current[firstComment.id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const selectComment = (comment) => {
    dispatch({ type: "selectComment", comment });
    const post = relatedPost(comment);
    if (post) {
      postsRef.current[post.id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <App>
      <DeleteConfirm open={open} handleClose={() => setOpen(false)} />
      <Posts>
        {posts.map((post) => (
          <Post
            ref={(el) => (postsRef.current[post.id] = el)}
            onDelete={() => setOpen(true)}
            key={post.id}
            {...post}
            selected={state.selectedIndex === post.id}
            hasComments={Boolean(relatedComment(post.id))}
            onClick={() => selectPost(post.id)}
          />
        ))}
      </Posts>
      <Comments>
        {comments.map((comment) => (
          <Comment
            ref={(el) => (commentsRef.current[comment.id] = el)}
            {...comment}
            selected={state.selectedComment === comment.id}
            onClick={() => selectComment(comment)}
          />
        ))}
      </Comments>
    </App>
  );
}
