const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables
const { DB_USER, DB_HOST, DB_DATABASE, DB_PORT, DATABASE_URL } = process.env;
const cn = DATABASE_URL
  ? { connectionString: DATABASE_URL }
  : {
      user: DB_USER,
      host: DB_HOST,
      database: DB_DATABASE,
      port: DB_PORT,
    };
const pool = new Pool(cn);

module.exports = pool;
