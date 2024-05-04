const { createPool, createConnection } = require('mysql2');
const { config } = require('../config');

const pool = createPool({
  port: config.DB.PORT,
  host: config.DB.HOST,
  user: config.DB.USER,
  password: config.DB.PASSWORD,
  database: config.DB.DATABASE,
  connectionLimit: 10,
});

module.exports = pool;