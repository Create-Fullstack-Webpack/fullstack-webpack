const path = require('path');
const fs = require('fs');
const generateTest = require('./generateTest');
const generateFrontEnd = require('./generateFrontEnd');
const generateBackend = require('./generateBackend');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function webpack(answers) {

  // this object will become the webpack.
  let obj = `
  module.exports = {
    mode: process.env.NODE_ENV,
    entry: [
      path.resolve(process.cwd(), './client/src/index.js'),
    ],
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    devServer: {
      publicPath: '/dist',
      proxy: {
        '/': 'http://localhost:3000',
      },
      hot: true,
    },
  `
  
  let headers = `const path = require('path');\n`;
  let moduleRules = [];
  let resolveExtensions = "'.js', ";
  let webpackPlugins = [];
  
  let devDependencies = ['npm install --save-dev', 'webpack', 'nodemon'];
  let dependencies = ['npm install', 'concurrently'];
  
  // Question 1: frontend
  switch (answers['frontend']) {
    case 'React':
      dependencies.push('react', 'react-dom');
      // Should we remove from this section since it's covered under transpilers?
      // moduleRules.push(`
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-react', '@babel/preset-env'],
      //     },
      //   },
      // }`);
      // resolveExtensions += `'.js', '.jsx'`;
      break;
    default:
      // console.log('An error has occured with your selection, frontend');
      break;
  }

  // Question 2: transpiler
  if (answers.transpiler.length > 1) {
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
    devDependencies.push('typescript', 'ts-loader');
    devDependencies.push('@babel/core', '@babel/preset-env', '@babel/preset-react', 'babel-loader');
    generateFrontEnd('React', 'Typescript');
  } else if (answers.transpiler[0] == 'Typescript') {
    moduleRules.push(`
    {
      test: /\.ts(x)?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }
  `);
    resolveExtensions += `'.tsx', '.ts', `;
    devDependencies.push('typescript', 'ts-loader');
    generateFrontEnd('React', 'Typescript');

  } else { // Babel
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
    generateFrontEnd('React', 'Babel');
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

  // Question 4: test
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
  answers['styling'].forEach(styling => {
    switch (styling) {
      case 'CSS':
        devDependencies.push('css-loader', 'style-loader');
        moduleRules.push(`
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }`);
        break;
      case 'SASS/SCSS':
        devDependencies.push('css-loader', 'style-loader', 'sass-loader', 'sass');
        moduleRules.push(`
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }`);
        break;
      default:
        break;
    }
  });

  // Question 6: plugins
  answers['plugins'].forEach(plugins => {
    switch (plugins) {
      case 'HtmlWebpackPlugin':
        devDependencies.push('html-webpack-plugin');
        headers += `const HtmlWebpackPlugin = require('html-webpack-plugin');\n`;
        webpackPlugins.push(
          `new HtmlWebpackPlugin({appMountId: 'app',filename: 'index.html'})`);
        break;
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
        // if (selectionConditions.css || selectionConditions.scss) {
        //   //loop here through the rules to find the css test, then push the plugin into the rules array
        //   //loop through the rules to find the scss test, then push the plugin into the rules array
        //   obj.module.rules.forEach(el => {
        //     if (el.test === /\.css$/) el.use.push("MiniCssExtractPlugin.loader");
        //     if (el.test === /\.scss$/) el.use.push("MiniCssExtractPlugin.loader");
        //   })
        // }

        webpackPlugins.push(
          `new MiniCssExtractPlugin()`
        );
        break;
      default:
        // console.log('An error has occured with your selection, plugins');
        break;
    }
  });


  //7. Are you using images or font-families?',
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

  // module.rules
  obj += '  module: {\n    rules: [\n';
  moduleRules.forEach(value => {
    obj += value + ",";
  })
  obj += '\n' + ']},';

  // resolve.extensions
  obj += 'resolve: {\n\textensions: [';
  obj += resolveExtensions;
  obj += ']},\n';

  // plugins
  obj += 'plugins: [\n';
  webpackPlugins.forEach(value => {
    obj += "  " + value + ", \n";
  })
  obj += ']\n';
  obj += '}';

  obj = headers + obj;

  fs.writeFileSync(process.cwd() + '/webpack.config.js', obj, 'utf-8');

  dependencies = dependencies.join(" ");
  devDependencies = devDependencies.join(" ");
  console.log('webpack.js: ', dependencies);
  console.log('webpack.js: ', devDependencies);
  return { 'dependencies': dependencies, 'devDependencies': devDependencies };
}

module.exports = webpack;


/*
  const devDependencies = [];
  const dependencies = [];

  //this object will become the webpack. 
  const obj = {
    mode: process.env.NODE_ENV,
    entry: [
      path.resolve(process.cwd(), './client/src/index.js'),
    ],
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'bundle.js',
      // chunkFilename: '[id].js',
      publicPath: '/'
    },
    module: {
      rules: []
    },
    resolve: {
      extensions: [],
      alias: {}
    },
    devServer: {
      publicPath: '/dist',
      proxy: {
        '/': 'http://localhost:3000',
      },
      hot: true,
    },
    plugins: []
  };

  const selectionConditions = {}; //will store user selections that may alter how other loaders/rules are added to the webpack Obj above.

  // Question 1: frontend
  switch (answers['frontend']) {
    case 'React':
      console.log('Hit React switch!')
      selectionConditions.react = 'react';

      obj.module.rules.push({
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      });
      obj.resolve.extensions.push('.js', '.jsx');
      obj.resolve.alias = { 'react-dom': '@hot-loader/react-dom' };
      break;
    default:
      // console.log('An error has occured with your selection, frontend');
      break;
  }
  

  // Question 2: transpiler
  if (answers.transpiler.length > 1) {
    obj.module.rules.push(
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      });
    obj.resolve.extensions.push(
      '.tsx',
      '.ts',
      '.js');
    obj.module.rules.push(
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      });
      // generateFrontEnd('React', 'Typescript');
  } else if (answers.transpiler[0] == 'Typescript') {
    obj.module.rules.push(
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      });
    obj.resolve.extensions.push(
      '.tsx',
      '.ts',
      '.js');
    // generateFrontEnd('React', 'Typescript');
  } else { // Babel
    obj.module.rules.push(
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      });
      // generateFrontEnd('React', 'Babel');
  }

  // Question 3: backend
  switch (answers['backend']) {
    case 'Express':
      // generateBackend('Express');
      break;
    default:
      // console.log('An error has occured with your selection, backend.');
      break;
  }

  // Question 4: test
  switch (answers['test']) {
    case 'Jest':
      // generateTest('Jest');
      break;
    case 'Mocha':
      // generateTest('Mocha');
      obj.module.rules.push({
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      });
      break;
    default:
      // console.log('An error has occured with your selection, test');
      break;
  }


  // // Question 4: ui - STRETCH FEATURE
  // switch (answers['ui']) {
  //   case 'Bootstrap':
  //     selectionConditions[bootstrap] = 'bootstrap';
  //     obj.module.rules.push({
  //       test: /\.css$/,
  //       use: ['style-loader', 'css-loader']
  //     })
  //     break;
  //   default:
  //     // console.log('An error has occured with your selection, ui');
  //     break;
  // }

  // NOTE: BOOTSTRAP HAS TWO RULE SETS DEPENDING ON IF YOU IMPORT. WITHOUT IMPORT WE MUST USE THIS CODE BLOCK:
  // {
  //   test: /\.(scss)$/,
  //   use: [{
  //     loader: 'style-loader', // inject CSS to page
  //   }, {
  //     loader: 'css-loader', // translates CSS into CommonJS modules
  //   }, {
  //     loader: 'postcss-loader', // Run postcss actions
  //     options: {
  //       plugins: function () { // postcss plugins, can be exported to postcss.config.js
  //         return [
  //           require('autoprefixer')
  //         ];
  //       }
  //     }
  //   }, {
  //     loader: 'sass-loader' // compiles Sass to CSS
  //   }]
  // },
  // NOTE: IF WE USE import 'bootstrap/dist/css/bootstrap.min.css' WE CAN USE EXISTING RULES.



  // Question 5: styling
  answers['styling'].forEach(styling => {
    switch (styling) {
      case 'CSS':
        selectionConditions.css = 'css';
        obj.module.rules.push(
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          });
        break;
      case 'SASS/SCSS':
        selectionConditions.sass = 'sass';
        obj.module.rules.push(
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          });
        break;
      default:
        break;
    }
  });

  function htmlWebpackPlugin() {
    return () => {
      return new HtmlWebpackPlugin({appMountId: 'app',filename: 'index.html'});
    }
  }

  // Question 6: plugins
  answers['plugins'].forEach(plugins => {
    switch (plugins) {
      case 'HtmlWebpackPlugin':
        obj.plugins.push(htmlWebpackPlugin());
        // obj.plugins.push(
        //   new HtmlWebpackPlugin({appMountId: 'app',filename: 'index.html'}));
        break;
      case 'CleanWebpackPlugin':
        obj.plugins.push(
          new CleanWebpackPlugin()
        );
        break;
      case 'MiniCssExtractPlugin':
        if (selectionConditions.css || selectionConditions.scss){
          //loop here through the rules to find the css test, then push the plugin into the rules array
          //loop through the rules to find the scss test, then push the plugin into the rules array
          obj.module.rules.forEach(el => {
            if (el.test === /\.css$/) el.use.push("MiniCssExtractPlugin.loader");
            if (el.test === /\.scss$/) el.use.push("MiniCssExtractPlugin.loader");
          }) 
        }
 
        obj.plugins.push(
          "new MiniCssExtractPlugin()"
        );
        break;
      default:
        // console.log('An error has occured with your selection, plugins');
        break;
    }
  });

 
 //7. Are you using images or font-families?',
    switch (answers['images and font']) {
      case 'Yes' :
        obj.module.rules.push(
              {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: [
                  'file-loader',
               ],
              });
      break;
      default:
        break;
    }

  for (let i = 0; i < obj.plugins.length; i++) {
    console.log('obj.plugins[i]' , obj.plugins[i]);
    console.log('typeof obj.plugins[i]', typeof obj.plugins[i]);
    obj.plugins[i] = obj.plugins[i]();
  }
  console.log(obj);
  fs.writeFileSync(process.cwd() + '/webpack.config.js', JSON.stringify(obj, null, 2) , 'utf-8');

    //fs.writeFileSync('./data.json', JSON.stringify(obj, null, 2) , 'utf-8');

*/  