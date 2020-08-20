const fs = require('fs');
const Appjs = require('./data/frontend/App.js-content');
const Appts = require('./data/frontend/App.ts-content');
const indexjs = require('./data/frontend/index.js-content');
const indexts = require('./data/frontend/index.ts-content');
const indexhtml = require('./data/frontend/index.html-content');
const indexCssSassScss = require('./data/frontend/index.cssSassScss-content');

function generateFrontEnd(technologies) {

  const { framework, transpiler, styling } = technologies;

  if (framework === 'React') {
  let dir = process.cwd() + '/client/';
    fs.mkdir(dir, (err) => {
      if (err) return console.log(err);
      fs.mkdir(dir + 'src', (err) => {
        if (err) return console.log(err);

        // reassign dir to ./client/src endpoint
        dir = process.cwd() + '/client/src/';

        // HTML
        fs.writeFileSync(dir + 'index.html', indexhtml.trim(), err => {
          if (err) return console.log('fs.writeFile error!', err);
        });

        // Transpilers
        if (transpiler === 'Typescript') {
          
          fs.writeFileSync(dir + 'App.ts', Appts.trim(), err => {
            if (err) return console.log('fs.writeFile error!', err);
          });
          
          fs.writeFileSync(dir + 'index.ts', indexts.trim(), err => {
            if (err) return console.log('fs.writeFile error!', err);
          });
        
        } else if (transpiler === 'Babel') {
          
          fs.writeFileSync(dir + 'App.js', Appjs.trim(), err => {
            if (err) return console.log('fs.writeFile error!', err);
          });
          
          fs.writeFileSync(dir + 'index.js', indexjs.trim(), err => {
            if (err) return console.log('fs.writeFile error!', err);
          });
        }

        // Styling
        if (styling === 'CSS') {
          fs.writeFileSync(dir + 'index.css', indexCssSassScss.trim(), err => {
            if (err) return console.log('fs.writeFile error!', err);
          });
        } else if (styling === 'SASS/SCSS')
          fs.writeFileSync(dir + 'index.scss', indexCssSassScss.trim(), err => {
            if (err) return console.log('fs.writeFile error!', err);
          });
      });
    });
  }
}

module.exports = generateFrontEnd;