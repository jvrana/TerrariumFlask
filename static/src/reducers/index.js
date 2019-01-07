import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth';
import connect from './connect';


const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
    auth,
    connect
});

export default rootReducer