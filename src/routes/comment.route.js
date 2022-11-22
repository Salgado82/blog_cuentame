const express = require('express');

const router = express.Router();
const middleware = require('./middleware');
const {
  create,
  findById,
  findByPostId,
  findAll,
  update,
  deleteComment,
} = require('../controllers/comment.controller');
const {
  createComment: createCommentSchema,
  updateComment: updateCommentSchema,
} = require('../schemas/comment.schema');

router.post('/', middleware(createCommentSchema), create);
router.get('/:id', findById);
router.get('/post/:postId', findByPostId);
router.get('/', findAll);
router.put('/:id', middleware(updateCommentSchema), update);
router.delete('/:id', deleteComment);

module.exports = router;
