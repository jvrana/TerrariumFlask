import React, { Component } from 'react'
import Navigation from "./components/Navigation";
import { loginWithToken } from './utils';
import client from './apollo/client';
import { AUTH_TOKEN } from './constants';

class App extends Component { // eslint-disable-line react/prefer-stateless-function


    render() {

        // attempt login from local storage
        loginWithToken(client, localStorage.getItem(AUTH_TOKEN));

        return (
                <section>
                  <Navigation />
                        {this.props.children}
                </section>
        );
    }
}

export default App;