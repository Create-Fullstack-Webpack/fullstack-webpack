#!/usr/bin/env node

const inquirer = require('inquirer');
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const webpack = require('./webpack');
const generateJson = require('./generateJson');
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
      message: '3. Select your Backend framework:',
      choices: [
        'Express'
      ],
      default: 'Express'
    },
    {
      type: 'list',
      name: 'db',
      message: '4. Are you using Database?',
      choices: [
        'Not now',
        'PostgreSQL',
        'MongoDB'
      ],
    },
    {
      type: 'list',
      name: 'test',
      message: '5. Are you using a Test framework?',
      choices: [
        'Not now',
        'Jest',
        'Mocha'
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
          name: 'SASS/SCSS'
        }
      ],
      default: 'CSS'
    },
    {
      type: 'checkbox', //allows user to select multiple options
      name: 'plugins',
      message: '7. Are you using Webpack Plugins?',
      choices: [
        {
          name: 'Not now',
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
      message: '8. Are you using images or font-families?',
      choices: [
        'No',
        'Yes'
      ],
    }
  ])
  .then((answers) => {  //answers will return an object based on the user's input. We will evaluate the object and determine what to install.

    generateJson();
    let {dependencies, devDependencies} = webpack(answers);

    spawnSync('npm', ['init', '-y'], {stdio: 'inherit' });
    spawnSync('npm', dependencies, {stdio: 'inherit' });
    spawnSync('npm', devDependencies, {stdio: 'inherit' });

  })
  .catch(err => console.log(err));