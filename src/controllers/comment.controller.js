const {
  ZERO,
  CommentMessages,
  HttpErrorCodes,
  SERVER_ERROR_MESSAGE,
} = require('../constants');
const { commentQuery } = require('../queries/comment.queries');
const { outboundComment, outboundComments } = require('../schemas/comment.schema');

const create = async function (req, res, next) {
  try {
    const data = await commentQuery.create(req.body);
    const [newComment] = await commentQuery.getById(data.insertId);
    res.json({
      error: false,
      message: CommentMessages.CREATE,
      data: outboundComment(newComment),
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
    const data = await commentQuery.getById(req.params.id);

    if (data.length === ZERO) {
      res.status(HttpErrorCodes.NOT_FOUND).json({
        error: true,
        message: CommentMessages.NOT_FOUND,
      });
    }

    const [comment] = data;
    res.json({
      error: false,
      message: CommentMessages.FIND_ONE,
      data: outboundComment(comment),
    });
  } catch (err) {
    console.error('Error: ', err.message);
    next({
      error: true,
      message: err.message,
    });
  }
};

const findByPostId = async function (req, res, next) {
  try {
    const data = await commentQuery.getByPostId(req.params.postId);

    if (data.length === ZERO) {
      res.status(HttpErrorCodes.NOT_FOUND).json({
        error: true,
        message: CommentMessages.NOT_FOUND,
      });
    }

    res.json({
      error: false,
      message: CommentMessages.FIND_ONE,
      data,
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
    const data = await commentQuery.getAll();
    res.json({
      error: false,
      message: CommentMessages.FIND_ALL,
      data: outboundComments(data),
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
    const data = await commentQuery.update(req.body, req.params.id);

    if (data.affectedRows === ZERO) {
      res.status(HttpErrorCodes.SERVER_ERROR).json({
        error: true,
        message: SERVER_ERROR_MESSAGE,
      });
    }

    const [updatedComment] = await commentQuery.getById(req.params.id);
    res.json({
      error: false,
      message: CommentMessages.UPDATE,
      data: outboundComment(updatedComment),
    });
  } catch (err) {
    console.error('Error: ', err.message);
    next({
      error: true,
      message: err.message,
    });
  }
};

const deleteComment = async function (req, res, next) {
  try {
    const data = await commentQuery.remove(req.params.id);

    if (data.affectedRows === ZERO) {
      res.status(HttpErrorCodes.SERVER_ERROR).json({
        error: true,
        message: SERVER_ERROR_MESSAGE,
      });
    }

    res.json({
      error: false,
      message: CommentMessages.DELETE,
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
  findByPostId,
  findAll,
  update,
  deleteComment,
};
