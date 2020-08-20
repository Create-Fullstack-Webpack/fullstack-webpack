const pgsqljs = `
// FOR SINGLE QUERY

const { Pool } = require('pg');

const PG_URI =
  // Insert your URI
  '<INSERT PG URI HERE>';

const pool = new Pool({
  connectionString: PG_URI,
  connectionLimit: 300,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
`;

module.exports = pgsqljs;