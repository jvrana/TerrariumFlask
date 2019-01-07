import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import App from './App'
import history from './history';
import store from './store/configureStore';
import {Router} from "react-router";
import routes from "./routes";

render(
    <Provider store={store}>
        <Router history={history}>
            <App>
          { routes }
            </App>
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