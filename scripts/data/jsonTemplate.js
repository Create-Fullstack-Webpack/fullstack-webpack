const path = require('path');

const jsonTemplate = `
{
  "name": "${path.basename(process.cwd())}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
   "scripts": {
    "start": "NODE_ENV=production nodemon server/server.js",
    "build": "NODE_ENV=production webpack",
    "dev": "concurrently \\"NODE_ENV=development\\" \\"webpack-dev-server --open --hot\\" \\"nodemon server/server.js\\"",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
`;

module.exports = jsonTemplate;