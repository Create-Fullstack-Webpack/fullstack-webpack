const path = require('path');
const fs = require('fs');
const server = require('./data/backend/server.js');

function generateBackend( framework ) {
  // framework = 'express';
  // if (framework === 'express') {
    const dir = process.cwd() + '/server/';
    console.log(dir);
  
    fs.mkdir(dir, (err) => {
      if (err)
        console.log(err);
      fs.writeFileSync(path.resolve(dir, 'server.js'), server);
      fs.mkdir(dir + 'controller', (err) => {
        if (err)
          console.log(err);
      });
    });
  // }
}

module.exports = generateBackend;