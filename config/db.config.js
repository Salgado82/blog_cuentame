'use strict';
const mysql = require('mysql');

const {
  DB_HOST,
  // DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

const dbConnection = mysql.createConnection({
  host: DB_HOST,
  // port: DB_PORT,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

dbConnection.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log('Database Connected!');
});

module.exports = dbConnection;
