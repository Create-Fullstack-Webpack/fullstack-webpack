const inquirer = require('inquirer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const webpack = require('./webpack');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'frontend',
      message: '1. Are you using a Frontend framework?',
      choices: [
        'Not now',
        'React',
      ],
    },
    {
      type: 'list',
      name: 'backend',
      message: '2. Are you using a Backend framework?',
      choices: [
        'Not now',
        'Express'
      ],
    },
    {
      type: 'list',
      name: 'test',
      message: '3. Are you using a Test framework?',
      choices: [
        'Not now',
        'Jest',
        'Mocha'
      ],
      // filter: function (val) {
      //   return val.toLowerCase();
      // },
    },
    {
      type: 'list',
      name: 'ui',
      message: '4. Are you using a UI framework?',
      choices: [
        'Not now',
        'Bootstrap'
      ],
    },
    {
      type: 'checkbox', //allows user to select multiple options
      name: 'transpiler',
      message: '5. Are you using a Transpiler?',
      choices: [
        {
          name: 'Not now'
        },
        {
          name: 'Babel'
        },
        {
          name: 'Typescript'
        }
      ],
    },
    {
      type: 'checkbox', //allows user to select multiple options
      name: 'styling',
      message: '6. Are you using Styling?',
      choices: [
        {
          name: 'Not now'
        },
        {
          name: 'CSS'
        },
        {
          name: 'SASS'
        },
        {
          name: 'SCSS'
        }
      ],
    },
    {
      type: 'checkbox',
      name: 'linting',
      message: '7. Are you using Linting?',
      choices: [
        {
          name: 'Not now'
        },
        {
          name: 'ESLint'
        },
        {
          name: 'Prettier'
        },
      ],
    },
    {
      type: 'checkbox', //allows user to select multiple options
      name: 'plugins',
      message: '8. Are you using Webpack Plugins?',
      choices: [
        {
          name: 'Not now',
        },
        {
          name: 'HtmlWebpackPlugin',
        },
        {
          name: 'CleanWebpackPlugin',
        },
        {
          name: 'MiniCssExtractPlugin'
        }
      ],
    },
  ])
  .then((answers) => {  //answers will return an object based on the user's input. We will evaluate the object and determine what to install.
    console.log(answers);
    console.log("Answer to first question: ", answers["frontend"]);
    console.log('dirname', __dirname);
    console.log('cwd', process.cwd());

    webpack(answers);

     

    // fs.appendFileSync(path.resolve(__dirname, '../testFile.txt'), 'Hello!', err => {
    //   if (err) throw err;
    //   console.log('File created!');
    // });

    fs.writeFile(path.resolve(__dirname, '../testFile.txt'), 'Hi!', err => {
      if (err) return console.log(err);
      console.log('testFile.txt');
    });

    // exec('npm install express', (err, stdout, stderr) => {
    //   if (err) {
    //     //some err occurred
    //     console.error(err)
    //   } else {
    //    // the *entire* stdout and stderr (buffered)
    //    console.log(`stdout: ${stdout}`);
    //    console.log(`stderr: ${stderr}`);
    //   }
    // });
  })
  .catch(err => console.log(err));