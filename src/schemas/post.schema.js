const Joi = require('joi');
const { ZERO, PATH_UPLOAD } = require('../constants');

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
  image: (post.image_src) ? `${PATH_UPLOAD}${post.image_src}` : null,
  isEdited: (post.is_edited !== ZERO),
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
