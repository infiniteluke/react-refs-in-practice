import { comments, posts } from './data.json'

export const bigCode = { styles: { CodeSurfer: { code: { fontSize: '2em' } } } };

export function relatedComment(postId) {
  return comments.find((comment) => comment.post - 1 === postId);
}

export function relatedPost(comment) {
  return posts.find((post) => post.id === comment.post - 1);
}

export function reducer(state, action) {
  switch (action.type) {
    case "selectPost":
      return {
        ...state,
        selectedIndex: action.selectedIndex,
        selectedComment: relatedComment(action.selectedIndex)?.id
      };
    case "selectComment":
      return {
        ...state,
        selectedComment: action.comment.id,
        selectedIndex: action.comment.post - 1
      };
    default:
      throw new Error();
  }
}