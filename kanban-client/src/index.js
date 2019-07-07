import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import 'bulma/css/bulma.css';
import App from './App';
import Login from './Login';
import Logon from './Logon';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/logon" exact={true} component={Logon} />

        </Switch>
    </BrowserRouter>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
