import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import GlobalURLObject from './components/GlobalUtil/GlobalURLObject';

// This is a root component, if URL is "/" or there are paramters present in the URL
ReactDOM.render(
  
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/Historic">
          <GlobalURLObject />
        </Route>
        <Route path="/Projected">
          <GlobalURLObject />
        </Route>
      </Switch>
    </Router>,
    
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
