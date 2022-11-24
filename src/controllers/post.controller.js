const {
  ZERO,
  PostMessages,
  HttpErrorCodes,
  SERVER_ERROR_MESSAGE,
} = require('../constants');
const { postQuery } = require('../queries/post.queries');
const { commentQuery } = require('../queries/comment.queries');
const { outboundPost, outboundPosts } = require('../schemas/post.schema');
const { outboundComments } = require('../schemas/comment.schema');

const create = async function (req, res, next) {
  try {
    const data = await postQuery.create({
      ...req.body,
      imageSrc: (req.file) ? req.file.filename : null,
    });
    const [newPost] = await postQuery.getById(data.insertId);
    res.json({
      error: false,
      message: PostMessages.CREATE,
      data: outboundPost(newPost),
    });
  } catch (err) {
    console.error('Error: ', err.message);
    next({
      error: true,
      message: err.message,
    });
  }
};

const findById = async function (req, res, next) {
  try {
    const data = await postQuery.getById(req.params.id);

    if (data.length === ZERO) {
      res.status(HttpErrorCodes.NOT_FOUND).json({
        error: true,
        message: PostMessages.NOT_FOUND,
      });
    }

    const [post] = data;
    const comments = await commentQuery.getByPostId(post.id);
    res.json({
      error: false,
      message: PostMessages.FIND_ONE,
      data: outboundPost({
        ...post,
        comments: outboundComments(comments),
      }),
    });
  } catch (err) {
    console.error('Error: ', err.message);
    next({
      error: true,
      message: err.message,
    });
  }
};

const findAll = async function (req, res, next) {
  try {
    let data;
    const querySearch = 'q' in req.query ? req.query.q : '';

    if (querySearch) {
      data = await postQuery.getAllFilter(querySearch);
    } else {
      data = await postQuery.getAll();
    }

    res.json({
      error: false,
      message: PostMessages.FIND_ALL,
      data: outboundPosts(data),
    });
  } catch (err) {
    console.error('Error: ', err.message);
    next({
      error: true,
      message: err.message,
    });
  }
};

const update = async function (req, res, next) {
  try {
    const data = await postQuery.update(req.body, req.params.id);

    if (data.affectedRows === ZERO) {
      res.status(HttpErrorCodes.SERVER_ERROR).json({
        error: true,
        message: SERVER_ERROR_MESSAGE,
      });
    }

    const [updatedPost] = await postQuery.getById(req.params.id);
    res.json({
      error: false,
      message: PostMessages.UPDATE,
      data: outboundPost(updatedPost),
    });
  } catch (err) {
    console.error('Error: ', err.message);
    next({
      error: true,
      message: err.message,
    });
  }
};

const deletePost = async function (req, res, next) {
  try {
    const data = await postQuery.remove(req.params.id);

    if (data.affectedRows === ZERO) {
      res.status(HttpErrorCodes.SERVER_ERROR).json({
        error: true,
        message: SERVER_ERROR_MESSAGE,
      });
    }

    res.json({
      error: false,
      message: PostMessages.DELETE,
      data: {
        deleted: true,
      },
    });
  } catch (err) {
    console.error('Error: ', err.message);
    next({
      error: true,
      message: err.message,
    });
  }
};

module.exports = {
  create,
  findById,
  findAll,
  update,
  deletePost,
};
