const Joi = require('joi');

const createComment = Joi.object({
  postId: Joi.number().required(),
  username: Joi.string().required(),
  comment: Joi.string().required(),
});

const updateComment = Joi.object({
  comment: Joi.string().required(),
});

const outboundComment = (comment) => ({
  id: comment.id,
  postId: comment.post_id,
  username: comment.username,
  comment: comment.comment,
  isEdited: comment.is_edited,
  createdAt: comment.created_at,
  updatedAt: comment.updated_at,
});

const outboundComments = (comments) => comments.map((comment) => outboundComment(comment));

module.exports = {
  createComment,
  updateComment,
  outboundComment,
  outboundComments,
};
