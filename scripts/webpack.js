const generateFrontEnd = require('./generateFrontEnd');

function webpack(answers) {
  
  let execStr = "npm install ";
  let obj = {};

  // Question 1: frontend
  switch(answers['frontend']) {
    case 'Not now':
      // logic
      break;
    case 'React':
      generateFrontEnd('React');
      console.log('Hit React switch!')
      break;
    default:
  }

  // // Question 2: backend
  // switch(answers['backend']) {
  //   case 'Not now':
  //     // logic
  //     break;
  //   case 'Express':
  //     // logic
  //     break;
  //   default:
  // }

  // // Question 3: test
  // switch(answers['test']) {
  //   case 'Not now':
  //     // logic
  //     break;
  //   case 'Jest':
  //     // logic
  //     break;
  //   case 'Mocha':
  //     // logic
  //     break;
  //   default:
  // }
  
  // // Question 4: ui
  // switch(answers['ui']) {
  //   case 'Not now':
  //     // logic
  //     break;
  //   case 'Bootstrap':
  //     // logic
  //     break;
  //   default:
  // }

  // // Question 5: transpiler
  // answers['transpiler'].forEach( transpiler => {
  //   switch( transpiler ) {
  //     case 'Not now':
  //       // logic
  //       break;
  //     case 'Babel':
  //       // logic
  //       break;
  //     case 'Typescript':
  //       break;
  //     default:
  //   }
  // });

  // // Question 6: styling
  // answers['styling'].forEach( styling => {
  //   switch(styling) {
  //     case 'Not now':
  //       // logic
  //       break;
  //     case 'CSS':
  //       // logic
  //       break;
  //     case 'SASS':
  //       //logic
  //       break;
  //     case 'SCSS':
  //       //logic
  //       break;
  //     default:
  //   }
  // });

  // // Question 7: linting
  // answers['linting'].forEach ( linting => {
  //   switch(linting) {
  //     case 'Not now':
  //       // logic
  //       break;
  //     case 'ESLint':
  //       // logic
  //       break;
  //     case 'Prettier':
  //       //logic
  //       break;
  //     default:
  //   }
  // });

  // // Question 8: plugins
  // answers['plugins'].forEach( plugins => {
  //   switch(plugins) {
  //     case 'Not now':
  //       // logic
  //       break;
  //     case 'HtmlWebpackPlugin':
  //       // logic
  //       break;
  //     case 'CleanWebpackPlugin':
  //       //logic
  //       break;
  //     case 'MiniCssExtractPlugin':
  //       //logic
  //       break;
  //     default:
  //   }
  // });
}

module.exports = webpack;