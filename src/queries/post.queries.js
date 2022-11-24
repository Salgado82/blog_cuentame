const { executeQuery } = require('../config/db.config');

async function create(data) {
  const { title, body, imageSrc = null } = data;
  let columns = 'title, body';
  let values = `"${title}", "${body}"`;
  if (imageSrc) {
    columns += ', image_src';
    values += `, "${imageSrc}"`;
  }
  return executeQuery(
    `INSERT INTO post (${columns}) VALUES (${values})`,
  );
}

async function getById(postId) {
  return executeQuery(`SELECT * FROM post WHERE id = ${postId}`);
}

async function getAll() {
  return executeQuery('SELECT * FROM post');
}

async function getAllFilter(search) {
  return executeQuery(`SELECT * FROM post WHERE MATCH(title, body) AGAINST ("${search}")`);
}

async function update(data, postId) {
  const { title, body } = data;
  return executeQuery(
    `UPDATE post SET title="${title}", body="${body}", is_edited="1" WHERE id = ${postId}`,
  );
}

async function remove(postId) {
  return executeQuery(`DELETE FROM post WHERE id = ${postId}`);
}

module.exports = {
  postQuery: {
    create,
    getById,
    getAll,
    getAllFilter,
    update,
    remove,
  },
};
