const fs = require('fs');
const jsonTemplate = require('./data/jsonTemplate');

function generateJson() {
  fs.writeFileSync(process.cwd() + '/package.json', jsonTemplate.trim(), err => {
    if (err) return console.log('fs.writeFile error!', err);
  });
}

module.exports = generateJson;