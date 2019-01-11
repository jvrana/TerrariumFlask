import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import WelcomeBanner from './components/WelcomeBanner'
import LoginView from './components/Login'


const routes = (
    <Switch>
        <Route exact path="/" >
            <Redirect from="/" to="/home"/>
        </Route>
        <Route path="/home" component={WelcomeBanner}/>
        <Route path="/login" component={LoginView}/>
        <Route path="/users" component={Users}/>
    </Switch>
);

export default routes