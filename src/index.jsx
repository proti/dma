import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/Store';
import App from './app/App';
import './main.scss';

const Component = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Component />, document.getElementById('app'));
