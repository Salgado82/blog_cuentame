const ZERO = 0;
const SERVER_ERROR_MESSAGE = 'An error occurred';
const PATH_UPLOAD = '/public/uploads/';

const HttpErrorCodes = Object.freeze({
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
});

const PostMessages = Object.freeze({
  CREATE: 'Post added',
  FIND_ONE: 'Post data',
  FIND_ALL: 'Post list',
  NOT_FOUND: 'Post not found',
  UPDATE: 'Post updated',
  DELETE: 'Post deleted',
});

const CommentMessages = Object.freeze({
  CREATE: 'Comment added',
  FIND_ONE: 'Comment detail',
  FIND_BY_POST: 'Comments by post detail',
  FIND_ALL: 'Comment list',
  NOT_FOUND: 'Comment not found',
  UPDATE: 'Comment updated',
  DELETE: 'Comment deleted',
});

module.exports = {
  ZERO,
  SERVER_ERROR_MESSAGE,
  PATH_UPLOAD,
  HttpErrorCodes,
  PostMessages,
  CommentMessages,
};
