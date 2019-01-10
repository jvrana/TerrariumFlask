import {Provider} from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import App from './App'
import history from './history';
import store from './store/configureStore';
import {Router} from "react-router";
import routes from "./routes";
import {ApolloProvider} from 'react-apollo';
import client from '../client';
import gql from "graphql-tag";

const USERS = gql`
{
  users {
    id
    email
  }
}
`;

client.query({query: USERS}).then(
    (response) => {
        console.log(response)
    }
);

render(
    <Provider store={store}>
        <Router history={history}>
            <ApolloProvider client={client}>
                <App>
                    {routes}
                </App>
            </ApolloProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);


// // Hot reloading
// if (module.hot) {
//   // Reload components
//   module.hot.accept('./App', () => {
//     render()
//   })
//
//   // Reload reducers
//   module.hot.accept('./reducers', () => {
//     store.replaceReducer(rootReducer(history))
//   })
// }