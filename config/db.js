const {Pool} = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Final project',
  password: 'postgresql',
  port: 5432,
});
module.exports = pool;