const express = require('express');

const router = express.Router();
const middleware = require('./middleware');
const {
  create,
  findById,
  findAll,
  update,
  deletePost,
} = require('../controllers/post.controller');
const {
  createPost: createPostSchema,
  updatePost: updatePostSchema,
} = require('../schemas/post.schema');

router.post('/', middleware(createPostSchema), create);
router.get('/:id', findById);
router.get('/', findAll);
router.put('/:id', middleware(updatePostSchema), update);
router.delete('/:id', deletePost);

module.exports = router;
