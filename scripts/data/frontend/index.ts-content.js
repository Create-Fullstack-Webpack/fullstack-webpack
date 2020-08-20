const indexts = `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App name="Fullstack Webpack" />
  </React.StrictMode>,
  document.getElementById('root')
);
`;

module.exports = indexts;