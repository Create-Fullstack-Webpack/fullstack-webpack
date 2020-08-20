const fs = require('fs');
const pgsqljs = require('./data/db/pgsql');
const mongojs = require('./data/db/mongo');

function generateDb(type) {
  let dir = process.cwd() + '/server/models/';
    fs.mkdir(dir, (err) => {

      if (type === 'PostgreSQL') {
        fs.writeFileSync(dir + 'starterModel.js', pgsqljs, err => {
          if (err) return console.log('fs.writeFile error!', err);
        });
      }

      if (type === 'MongoDB') {
        fs.writeFileSync(dir + 'starterModel.js', mongojs, err => {
          if (err) return console.log('fs.writeFile error!', err);
        });
      }

    });
}

module.exports = generateDb;