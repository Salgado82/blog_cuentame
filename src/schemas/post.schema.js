const Joi = require('joi');

const createPost = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

const updatePost = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

const outboundPost = (post) => ({
  id: post.id,
  title: post.title,
  body: post.body,
  isEdited: post.is_edited,
  createdAt: post.created_at,
  updatedAt: post.updated_at,
  comments: post.comments,
});

const outboundPosts = (posts) => posts.map((post) => outboundPost(post));

module.exports = {
  createPost,
  updatePost,
  outboundPost,
  outboundPosts,
};
