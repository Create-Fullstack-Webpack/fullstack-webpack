const fs = require('fs');
// const path = require('path');
const Appjs = require('./data/frontend/App.js-content');
const indexjs = require('./data/frontend/index.js-content');
const indexcss = require('./data/frontend/index.css-content');

function generateFrontEnd(framework) {
  if (framework === 'React') {
  let dir = process.cwd() + '/client/';
    fs.mkdir(dir, (err) => {
      if (err) console.log(err);
      fs.mkdir(dir + 'src', (err) => {
        if (err) console.log(err);

        // reassign dir to ./client/src endpoint
        dir = process.cwd() + '/client/src/';

        fs.writeFileSync(dir + 'App.js', Appjs.trim(), err => {
          if (err) return console.log('fs.writeFile error!', err);
        });
        
        fs.writeFileSync(dir + 'index.js', indexjs.trim(), err => {
          if (err) return console.log('fs.writeFile error!', err);
        });
        
        fs.writeFileSync(dir + 'index.css', indexcss.trim(), err => {
          if (err) return console.log('fs.writeFile error!', err);
        });
      });
    });
  }
}

module.exports = generateFrontEnd;