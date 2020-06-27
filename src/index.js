import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Child from './child'
import * as serviceWorker from './serviceWorker';
import {Router, browserHistory} from 'react-router'
import routeConfig from './route'

// ReactDOM.hydrate(
//   <React.StrictMode>
//     <App>
//       <Child />
//     </App>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.hydrate(
  <Router routes={routeConfig} history={browserHistory} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
