#!/usr/bin/env node

const inquirer = require('inquirer');
const {spawnSync} = require('child_process');
const fs = require('fs');
const path = require('path');
const webpack = require('./webpack');
const chalk = require('chalk');
const figlet = require('figlet');

console.log(
  chalk.yellow(
    figlet.textSync('Fullstack Webpack')
  )
)

inquirer
  .prompt([
    {
      type: 'list',
      name: 'frontend',
      message: '1. Select your Frontend framework:',
      choices: [
        'React',
      ],
      default: 'React'
    },
    {
      type: 'checkbox', //allows user to select multiple options
      name: 'transpiler',
      message: '2. Which transpiler are you using?',
      choices: [
        {
          name: 'Babel'
        },
        {
          name: 'Typescript'
        }
      ],
    },
    {
      type: 'list',
      name: 'backend',
      message: '3. Are you using a Backend framework?',
      choices: [
        'Not now',
        'Express'
      ],
    },
    {
      type: 'list',
      name: 'test',
      message: '4. Are you using a Test framework?',
      choices: [
        'Not now',
        'Jest',
        'Mocha'
      ],
      // filter: function (val) {
      //   return val.toLowerCase();
      // },
    },
    // {
    //   type: 'list',
    //   name: 'ui',
    //   message: '4. Are you using a UI framework?',
    //   choices: [
    //     'Not now',
    //     'Bootstrap'
    //   ],
    // },

    {
      type: 'checkbox', //allows user to select multiple options
      name: 'styling',
      message: '5. Are you using Styling?',
      choices: [
        {
          name: 'Not now'
        },
        {
          name: 'CSS'
        },
        {
          name: 'SASS/SCSS'
        }
      ],
      default: 'CSS'
    },
    {
      type: 'checkbox', //allows user to select multiple options
      name: 'plugins',
      message: '6. Are you using Webpack Plugins?',
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
    {
      type: 'list',
      name: 'images and font',
      message: '7. Are you using images or font-families?',
      choices: [
        'No',
        'Yes'
      ],
    }
  ])
  .then((answers) => {  //answers will return an object based on the user's input. We will evaluate the object and determine what to install.
    console.log('stop')
    debugger
    console.log('psot stop')

    let {dependencies, devDependencies} = webpack(answers);

    console.log(dependencies);
    console.log(devDependencies);

    // spawnSync('npm', dependencies, {stdio: 'inherit' });
    // spawnSync('npm', devDependencies, {stdio: 'inherit' });

  })
  .catch(err => console.log(err));