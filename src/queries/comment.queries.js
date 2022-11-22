const { executeQuery } = require('../config/db.config');

async function create(data) {
  const { postId, username, comment } = data;

  return executeQuery(
    `INSERT INTO comment (post_id, username, comment) 
      VALUES ("${postId}", "${username}", "${comment}")`,
  );
}

async function getById(commentId) {
  return executeQuery(`SELECT * FROM comment WHERE id = ${commentId}`);
}

async function getByPostId(postId) {
  return executeQuery(`SELECT * FROM comment WHERE post_id = ${postId}`);
}

async function getAll() {
  return executeQuery('SELECT * FROM comment');
}

async function update(data, commentId) {
  const { comment } = data;
  return executeQuery(
    `UPDATE comment SET comment="${comment}", is_edited="1" WHERE id = ${commentId}`,
  );
}

async function remove(commentId) {
  return executeQuery(`DELETE FROM comment WHERE id = ${commentId}`);
}

module.exports = {
  commentQuery: {
    create,
    getById,
    getByPostId,
    getAll,
    update,
    remove,
  },
};
