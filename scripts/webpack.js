const path = require('path');
const fs = require('fs');
const generateTest = require('./generateTest');
const generateFrontEnd = require('./generateFrontEnd');
const generateBackend = require('./generateBackend');
const generateDb = require('./generateDb');

function webpack(answers) {

  // this object will become the webpack.
  let obj = `
module.exports = {
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080,
    proxy: {
      '/': 'http://localhost:3000',
    },
    hot: true,
  },
`
  
  // gather frontend technologies in object from swtich statements to pass into generateFrontEnd()
  let frontEndTechnologies = {};

  let headers = `const path = require('path');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\n`;
  let moduleRules = [];
  let resolveExtensions = "'.js', ";
  let webpackPlugins = [];
  
  let devDependencies = ['install', '--save-dev', 'nodemon', 'webpack', 'webpack-cli', 'webpack-dev-server', 'html-webpack-plugin'];
  let dependencies = ['install', 'concurrently'];
  
  // Question 1: frontend
  switch (answers['frontend']) {
    case 'React':
      dependencies.push('react', 'react-dom');
      frontEndTechnologies['framework'] = 'React';
      break;
    default:
      // console.log('An error has occured with your selection, frontend');
      break;
  }

  // Question 2: transpiler
  if (answers.transpiler.length > 1) {
    obj += `entry: './client/src/index.tsx',\n`;
    moduleRules.push(`
  {
    test: /\.ts(x)?$/,
    loader: 'ts-loader',
    exclude: /node_modules/
  }`);
    resolveExtensions += `'.tsx', '.ts', `;
    moduleRules.push(`
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react', '@babel/preset-env'],
      },
    },
  }`);
    resolveExtensions += `'.jsx', `;
    devDependencies.push('typescript', 'ts-loader', '@types/express', '@types/react', '@types/react-dom');
    devDependencies.push('@babel/core', '@babel/preset-env', '@babel/preset-react', 'babel-loader');
    frontEndTechnologies['transpiler'] = 'Typescript';
  } else if (answers.transpiler[0] == 'Typescript') {
    obj += `  entry: './client/src/index.tsx',\n`;
    moduleRules.push(`
    {
      test: /\.ts(x)?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }
  `);
    resolveExtensions += `'.tsx', '.ts', `;
    devDependencies.push('typescript', 'ts-loader', '@types/express', '@types/react', '@types/react-dom');
    frontEndTechnologies['transpiler'] = 'Typescript';

  } else { // Babel
    obj += `  entry: './client/src/index.js',\n`;
    moduleRules.push(`
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
    }`);
    resolveExtensions += `'.jsx', `;
    devDependencies.push('@babel/core', '@babel/preset-env', '@babel/preset-react', 'babel-loader');
    frontEndTechnologies['transpiler'] = 'Babel';
  }

  // Question 3: backend
  switch (answers['backend']) {
    case 'Express':
      dependencies.push('express');
      generateBackend('Express');
      break;
    default:
      // console.log('An error has occured with your selection, backend.');
      break;
  }

  // Question 4: db
  switch (answers['db']) {
    case 'PostgreSQL':
      dependencies.push('pg');
      generateDb('PostgreSQL');
      break;
    case 'MongoDB':
      dependencies.push('mongodb');
      generateDb('MongoDB');
      break;
    default:
      // console.log('An error has occured with your selection, test');
      break;
  }
  
  // Question 5: test
  switch (answers['test']) {
    case 'Jest':
      devDependencies.push('jest');
      generateTest('Jest');
      break;
    case 'Mocha':
      devDependencies.push('mocha-loader', 'mocha');
      generateTest('Mocha');
      moduleRules.push(`
    {
      test: /test\.js$/,
      use: 'mocha-loader',
      exclude: /node_modules/,
    }`);
      break;
    default:
      // console.log('An error has occured with your selection, test');
      break;
  }

  // Question 5: styling
  if (answers['styling'].includes('SASS/SCSS')) {
    devDependencies.push('css-loader', 'style-loader', 'sass-loader', 'sass', 'node-sass');
    moduleRules.push(`
    {
      test: /\.(css|scss)$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }`);
    frontEndTechnologies['styling'] = 'SASS/SCSS';
  } else if (answers['styling'].includes('CSS')) {
    devDependencies.push('css-loader', 'style-loader');
    moduleRules.push(`
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }`);
    frontEndTechnologies['styling'] = 'CSS';
  }
  // answers['styling'].forEach(styling => {
  //   switch (styling) {
  //     case 'CSS':

  //       break;
  //     case 'SASS/SCSS':

  //       break;
  //     default:
  //       break;
  //   }
  // });

  // Question 7: plugins
  answers['plugins'].forEach(plugins => {
    switch (plugins) {
      case 'CleanWebpackPlugin':
        devDependencies.push('clean-webpack-plugin');
        headers += `const { CleanWebpackPlugin } = require('clean-webpack-plugin');\n`;
        webpackPlugins.push(
          `new CleanWebpackPlugin()`
        );
        break;
      case 'MiniCssExtractPlugin':
        devDependencies.push('mini-css-extract-plugin');
        headers += `const MiniCssExtractPlugin = require('mini-css-extract-plugin');\n`;

        webpackPlugins.push(
          `new MiniCssExtractPlugin()`
        );
        break;
      default:
        // console.log('An error has occured with your selection, plugins');
        break;
    }
  });


  // Question 8: images and font-families,
  switch (answers['images and font']) {
    case 'Yes':
      moduleRules.push(`
    {
      test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader',
      ],
    }`);
      break;
    default:
      break;
  }

  // Create Frontend files
  generateFrontEnd(frontEndTechnologies);

  // module.rules
  obj += '  module: {\n    rules: [';
  moduleRules.forEach(value => {
    obj += value + ",";
  })
  obj += '\n' + '  ]},\n';

  // resolve.extensions
  obj += 'resolve: {\n\textensions: [';
  obj += resolveExtensions;
  obj += ']},\n';

  // plugins
  obj += `  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
    }),
  `;
  webpackPlugins.forEach(value => {
    obj += "  " + value + ", \n";
  })
  obj += ']\n';
  obj += '}';

  obj = headers + obj;

  fs.writeFileSync(process.cwd() + '/webpack.config.js', obj, 'utf-8');

  return { 'dependencies': dependencies, 'devDependencies': devDependencies };
}

module.exports = webpack;