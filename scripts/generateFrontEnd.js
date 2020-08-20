const fs = require('fs');
const Appjs = require('./data/frontend/App.js-content');
const Appts = require('./data/frontend/App.tsx-content');
const indexjs = require('./data/frontend/index.js-content');
const indexts = require('./data/frontend/index.tsx-content');
const indexhtml = require('./data/frontend/index.html-content');
const indexCssSassScss = require('./data/frontend/index.cssSassScss-content');
const tsconfigjson = require('./data/frontend/tsconfig.json-content');

function generateFrontEnd(technologies) {

  const { framework, transpiler, styling } = technologies;
  let indexFile;

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
          
          indexFile = 'Typescript';

          fs.writeFileSync(dir + 'App.tsx', Appts.trim(), err => {
            if (err) return console.log('fs.writeFile error!', err);
          });
          
          fs.writeFileSync(dir + 'index.tsx', indexts.trim(), err => {
            if (err) return console.log('fs.writeFile error!', err);
          });
        
          fs.writeFileSync(process.cwd() + '/tsconfig.json', tsconfigjson.trim(), err => {
            if (err) return console.log('fs.writeFile error!', err);
          });

        } else if (transpiler === 'Babel') {

          indexFile = 'Babel';
          
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
          if (indexFile == 'Babel') {
            fs.writeFileSync(dir + 'index.js', `import './index.css';\n` + indexjs.trim(), err => {
              if (err) return console.log('fs.writeFile error!', err);
            });
          } else if (indexFile == 'Typescript') {
            fs.writeFileSync(dir + 'index.tsx', `import './index.css';\n` + indexts.trim(), err => {
              if (err) return console.log('fs.writeFile error!', err);
            });
          }

        } else if (styling === 'SASS/SCSS') {
          fs.writeFileSync(dir + 'index.scss', indexCssSassScss.trim(), err => {
            if (err) return console.log('fs.writeFile error!', err);
          });
          if (indexFile == 'Babel') {
            fs.writeFileSync(dir + 'index.js', `import './index.scss';\n` + indexjs.trim(), err => {
              if (err) return console.log('fs.writeFile error!', err);
            });
          } else if (indexFile == 'Typescript') {
            fs.writeFileSync(dir + 'index.tsx', `import './index.scss';\n` + indexts.trim(), err => {
              if (err) return console.log('fs.writeFile error!', err);
            });
          }
        }
      });
    });
  }
}

module.exports = generateFrontEnd;