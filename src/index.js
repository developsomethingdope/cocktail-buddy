import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import reduxToolStore from "./redux/ToolStore";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxToolStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
