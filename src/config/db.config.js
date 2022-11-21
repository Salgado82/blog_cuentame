const mysql = require('mysql2/promise');

const {
  DB_HOST,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

const dbConfig = {
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
};

async function executeQuery(sql, params) {
  const dbConnection = await mysql.createConnection(dbConfig);
  const [results] = await dbConnection.execute(sql, params);

  return results;
}

module.exports = {
  executeQuery,
};
