
function webpack(answers) {

  const execStr = 'npm install';

  //this object will become the webpack. 
  const obj = {
    mode: process.env.NODE_ENV,
    entry: [
      path.resolve(__dirname, './client/index.js')
      'react-hot-loader/patch',
      './src/index.js'
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
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
    case 'Not now':
      // logic
      break;
    case 'React':
      selectionConditions[react] = 'react';

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
      console.log('An error has occured with your selection, frontend');
  }

  // Question 2: backend
  // switch (answers['backend']) {
  //   case 'Not now':
  //     // logic
  //     break;
  //   case 'Express':
  //     obj.output =  {path: path.resolve(__dirname, 'dist'),
  //     filename: 'bundle.js'}
  //     break;
  //   default:
  //   console.log('An error has occured with your selection, backend.');
  // }

  // Question 3: test
  switch (answers['test']) {
    case 'Not now':
      // logic
      break;
    case 'Jest':
      // logic unable to find logic at this time. We need to make a testing page for JEST.
      break;
    case 'Mocha':
      obj.module.rules.push({
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      });
      break;
    default:
      console.log('An error has occured with your selection, test');
  }

  // Question 4: ui
  switch (answers['ui']) {
    case 'Not now':
      // logic
      break;
    case 'Bootstrap':
      selectionConditions[bootstrap] = 'bootstrap';
      obj.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      })
      break;
    default:
      console.log('An error has occured with your selection, ui');
  }

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

  // Question 5: transpiler
  answers['transpiler'].forEach(transpiler => {
    switch (transpiler) {
      case 'Not now':
        // logic
        break;
      case 'Babel':
        if (!selectionConditions.react) {
          obj.module.rules.push(
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
              }
            });
        }
        break;
      case 'Typescript':
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
        break;
      default:
        console.log('An error has occured with your selection, transpiler');
    }
  });

  // Question 6: styling
  answers['styling'].forEach(styling => {
    switch (styling) {
      case 'Not now':
        // logic
        break;
      case 'CSS':
        if (!selectionConditions.bootstrap) {
          obj.module.rules.push(
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
            });
        }
        break;
      case 'SASS':
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
      case 'SCSS':
        if (!selectionConditions.sass) {
          obj.module.rules.push(
            {
              test: /\.scss$/,
              use: [
                'style-loader',
                'css-loader',
                'sass-loader'
              ]
            });
        }
        break;
      default:
        console.log('An error has occured with your selection, styling');
    }
  });

  //NOTE: LINTING REQUIRES A SEPARATE FILE, DOES NOT NEED TO BE IN WEBPACK
  // Question 7: linting
  // switch (linting) {
  //   case 'Not now':
  //     // logic
  //     break;
  //   case 'ESLint':
  //     // logic
  //     break;
  //   case 'Prettier':
  //     //logic
  //     break;
  //   default:
  // }

  // Question 8: plugins
  answers['plugins'].forEach(plugins => {
    switch (plugins) {
      case 'Not now':
        // logic
        break;
      case 'HtmlWebpackPlugin':
        obj.plugins.push(
          new HtmlWebpackPlugin({
            appMountId: 'app',
            filename: 'index.html'
          }));
        break;
      case 'CleanWebpackPlugin':
        obj.plugins.push(
          new CleanWebpackPlugin()
        );
        break;
      case 'MiniCssExtractPlugin':
        obj.plugins.push(
          new MiniCssExtractPlugin()
        );
        break;
      default:
        console.log('An error has occured with your selection, plugins')
    }
  });

  return obj;
}

module.exports = { webpack };