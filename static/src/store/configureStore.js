import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../reducers";
import history from "../history";
import {routerMiddleware} from "connected-react-router";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const debugware = [];

if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({collapsed: true});
    debugware.push(logger);
}

function configureStore() {
    console.log("Recreating store");
    const store = createStore(
      rootReducer(history),
      composeEnhancer(
        applyMiddleware(
          routerMiddleware(history), thunk, ...debugware
        ),
      ),
    );

    return store
}

const store = configureStore();

export default store;